// Local progress helpers. Word progress and achievements are local learning
// markers only. They have NO money value. No coins, bonus, jackpot wording.

import { getUnlockedAchievements } from "../data/achievementItems";

export function createDefaultProgress() {
  return {
    learnedWordIds: [],
    unlockedAchievementIds: [],
  };
}

function normalizeProgress(progress) {
  const base = createDefaultProgress();
  if (!progress || typeof progress !== "object") return base;
  base.learnedWordIds = Array.isArray(progress.learnedWordIds)
    ? progress.learnedWordIds.slice()
    : [];
  base.unlockedAchievementIds = Array.isArray(progress.unlockedAchievementIds)
    ? progress.unlockedAchievementIds.slice()
    : [];
  return base;
}

export function markWordLearned(progress, wordId) {
  const next = normalizeProgress(progress);
  if (wordId && next.learnedWordIds.indexOf(wordId) < 0) {
    next.learnedWordIds.push(wordId);
  }
  return next;
}

// Recomputes unlocked achievements from current stats + learned words.
export function updateAchievements(progress, stats) {
  const next = normalizeProgress(progress);
  const unlocked = getUnlockedAchievements(stats, next);
  // Union of any previously unlocked and newly unlocked (achievements never lock again).
  const set = {};
  next.unlockedAchievementIds.forEach((id) => { set[id] = true; });
  unlocked.forEach((id) => { set[id] = true; });
  next.unlockedAchievementIds = Object.keys(set);
  return next;
}

export function getAchievementIds(progress) {
  return normalizeProgress(progress).unlockedAchievementIds;
}

export function getLearnedWordIds(progress) {
  return normalizeProgress(progress).learnedWordIds;
}

export function resetProgress() {
  return createDefaultProgress();
}
