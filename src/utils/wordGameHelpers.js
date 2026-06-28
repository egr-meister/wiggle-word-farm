// Short, calm, child-friendly prompts and hints. No timers, no pressure,
// no shame wording.

import { getGameModeItem } from "../data/gameModeItems";

export function getGameModeLabel(gameMode) {
  return getGameModeItem(gameMode).label;
}

export function getPromptForGameMode(gameMode) {
  switch (gameMode) {
    case "match_picture":
      return "Match the picture.";
    case "listen_choose":
      return "Listen and choose.";
    case "find_word":
    default:
      return "Which word matches the picture?";
  }
}

export function getHintForWordQuestion(gameMode) {
  switch (gameMode) {
    case "match_picture":
      return "Find the right picture.";
    case "listen_choose":
      return "Tap the matching picture.";
    case "find_word":
    default:
      return "Look at the picture.";
  }
}
