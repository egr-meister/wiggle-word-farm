// Game modes and difficulty levels. Static, local, no pressure / no timers.

export const GAME_MODE_ITEMS = [
  {
    id: "find_word",
    label: "Find the Word",
    emoji: "🔎",
    description: "Look at the picture and choose the word.",
  },
  {
    id: "match_picture",
    label: "Match Word and Picture",
    emoji: "🧩",
    description: "Match the word with the correct picture.",
  },
  {
    id: "listen_choose",
    label: "Listen and Choose",
    emoji: "🔊",
    description: "Hear the word and choose the picture.",
  },
];

export const DIFFICULTY_ITEMS = [
  {
    id: "easy",
    label: "Easy",
    emoji: "🌱",
    choiceCount: 2,
    description: "Two choices and big picture cards.",
  },
  {
    id: "medium",
    label: "Medium",
    emoji: "🌿",
    choiceCount: 3,
    description: "Three choices from the same farm area.",
  },
  {
    id: "hard",
    label: "Hard",
    emoji: "🌳",
    choiceCount: 4,
    description: "Four choices from mixed farm areas.",
  },
];

export function getGameModeItem(gameMode) {
  const found = GAME_MODE_ITEMS.find((g) => g.id === gameMode);
  return found || GAME_MODE_ITEMS[0];
}

export function getDifficultyItem(difficulty) {
  const found = DIFFICULTY_ITEMS.find((d) => d.id === difficulty);
  return found || DIFFICULTY_ITEMS[0];
}
