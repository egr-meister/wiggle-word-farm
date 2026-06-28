// Teach vocabulary cards for the selected category.
// Opening a card marks the word as learned locally (no login, no sync).

import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import colors from "../theme/colors";
import ScreenContainer from "../components/ScreenContainer";
import WordCard from "../components/WordCard";
import AppButton from "../components/AppButton";
import EmptyState from "../components/EmptyState";
import { getWordsByCategory } from "../data/vocabularyItems";
import { getCategoryItem } from "../data/categoryItems";
import { loadAppData, markVocabularyWordLearned } from "../storage/appStorage";
import { getLearnedWordIds } from "../utils/progressHelpers";
import { speakWordIfEnabled } from "../utils/speechHelpers";

export default function WordCardsScreen({ navigation, route }) {
  const categoryId = route?.params?.categoryId ?? "animals";
  const category = getCategoryItem(categoryId);
  const words = getWordsByCategory(categoryId);

  const [index, setIndex] = useState(0);
  const [settings, setSettings] = useState(null);
  const [learnedIds, setLearnedIds] = useState([]);

  const current = words.length > 0 ? words[Math.min(index, words.length - 1)] : null;

  useFocusEffect(
    useCallback(() => {
      let active = true;
      loadAppData().then((d) => {
        if (active) {
          setSettings(d?.settings ?? null);
          setLearnedIds(getLearnedWordIds(d?.progress));
        }
      });
      return () => {
        active = false;
      };
    }, [])
  );

  // Mark the visible word as learned when it is shown.
  useEffect(() => {
    if (!current) return;
    markVocabularyWordLearned(current.id).then((d) => {
      setLearnedIds(getLearnedWordIds(d?.progress));
    });
  }, [current?.id]);

  const onHear = () => {
    if (current) speakWordIfEnabled(current.word, settings);
  };

  const goNext = () => {
    if (words.length === 0) return;
    setIndex((i) => (i + 1) % words.length);
  };

  if (!current) {
    return (
      <ScreenContainer>
        <EmptyState
          title="No words here yet"
          message="Please choose another farm area to learn words."
          emoji="🌾"
        />
        <AppButton label="Back" emoji="⬅️" variant="ghost" onPress={() => navigation.goBack()} />
      </ScreenContainer>
    );
  }

  const soundOn = settings ? settings.soundEnabled !== false && settings.wordVoiceEnabled !== false : true;
  const learned = learnedIds.indexOf(current.id) >= 0;

  return (
    <ScreenContainer>
      <Text style={styles.area}>{category.emoji} {category.farmArea}</Text>
      <Text style={styles.counter}>Card {Math.min(index, words.length - 1) + 1} of {words.length}</Text>

      <WordCard item={current} learned={learned} />

      <View style={styles.buttons}>
        {soundOn ? (
          <AppButton label="Hear Word" emoji="🔊" variant="secondary" onPress={onHear} />
        ) : null}
        <AppButton label="Next Card" emoji="🔁" variant="primary" onPress={goNext} />
        <AppButton
          label="Play a Game"
          emoji="🎮"
          variant="accent"
          onPress={() => navigation.navigate("GamePicker", { categoryId })}
        />
        <AppButton label="Back" emoji="⬅️" variant="ghost" onPress={() => navigation.goBack()} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  area: { fontSize: 20, fontWeight: "800", color: colors?.primary ?? "#5FA777", textAlign: "center" },
  counter: { fontSize: 14, color: colors?.mutedText ?? "#7B8794", textAlign: "center", marginTop: 4 },
  buttons: { marginTop: 12 },
});
