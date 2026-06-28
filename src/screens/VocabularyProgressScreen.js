// Local progress and achievements. No rankings, leaderboards, or sharing.

import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import colors from "../theme/colors";
import ScreenContainer from "../components/ScreenContainer";
import StatCard from "../components/StatCard";
import ProgressBadge from "../components/ProgressBadge";
import AppButton from "../components/AppButton";
import EmptyState from "../components/EmptyState";

import { ACHIEVEMENT_ITEMS } from "../data/achievementItems";
import { CATEGORY_ITEMS, getCategoryItem } from "../data/categoryItems";
import { GAME_MODE_ITEMS, getGameModeItem } from "../data/gameModeItems";
import {
  loadAppData,
  resetVocabularyStats,
  resetVocabularyProgress,
} from "../storage/appStorage";
import {
  getTotalCorrect,
  getTotalIncorrect,
  getTotalAnswered,
} from "../utils/statsHelpers";
import { getLearnedWordIds, getAchievementIds } from "../utils/progressHelpers";

export default function VocabularyProgressScreen({ navigation }) {
  const [data, setData] = useState(null);

  const reload = useCallback(() => {
    let active = true;
    loadAppData().then((d) => {
      if (active) setData(d);
    });
    return () => {
      active = false;
    };
  }, []);

  useFocusEffect(reload);

  const stats = data?.stats;
  const progress = data?.progress;
  const learned = getLearnedWordIds(progress);
  const unlocked = getAchievementIds(progress);
  const correct = getTotalCorrect(stats);
  const incorrect = getTotalIncorrect(stats);
  const answered = getTotalAnswered(stats);
  const hasProgress = learned.length > 0 || answered > 0 || unlocked.length > 0;

  const onReset = () => {
    Alert.alert(
      "Reset Progress",
      "Are you sure you want to reset farm word progress?",
      [
        { text: "Keep", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: async () => {
            await resetVocabularyStats();
            await resetVocabularyProgress();
            reload();
          },
        },
      ]
    );
  };

  if (!hasProgress) {
    return (
      <ScreenContainer>
        <EmptyState
          title="No farm word progress yet."
          message="Visit the farm and learn your first word."
          emoji="🌱"
        />
        <View style={styles.buttons}>
          <AppButton label="Back Home" emoji="🏠" variant="primary" onPress={() => navigation.navigate("WiggleHome")} />
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <Text style={styles.title}>Your farm word progress</Text>

      <View style={styles.statsRow}>
        <StatCard label="Words learned" value={learned.length} emoji="📘" />
        <StatCard label="Correct answers" value={correct} emoji="✅" />
        <StatCard label="Incorrect answers" value={incorrect} emoji="🔁" />
        <StatCard label="Total answers" value={answered} emoji="🧮" />
        <StatCard label="Achievements" value={unlocked.length} emoji="🏅" />
      </View>

      <Text style={styles.section}>Progress by farm area</Text>
      {CATEGORY_ITEMS.map((cat) => {
        const cs = stats?.byCategory?.[cat.id] ?? { correct: 0, incorrect: 0 };
        return (
          <View key={cat.id} style={styles.rowCard}>
            <Text style={styles.rowEmoji}>{cat.emoji}</Text>
            <Text style={styles.rowLabel}>{cat.farmArea}</Text>
            <Text style={styles.rowValue}>✅ {cs.correct ?? 0}  ·  🔁 {cs.incorrect ?? 0}</Text>
          </View>
        );
      })}

      <Text style={styles.section}>Progress by game</Text>
      {GAME_MODE_ITEMS.map((gm) => {
        const gs = stats?.byGameMode?.[gm.id] ?? { correct: 0, incorrect: 0 };
        return (
          <View key={gm.id} style={styles.rowCard}>
            <Text style={styles.rowEmoji}>{gm.emoji}</Text>
            <Text style={styles.rowLabel}>{gm.label}</Text>
            <Text style={styles.rowValue}>✅ {gs.correct ?? 0}  ·  🔁 {gs.incorrect ?? 0}</Text>
          </View>
        );
      })}

      <Text style={styles.section}>Farm stickers (achievements)</Text>
      <Text style={styles.note}>
        Achievements are simple learning markers. They have no money value.
      </Text>
      <View style={styles.badges}>
        {ACHIEVEMENT_ITEMS.map((a) => (
          <ProgressBadge key={a.id} achievement={a} unlocked={unlocked.indexOf(a.id) >= 0} />
        ))}
      </View>

      <View style={styles.buttons}>
        <AppButton label="Reset Progress" emoji="♻️" variant="danger" onPress={onReset} />
        <AppButton label="Back Home" emoji="🏠" variant="ghost" onPress={() => navigation.navigate("WiggleHome")} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: "900", color: colors?.primary ?? "#5FA777", textAlign: "center", marginBottom: 12 },
  statsRow: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center" },
  section: { fontSize: 18, fontWeight: "800", color: colors?.text ?? "#2E3440", marginTop: 18, marginBottom: 8 },
  note: { fontSize: 13, color: colors?.mutedText ?? "#7B8794", marginBottom: 8 },
  rowCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors?.card ?? "#FFFFFF",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors?.border ?? "#E5E8D8",
    padding: 12,
    marginVertical: 5,
  },
  rowEmoji: { fontSize: 26, marginRight: 12 },
  rowLabel: { flex: 1, fontSize: 16, fontWeight: "700", color: colors?.text ?? "#2E3440" },
  rowValue: { fontSize: 14, color: colors?.mutedText ?? "#7B8794", fontWeight: "700" },
  badges: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center" },
  buttons: { marginTop: 18 },
});
