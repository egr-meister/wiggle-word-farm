// Local statistics helpers. Never returns NaN. Safe with missing nested values.

import { getVocabularyItem } from "../data/vocabularyItems";

const CATEGORY_IDS = ["animals", "food", "colors", "tools"];
const GAME_MODE_IDS = ["find_word", "match_picture", "listen_choose"];

export function createDefaultStats() {
  const byCategory = {};
  CATEGORY_IDS.forEach((id) => {
    byCategory[id] = { correct: 0, incorrect: 0 };
  });
  const byGameMode = {};
  GAME_MODE_IDS.forEach((id) => {
    byGameMode[id] = { correct: 0, incorrect: 0 };
  });
  return {
    correct: 0,
    incorrect: 0,
    byCategory,
    byGameMode,
  };
}

function num(v) {
  return typeof v === "number" && !isNaN(v) ? v : 0;
}

// Merge any partial stats object onto a fresh default for safety.
function normalizeStats(stats) {
  const base = createDefaultStats();
  if (!stats || typeof stats !== "object") return base;

  base.correct = num(stats.correct);
  base.incorrect = num(stats.incorrect);

  if (stats.byCategory && typeof stats.byCategory === "object") {
    CATEGORY_IDS.forEach((id) => {
      const v = stats.byCategory[id];
      base.byCategory[id] = {
        correct: num(v && v.correct),
        incorrect: num(v && v.incorrect),
      };
    });
  }
  if (stats.byGameMode && typeof stats.byGameMode === "object") {
    GAME_MODE_IDS.forEach((id) => {
      const v = stats.byGameMode[id];
      base.byGameMode[id] = {
        correct: num(v && v.correct),
        incorrect: num(v && v.incorrect),
      };
    });
  }
  return base;
}

// result: { gameMode, categoryId, wordId, difficulty, isCorrect, completedAt }
export function recordWordAnswer(stats, result) {
  const next = normalizeStats(stats);
  const r = result || {};
  const isCorrect = r.isCorrect === true;

  // Resolve category: prefer explicit categoryId, else from wordId.
  let categoryId = r.categoryId;
  if (CATEGORY_IDS.indexOf(categoryId) < 0) {
    const item = getVocabularyItem(r.wordId);
    categoryId = item ? item.categoryId : null;
  }
  let gameMode = r.gameMode;
  if (GAME_MODE_IDS.indexOf(gameMode) < 0) gameMode = null;

  if (isCorrect) {
    next.correct += 1;
    if (categoryId) next.byCategory[categoryId].correct += 1;
    if (gameMode) next.byGameMode[gameMode].correct += 1;
  } else {
    next.incorrect += 1;
    if (categoryId) next.byCategory[categoryId].incorrect += 1;
    if (gameMode) next.byGameMode[gameMode].incorrect += 1;
  }
  return next;
}

export function getTotalCorrect(stats) {
  return num(normalizeStats(stats).correct);
}

export function getTotalIncorrect(stats) {
  return num(normalizeStats(stats).incorrect);
}

export function getTotalAnswered(stats) {
  const s = normalizeStats(stats);
  return num(s.correct) + num(s.incorrect);
}

export function resetStats() {
  return createDefaultStats();
}
