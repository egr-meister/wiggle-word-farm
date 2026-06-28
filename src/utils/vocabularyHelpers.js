// Helpers for building safe answer choices. Never returns undefined.

import { getCategoryItem } from "../data/categoryItems";
import {
  getWordsByCategory,
  getWordsForDifficulty,
  getVocabularyItem,
  VOCABULARY_ITEMS,
} from "../data/vocabularyItems";

export function getChoiceCountForDifficulty(difficulty) {
  if (difficulty === "hard") return 4;
  if (difficulty === "medium") return 3;
  return 2; // easy / default
}

export function getCategoryLabel(categoryId) {
  return getCategoryItem(categoryId).label;
}

// Returns a new shuffled copy of the array. Safe with empty / invalid input.
export function shuffleArray(items) {
  const arr = Array.isArray(items) ? items.slice() : [];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}

function toChoice(item) {
  return { id: item.id, label: item.word, emoji: item.emoji };
}

// Builds answer choices (correct + distractors) without duplicates.
// Hard difficulty may pull distractors from mixed categories.
function buildChoicePool(correctWordId, categoryId, difficulty) {
  const correct = getVocabularyItem(correctWordId);
  const count = getChoiceCountForDifficulty(difficulty);

  // Distractor source
  let pool;
  if (difficulty === "hard") {
    pool = VOCABULARY_ITEMS.slice();
  } else {
    pool = getWordsForDifficulty(categoryId, difficulty);
  }

  // Remove the correct item and any duplicates from the pool.
  const seen = {};
  const distractors = [];
  const shuffled = shuffleArray(pool);
  for (let i = 0; i < shuffled.length; i++) {
    const item = shuffled[i];
    if (!item || !item.id) continue;
    if (correct && item.id === correct.id) continue;
    if (seen[item.id]) continue;
    seen[item.id] = true;
    distractors.push(item);
    if (distractors.length >= count - 1) break;
  }

  const chosen = [];
  if (correct) chosen.push(correct);
  for (let i = 0; i < distractors.length && chosen.length < count; i++) {
    chosen.push(distractors[i]);
  }

  // If somehow not enough, top up from full vocabulary safely.
  if (chosen.length < count) {
    const extra = shuffleArray(VOCABULARY_ITEMS);
    for (let i = 0; i < extra.length && chosen.length < count; i++) {
      const item = extra[i];
      if (chosen.find((c) => c.id === item.id)) continue;
      chosen.push(item);
    }
  }

  return shuffleArray(chosen);
}

export function createWordChoices(correctWordId, categoryId, difficulty) {
  const pool = buildChoicePool(correctWordId, categoryId, difficulty);
  return pool.map(toChoice);
}

export function createPictureChoices(correctWordId, categoryId, difficulty) {
  // Same underlying items; pictures use the emoji field.
  const pool = buildChoicePool(correctWordId, categoryId, difficulty);
  return pool.map(toChoice);
}

export function isCorrectAnswer(selectedId, correctId) {
  if (!selectedId || !correctId) return false;
  return selectedId === correctId;
}
