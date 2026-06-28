// Choose a game mode and difficulty.
// "Listen and Choose" is included only when speech is available on the device.

import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import colors from "../theme/colors";
import ScreenContainer from "../components/ScreenContainer";
import GameModeCard from "../components/GameModeCard";
import DifficultyChip from "../components/DifficultyChip";
import AppButton from "../components/AppButton";
import { GAME_MODE_ITEMS, DIFFICULTY_ITEMS } from "../data/gameModeItems";
import { getCategoryItem } from "../data/categoryItems";
import { loadAppData } from "../storage/appStorage";
import { isSpeechAvailableSafely } from "../utils/speechHelpers";

export default function GamePickerScreen({ navigation, route }) {
  const categoryId = route?.params?.categoryId ?? "animals";
  const category = getCategoryItem(categoryId);

  const [gameMode, setGameMode] = useState(null);
  const [difficulty, setDifficulty] = useState("easy");
  const [error, setError] = useState("");

  useFocusEffect(
    useCallback(() => {
      let active = true;
      loadAppData().then((d) => {
        if (active) {
          const def = d?.settings?.defaultDifficulty ?? "easy";
          setDifficulty(def);
        }
      });
      return () => {
        active = false;
      };
    }, [])
  );

  // Only show Listen and Choose if speech can run safely on this device.
  const speechOk = isSpeechAvailableSafely();
  const modes = GAME_MODE_ITEMS.filter(
    (m) => m.id !== "listen_choose" || speechOk
  );

  const onStart = () => {
    if (!gameMode) {
      setError("Please choose a game.");
      return;
    }
    if (!difficulty) {
      setError("Please choose a difficulty.");
      return;
    }
    setError("");
    navigation.navigate("WordGame", { categoryId, gameMode, difficulty });
  };

  return (
    <ScreenContainer>
      <Text style={styles.area}>{category.emoji} {category.farmArea}</Text>

      <Text style={styles.section}>Choose a game</Text>
      {modes.map((m) => (
        <GameModeCard
          key={m.id}
          mode={m}
          selected={gameMode === m.id}
          onPress={() => {
            setGameMode(m.id);
            setError("");
          }}
        />
      ))}

      <Text style={styles.section}>Choose a difficulty</Text>
      <View style={styles.chips}>
        {DIFFICULTY_ITEMS.map((d) => (
          <DifficultyChip
            key={d.id}
            difficulty={d}
            selected={difficulty === d.id}
            onPress={() => {
              setDifficulty(d.id);
              setError("");
            }}
          />
        ))}
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={styles.buttons}>
        <AppButton label="Start Game" emoji="▶️" variant="primary" onPress={onStart} />
        <AppButton label="Back" emoji="⬅️" variant="ghost" onPress={() => navigation.goBack()} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  area: { fontSize: 20, fontWeight: "800", color: colors?.primary ?? "#5FA777", textAlign: "center", marginBottom: 8 },
  section: { fontSize: 17, fontWeight: "800", color: colors?.text ?? "#2E3440", marginTop: 14, marginBottom: 6 },
  chips: { flexDirection: "row", flexWrap: "wrap" },
  error: { fontSize: 15, color: colors?.danger ?? "#E76F51", textAlign: "center", marginTop: 10, fontWeight: "700" },
  buttons: { marginTop: 16 },
});
