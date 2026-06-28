// Parent settings: word voice, default difficulty, notes, and clear data.

import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, Switch, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import colors from "../theme/colors";
import ScreenContainer from "../components/ScreenContainer";
import DifficultyChip from "../components/DifficultyChip";
import AppButton from "../components/AppButton";
import { DIFFICULTY_ITEMS } from "../data/gameModeItems";
import {
  loadAppData,
  updateSettings,
  clearAllData,
} from "../storage/appStorage";

export default function ParentSettingsScreen({ navigation }) {
  const [settings, setSettings] = useState(null);

  const reload = useCallback(() => {
    let active = true;
    loadAppData().then((d) => {
      if (active) setSettings(d?.settings ?? null);
    });
    return () => {
      active = false;
    };
  }, []);

  useFocusEffect(reload);

  const soundEnabled = settings ? settings.soundEnabled !== false : true;
  const defaultDifficulty = settings?.defaultDifficulty ?? "easy";

  const onToggleSound = async (value) => {
    const next = { ...(settings || {}), soundEnabled: value, wordVoiceEnabled: value };
    setSettings(next);
    await updateSettings(next);
  };

  const onSetDifficulty = async (id) => {
    const next = { ...(settings || {}), defaultDifficulty: id };
    setSettings(next);
    await updateSettings(next);
  };

  const onClearAll = () => {
    Alert.alert(
      "Clear All Data",
      "Are you sure you want to delete all local farm word progress?",
      [
        { text: "Keep", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            const d = await clearAllData();
            setSettings(d?.settings ?? null);
          },
        },
      ]
    );
  };

  return (
    <ScreenContainer>
      {/* Word Voice / Sound */}
      <View style={styles.card}>
        <View style={styles.rowBetween}>
          <Text style={styles.cardTitle}>Word Voice / Sound</Text>
          <Switch
            value={soundEnabled}
            onValueChange={onToggleSound}
            trackColor={{ true: colors?.primary ?? "#5FA777", false: "#CCCCCC" }}
            thumbColor="#FFFFFF"
          />
        </View>
        <Text style={styles.bodyText}>
          Word voice helps children hear simple English words. It can be turned off anytime.
        </Text>
        <Text style={styles.smallNote}>
          If word voice is not available on the device, the app continues with visual word cards.
        </Text>
      </View>

      {/* Default Difficulty */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Default Difficulty</Text>
        <View style={styles.chips}>
          {DIFFICULTY_ITEMS.map((d) => (
            <DifficultyChip
              key={d.id}
              difficulty={d}
              selected={defaultDifficulty === d.id}
              onPress={() => onSetDifficulty(d.id)}
            />
          ))}
        </View>
      </View>

      {/* Theme */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Theme</Text>
        <Text style={styles.bodyText}>Wiggle Word Farm uses a bright but calm farm theme.</Text>
      </View>

      {/* Achievement Progress */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Achievement Progress</Text>
        <Text style={styles.bodyText}>
          Achievements are simple learning markers inside the app. They have no money value.
        </Text>
      </View>

      {/* Privacy Note */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Privacy</Text>
        <Text style={styles.bodyText}>
          Wiggle Word Farm does not collect personal data. The app works offline and stores
          vocabulary progress, statistics, achievements, and settings only on this device.
        </Text>
      </View>

      {/* Child-Friendly Note */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Child-Friendly</Text>
        <Text style={styles.bodyText}>
          There are no ads, purchases, accounts, internet access, speech recognition, voice
          recording, social sharing, or leaderboards. This is a calm offline learning app.
        </Text>
      </View>

      {/* Clear All Data */}
      <View style={styles.buttons}>
        <AppButton label="Clear All Data" emoji="🧹" variant="danger" onPress={onClearAll} />
        <AppButton label="Back Home" emoji="🏠" variant="ghost" onPress={() => navigation.navigate("WiggleHome")} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors?.card ?? "#FFFFFF",
    borderRadius: 18,
    borderWidth: 2,
    borderColor: colors?.border ?? "#E5E8D8",
    padding: 16,
    marginVertical: 7,
  },
  rowBetween: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  cardTitle: { fontSize: 18, fontWeight: "800", color: colors?.text ?? "#2E3440", marginBottom: 6 },
  bodyText: { fontSize: 15, color: colors?.text ?? "#2E3440", marginTop: 4, lineHeight: 21 },
  smallNote: { fontSize: 13, color: colors?.mutedText ?? "#7B8794", marginTop: 8, lineHeight: 18 },
  chips: { flexDirection: "row", flexWrap: "wrap", marginTop: 6 },
  buttons: { marginTop: 14 },
});
