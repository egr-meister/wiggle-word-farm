// Local learning achievements. These are simple progress markers only.
// They have NO money value. No coins, bonus, jackpot, or rewards of any kind.

import { getVocabularyItem } from "./vocabularyItems";

export const ACHIEVEMENT_ITEMS = [
  {
    id: "first_farm_word",
    label: "First Farm Word Badge",
    emoji: "🌟",
    description: "Learn your first farm word.",
  },
  {
    id: "animal_barn",
    label: "Animal Barn Badge",
    emoji: "🐮",
    description: "Learn 5 animal words.",
  },
  {
    id: "food_garden",
    label: "Food Garden Badge",
    emoji: "🍎",
    description: "Learn 5 food words.",
  },
  {
    id: "color_fence",
    label: "Color Fence Badge",
    emoji: "🌈",
    description: "Learn 5 color words.",
  },
  {
    id: "tool_shed",
    label: "Tool Shed Badge",
    emoji: "🧺",
    description: "Learn 5 tool words.",
  },
  {
    id: "farm_word_star",
    label: "Farm Word Star",
    emoji: "🏅",
    description: "Answer 25 questions correctly.",
  },
];

function countLearnedInCategory(learnedWordIds, categoryId) {
  let count = 0;
  for (let i = 0; i < learnedWordIds.length; i++) {
    const item = getVocabularyItem(learnedWordIds[i]);
    if (item && item.categoryId === categoryId) count += 1;
  }
  return count;
}

// Returns an array of unlocked achievement ids based on stats and progress.
// Safe with empty / missing data.
export function getUnlockedAchievements(stats, progress) {
  const learned = (progress && Array.isArray(progress.learnedWordIds))
    ? progress.learnedWordIds
    : [];
  const correct = (stats && typeof stats.correct === "number") ? stats.correct : 0;

  const unlocked = [];

  if (learned.length >= 1) unlocked.push("first_farm_word");
  if (countLearnedInCategory(learned, "animals") >= 5) unlocked.push("animal_barn");
  if (countLearnedInCategory(learned, "food") >= 5) unlocked.push("food_garden");
  if (countLearnedInCategory(learned, "colors") >= 5) unlocked.push("color_fence");
  if (countLearnedInCategory(learned, "tools") >= 5) unlocked.push("tool_shed");
  if (correct >= 25) unlocked.push("farm_word_star");

  return unlocked;
}
