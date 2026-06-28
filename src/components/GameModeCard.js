// A selectable card for a game mode.

import React from "react";
import { Text, Pressable, StyleSheet, View } from "react-native";

import colors from "../theme/colors";

export default function GameModeCard({ mode, selected, onPress }) {
  const m = mode || {};
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        selected ? styles.selected : null,
        pressed ? styles.pressed : null,
      ]}
    >
      <View style={styles.row}>
        <Text style={styles.emoji}>{m.emoji ?? "🎯"}</Text>
        <View style={styles.col}>
          <Text style={styles.label}>{m.label ?? "Game"}</Text>
          <Text style={styles.desc}>{m.description ?? ""}</Text>
        </View>
        {selected ? <Text style={styles.check}>✅</Text> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors?.card ?? "#FFFFFF",
    borderRadius: 18,
    borderWidth: 3,
    borderColor: colors?.border ?? "#E5E8D8",
    padding: 16,
    marginVertical: 7,
  },
  selected: { borderColor: colors?.secondary ?? "#6C63FF", backgroundColor: "#F4F3FF" },
  pressed: { opacity: 0.9 },
  row: { flexDirection: "row", alignItems: "center" },
  emoji: { fontSize: 38, marginRight: 14 },
  col: { flex: 1 },
  label: { fontSize: 18, fontWeight: "800", color: colors?.text ?? "#2E3440" },
  desc: { fontSize: 14, color: colors?.mutedText ?? "#7B8794", marginTop: 3 },
  check: { fontSize: 20, marginLeft: 8 },
});
