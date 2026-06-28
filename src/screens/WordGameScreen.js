// One calm vocabulary question at a time. No timer, no countdown, no pressure.
// Keep awake is active only on this screen.

import React, { useState, useEffect, useRef, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import colors from "../theme/colors";
import ScreenContainer from "../components/ScreenContainer";
import PictureCard from "../components/PictureCard";
import AnswerCard from "../components/AnswerCard";
import AppButton from "../components/AppButton";
import WiggleMascot from "../components/WiggleMascot";
import EmptyState from "../components/EmptyState";

import { getCategoryItem } from "../data/categoryItems";
import { buildWordQuestion } from "../utils/questionBuilder";
import { isCorrectAnswer } from "../utils/vocabularyHelpers";
import { recordVocabularyAnswer } from "../storage/appStorage";
import { loadAppData } from "../storage/appStorage";
import { getNowIso } from "../utils/dateUtils";
import {
  speakWordIfEnabled,
  stopSpeechSafely,
  isSpeechAvailableSafely,
} from "../utils/speechHelpers";
import { playCorrectSoundIfEnabled } from "../utils/soundHelpers";
import {
  activateGameKeepAwake,
  deactivateGameKeepAwake,
} from "../utils/immersiveHelpers";

const ENCOURAGEMENTS = ["Take your time.", "Look at the picture.", "Wiggle can help."];

export default function WordGameScreen({ navigation, route }) {
  const categoryId = route?.params?.categoryId ?? "animals";
  const gameMode = route?.params?.gameMode ?? "find_word";
  const difficulty = route?.params?.difficulty ?? "easy";
  const category = getCategoryItem(categoryId);

  const [settings, setSettings] = useState(null);
  const [question, setQuestion] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [resolved, setResolved] = useState(false);
  const [wasCorrect, setWasCorrect] = useState(false);
  const encourageRef = useRef(ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)]);

  const speechOk = isSpeechAvailableSafely();

  const newQuestion = useCallback(() => {
    const q = buildWordQuestion(gameMode, categoryId, difficulty);
    setQuestion(q);
    setSelectedId(null);
    setResolved(false);
    setWasCorrect(false);
    encourageRef.current = ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)];
  }, [gameMode, categoryId, difficulty]);

  // Load settings + first question, manage keep-awake on this screen only.
  useFocusEffect(
    useCallback(() => {
      let active = true;
      activateGameKeepAwake();
      loadAppData().then((d) => {
        if (active) setSettings(d?.settings ?? null);
      });
      return () => {
        active = false;
        deactivateGameKeepAwake();
        stopSpeechSafely();
      };
    }, [])
  );

  useEffect(() => {
    newQuestion();
  }, [newQuestion]);

  // For listen mode, speak the word when a new question appears (if enabled).
  useEffect(() => {
    if (!question) return;
    if (question.gameMode === "listen_choose") {
      speakWordIfEnabled(question.targetWord, settings);
    }
  }, [question?.id]);

  const onSpeak = () => {
    if (question) speakWordIfEnabled(question.targetWord, settings);
  };

  const onAnswer = (choiceId) => {
    if (resolved || !question) return;
    const correct = isCorrectAnswer(choiceId, question.correctAnswerId);
    setSelectedId(choiceId);
    setResolved(true);
    setWasCorrect(correct);

    if (correct) {
      playCorrectSoundIfEnabled(settings);
    }

    recordVocabularyAnswer({
      gameMode: question.gameMode,
      categoryId: question.categoryId,
      wordId: question.targetWordId,
      difficulty: question.difficulty,
      isCorrect: correct,
      completedAt: getNowIso(),
    });
  };

  if (!question) {
    return (
      <ScreenContainer>
        <EmptyState title="Getting a word ready" message="Please wait a moment." emoji="🌾" />
      </ScreenContainer>
    );
  }

  const choices = question?.choices ?? [];
  const isPictureAnswers = question.gameMode === "match_picture" || question.gameMode === "listen_choose";

  const answerState = (choiceId) => {
    if (!resolved) return "idle";
    if (choiceId === question.correctAnswerId) return "correct";
    if (choiceId === selectedId) return "incorrect";
    return "disabled";
  };

  return (
    <ScreenContainer>
      <Text style={styles.area}>{category.emoji} {category.farmArea}</Text>
      <Text style={styles.prompt}>{question.prompt}</Text>

      {/* Display area depends on the game mode */}
      {question.gameMode === "find_word" ? (
        <PictureCard emoji={question.targetEmoji} big />
      ) : null}

      {question.gameMode === "match_picture" ? (
        <View style={styles.wordPrompt}>
          <Text style={styles.wordPromptText}>{question.targetWord}</Text>
        </View>
      ) : null}

      {question.gameMode === "listen_choose" ? (
        <View style={styles.listenBox}>
          <AppButton
            label={speechOk ? "Hear Word" : "Show Word"}
            emoji="🔊"
            variant="secondary"
            onPress={speechOk ? onSpeak : undefined}
            style={styles.speakBtn}
          />
          {!speechOk ? (
            <Text style={styles.fallbackWord}>{question.targetWord}</Text>
          ) : (
            <Text style={styles.listenHint}>Tap to hear the word again.</Text>
          )}
        </View>
      ) : null}

      <Text style={styles.hint}>{question.hint}</Text>

      <View style={styles.choices}>
        {choices.length === 0 ? (
          <EmptyState title="No choices to show" message="Please go back and try again." emoji="🌾" />
        ) : (
          choices.map((ch) => (
            <AnswerCard
              key={ch.id}
              choice={ch}
              mode={isPictureAnswers ? "picture" : "word"}
              state={answerState(ch.id)}
              onPress={() => onAnswer(ch.id)}
            />
          ))
        )}
      </View>

      {/* Feedback */}
      {resolved ? (
        <View style={styles.feedbackCard}>
          <WiggleMascot size={70} mood={wasCorrect ? "cheer" : "happy"} />
          {wasCorrect ? (
            <Text style={styles.good}>Great word!</Text>
          ) : (
            <Text style={styles.tryAgain}>Good try. The word was: {question.correctLabel}.</Text>
          )}
          <AppButton label="Next Word" emoji="➡️" variant="primary" onPress={newQuestion} />
        </View>
      ) : (
        <Text style={styles.encourage}>{encourageRef.current}</Text>
      )}

      <AppButton
        label="Back"
        emoji="⬅️"
        variant="ghost"
        onPress={() => navigation.goBack()}
        style={styles.backBtn}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  area: { fontSize: 18, fontWeight: "800", color: colors?.primary ?? "#5FA777", textAlign: "center" },
  prompt: { fontSize: 22, fontWeight: "800", color: colors?.text ?? "#2E3440", textAlign: "center", marginTop: 8, marginBottom: 12 },
  wordPrompt: {
    backgroundColor: colors?.card ?? "#FFFFFF",
    borderRadius: 24,
    borderWidth: 3,
    borderColor: colors?.border ?? "#E5E8D8",
    paddingVertical: 28,
    alignItems: "center",
  },
  wordPromptText: { fontSize: 40, fontWeight: "900", color: colors?.text ?? "#2E3440" },
  listenBox: {
    backgroundColor: colors?.cream ?? "#FFF8EC",
    borderRadius: 24,
    borderWidth: 3,
    borderColor: colors?.border ?? "#E5E8D8",
    paddingVertical: 22,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  speakBtn: { alignSelf: "stretch" },
  fallbackWord: { fontSize: 36, fontWeight: "900", color: colors?.text ?? "#2E3440", marginTop: 10 },
  listenHint: { fontSize: 14, color: colors?.mutedText ?? "#7B8794", marginTop: 8 },
  hint: { fontSize: 15, color: colors?.mutedText ?? "#7B8794", textAlign: "center", marginTop: 12 },
  choices: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginTop: 8 },
  encourage: { fontSize: 15, color: colors?.secondary ?? "#6C63FF", textAlign: "center", marginTop: 12, fontWeight: "700" },
  feedbackCard: {
    backgroundColor: colors?.cream ?? "#FFF8EC",
    borderRadius: 22,
    borderWidth: 3,
    borderColor: colors?.border ?? "#E5E8D8",
    padding: 16,
    alignItems: "center",
    marginTop: 14,
  },
  good: { fontSize: 22, fontWeight: "900", color: colors?.success ?? "#52B788", marginVertical: 8 },
  tryAgain: { fontSize: 18, fontWeight: "700", color: colors?.text ?? "#2E3440", marginVertical: 8, textAlign: "center" },
  backBtn: { marginTop: 12 },
});
