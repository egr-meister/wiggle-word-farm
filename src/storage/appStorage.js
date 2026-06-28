// Local storage for Wiggle Word Farm.
// AsyncStorage only. No personal data, no names, age, location, device ids,
// behavioral tracking, or voice data. Works fully offline.

import AsyncStorage from "@react-native-async-storage/async-storage";

import { createDefaultStats } from "../utils/statsHelpers";
import { createDefaultProgress, updateAchievements } from "../utils/progressHelpers";
import { recordWordAnswer } from "../utils/statsHelpers";
import { markWordLearned } from "../utils/progressHelpers";

const STORAGE_KEY = "wiggle_word_farm_data_v1";

export function createDefaultSettings() {
  return {
    soundEnabled: true,
    wordVoiceEnabled: true,
    defaultDifficulty: "easy",
    theme: "wiggleFarm",
  };
}

export function createDefaultAppData() {
  return {
    stats: createDefaultStats(),
    progress: createDefaultProgress(),
    settings: createDefaultSettings(),
  };
}

// Deep-merge loaded data over defaults so missing keys never crash the app.
function mergeWithDefaults(loaded) {
  const defaults = createDefaultAppData();
  if (!loaded || typeof loaded !== "object") return defaults;

  const defStats = defaults.stats;
  const ls = (loaded.stats && typeof loaded.stats === "object") ? loaded.stats : {};

  const mergedByCategory = { ...defStats.byCategory };
  if (ls.byCategory && typeof ls.byCategory === "object") {
    Object.keys(mergedByCategory).forEach((k) => {
      const v = ls.byCategory[k];
      mergedByCategory[k] = {
        correct: (v && typeof v.correct === "number") ? v.correct : 0,
        incorrect: (v && typeof v.incorrect === "number") ? v.incorrect : 0,
      };
    });
  }

  const mergedByGameMode = { ...defStats.byGameMode };
  if (ls.byGameMode && typeof ls.byGameMode === "object") {
    Object.keys(mergedByGameMode).forEach((k) => {
      const v = ls.byGameMode[k];
      mergedByGameMode[k] = {
        correct: (v && typeof v.correct === "number") ? v.correct : 0,
        incorrect: (v && typeof v.incorrect === "number") ? v.incorrect : 0,
      };
    });
  }

  const stats = {
    correct: typeof ls.correct === "number" ? ls.correct : 0,
    incorrect: typeof ls.incorrect === "number" ? ls.incorrect : 0,
    byCategory: mergedByCategory,
    byGameMode: mergedByGameMode,
  };

  const lp = (loaded.progress && typeof loaded.progress === "object") ? loaded.progress : {};
  const progress = {
    learnedWordIds: Array.isArray(lp.learnedWordIds) ? lp.learnedWordIds : [],
    unlockedAchievementIds: Array.isArray(lp.unlockedAchievementIds) ? lp.unlockedAchievementIds : [],
  };

  const lset = (loaded.settings && typeof loaded.settings === "object") ? loaded.settings : {};
  const settings = {
    soundEnabled: typeof lset.soundEnabled === "boolean" ? lset.soundEnabled : true,
    wordVoiceEnabled: typeof lset.wordVoiceEnabled === "boolean" ? lset.wordVoiceEnabled : true,
    defaultDifficulty: typeof lset.defaultDifficulty === "string" ? lset.defaultDifficulty : "easy",
    theme: "wiggleFarm",
  };

  return { stats, progress, settings };
}

// Always returns valid default-merged data, even if storage is empty or corrupt.
export async function loadAppData() {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return createDefaultAppData();
    let parsed = null;
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      // Corrupted JSON -> safe defaults
      return createDefaultAppData();
    }
    return mergeWithDefaults(parsed);
  } catch (e) {
    return createDefaultAppData();
  }
}

export async function saveAppData(data) {
  try {
    const safe = mergeWithDefaults(data);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(safe));
    return safe;
  } catch (e) {
    return mergeWithDefaults(data);
  }
}

// Records one answer into stats. result shape:
// { gameMode, categoryId, wordId, difficulty, isCorrect, completedAt }
export async function recordVocabularyAnswer(result) {
  const data = await loadAppData();
  const nextStats = recordWordAnswer(data.stats, result || {});
  const nextProgress = updateAchievements(data.progress, nextStats);
  const next = { ...data, stats: nextStats, progress: nextProgress };
  return saveAppData(next);
}

export async function markVocabularyWordLearned(wordId) {
  const data = await loadAppData();
  const nextProgress0 = markWordLearned(data.progress, wordId);
  const nextProgress = updateAchievements(nextProgress0, data.stats);
  const next = { ...data, progress: nextProgress };
  return saveAppData(next);
}

export async function resetVocabularyStats() {
  const data = await loadAppData();
  const next = { ...data, stats: createDefaultStats() };
  return saveAppData(next);
}

export async function resetVocabularyProgress() {
  const data = await loadAppData();
  const next = { ...data, progress: createDefaultProgress() };
  return saveAppData(next);
}

export async function updateSettings(settings) {
  const data = await loadAppData();
  const merged = { ...data.settings, ...(settings || {}), theme: "wiggleFarm" };
  const next = { ...data, settings: merged };
  return saveAppData(next);
}

// Clears statistics, vocabulary progress, achievements, and settings,
// then restores defaults.
export async function clearAllData() {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    // ignore
  }
  const defaults = createDefaultAppData();
  return saveAppData(defaults);
}
