// Home screen: cheerful farm entrance.

import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import colors from "../theme/colors";
import ScreenContainer from "../components/ScreenContainer";
import WiggleMascot from "../components/WiggleMascot";
import AppButton from "../components/AppButton";
import StatCard from "../components/StatCard";
import { loadAppData } from "../storage/appStorage";
import { getTotalCorrect } from "../utils/statsHelpers";
import { getLearnedWordIds, getAchievementIds } from "../utils/progressHelpers";

export default function WiggleHomeScreen({ navigation }) {
  const [data, setData] = useState(null);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      loadAppData().then((d) => {
        if (active) setData(d);
      });
      return () => {
        active = false;
      };
    }, [])
  );

  const learnedCount = getLearnedWordIds(data?.progress).length;
  const correct = getTotalCorrect(data?.stats);
  const achievements = getAchievementIds(data?.progress).length;
  const hasProgress = learnedCount > 0 || correct > 0 || achievements > 0;

  return (
    <ScreenContainer>
      {/* Decorative farm background */}
      <View style={styles.sky} />
      <View style={styles.hill} />

      <View style={styles.header}>
        <WiggleMascot size={120} mood="cheer" />
        <Text style={styles.title}>Wiggle Word Farm</Text>
        <Text style={styles.subtitle}>Learn simple English words on the farm.</Text>
      </View>

      <View style={styles.previewCard}>
        <Text style={styles.previewTitle}>Farm word progress</Text>
        {hasProgress ? (
          <View style={styles.statsRow}>
            <StatCard label="Words learned" value={learnedCount} emoji="📘" />
            <StatCard label="Correct answers" value={correct} emoji="✅" />
            <StatCard label="Achievements" value={achievements} emoji="🏅" />
          </View>
        ) : (
          <Text style={styles.emptyText}>Visit the farm and learn your first word.</Text>
        )}
      </View>

      <View style={styles.buttons}>
        <AppButton
          label="Start Farm"
          emoji="🚜"
          variant="primary"
          onPress={() => navigation.navigate("FarmCategory", { next: "WordCards" })}
        />
        <AppButton
          label="Word Cards"
          emoji="🗂️"
          variant="ghost"
          onPress={() => navigation.navigate("FarmCategory", { next: "WordCards" })}
        />
        <AppButton
          label="My Progress"
          emoji="🏅"
          variant="ghost"
          onPress={() => navigation.navigate("VocabularyProgress")}
        />
        <AppButton
          label="Parent Settings"
          emoji="⚙️"
          variant="ghost"
          onPress={() => navigation.navigate("ParentSettings")}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  sky: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 220,
    backgroundColor: "#DCEBFF",
  },
  hill: {
    position: "absolute",
    top: 160,
    left: -60,
    right: -60,
    height: 260,
    backgroundColor: colors?.farmGrass ?? "#BDE0C8",
    borderTopLeftRadius: 300,
    borderTopRightRadius: 300,
  },
  header: { alignItems: "center", marginTop: 10, marginBottom: 18 },
  title: { fontSize: 30, fontWeight: "900", color: colors?.primary ?? "#5FA777", marginTop: 12 },
  subtitle: { fontSize: 16, color: colors?.text ?? "#2E3440", marginTop: 6, textAlign: "center" },
  previewCard: {
    backgroundColor: colors?.cream ?? "#FFF8EC",
    borderRadius: 22,
    borderWidth: 3,
    borderColor: colors?.border ?? "#E5E8D8",
    padding: 16,
    marginBottom: 18,
  },
  previewTitle: { fontSize: 17, fontWeight: "800", color: colors?.text ?? "#2E3440", marginBottom: 10, textAlign: "center" },
  statsRow: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center" },
  emptyText: { fontSize: 15, color: colors?.mutedText ?? "#7B8794", textAlign: "center", paddingVertical: 6 },
  buttons: { marginTop: 4 },
});
