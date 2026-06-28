// Builds one calm vocabulary question at a time. Predictable and safe.
// Never returns undefined. No timer logic. Answer choices always include the
// correct answer and never contain duplicates.

import {
  getWordsForDifficulty,
  getVocabularyItem,
} from "../data/vocabularyItems";
import { getCategoryItem } from "../data/categoryItems";
import {
  createWordChoices,
  createPictureChoices,
  shuffleArray,
} from "./vocabularyHelpers";
import { getPromptForGameMode, getHintForWordQuestion } from "./wordGameHelpers";

const VALID_GAME_MODES = ["find_word", "match_picture", "listen_choose"];
const VALID_DIFFICULTIES = ["easy", "medium", "hard"];

function safeGameMode(gameMode) {
  return VALID_GAME_MODES.indexOf(gameMode) >= 0 ? gameMode : "find_word";
}

function safeDifficulty(difficulty) {
  return VALID_DIFFICULTIES.indexOf(difficulty) >= 0 ? difficulty : "easy";
}

function makeQuestionId() {
  return "question_" + Date.now() + "_" + Math.floor(Math.random() * 100000);
}

function pickTargetWord(categoryId, difficulty) {
  const pool = getWordsForDifficulty(categoryId, difficulty);
  const shuffled = shuffleArray(pool);
  return shuffled.length > 0 ? shuffled[0] : getVocabularyItem("animal_cow");
}

function baseQuestion(gameMode, categoryId, difficulty, target, choices) {
  return {
    id: makeQuestionId(),
    gameMode,
    categoryId: getCategoryItem(categoryId).id,
    difficulty,
    prompt: getPromptForGameMode(gameMode),
    targetWordId: target.id,
    targetWord: target.word,
    targetEmoji: target.emoji,
    correctAnswerId: target.id,
    correctLabel: target.word,
    choices: choices,
    hint: getHintForWordQuestion(gameMode),
  };
}

export function buildFindWordQuestion(categoryId, difficulty) {
  const diff = safeDifficulty(difficulty);
  const target = pickTargetWord(categoryId, diff);
  // Show a picture, choose a word.
  const choices = createWordChoices(target.id, categoryId, diff);
  return baseQuestion("find_word", categoryId, diff, target, choices);
}

export function buildMatchPictureQuestion(categoryId, difficulty) {
  const diff = safeDifficulty(difficulty);
  const target = pickTargetWord(categoryId, diff);
  // Show a word, choose a picture.
  const choices = createPictureChoices(target.id, categoryId, diff);
  return baseQuestion("match_picture", categoryId, diff, target, choices);
}

export function buildListenChooseQuestion(categoryId, difficulty) {
  const diff = safeDifficulty(difficulty);
  const target = pickTargetWord(categoryId, diff);
  // App speaks the word (if available); child chooses the picture.
  // Falls back to visual word display when speech is unavailable (handled in UI).
  const choices = createPictureChoices(target.id, categoryId, diff);
  return baseQuestion("listen_choose", categoryId, diff, target, choices);
}

export function buildWordQuestion(gameMode, categoryId, difficulty) {
  const mode = safeGameMode(gameMode);
  if (mode === "match_picture") return buildMatchPictureQuestion(categoryId, difficulty);
  if (mode === "listen_choose") return buildListenChooseQuestion(categoryId, difficulty);
  return buildFindWordQuestion(categoryId, difficulty);
}
