// A large, colorful vocabulary card: word + big picture + short example.

import React from "react";
import { View, Text, StyleSheet } from "react-native";

import colors from "../theme/colors";

export default function WordCard({ item, learned = false }) {
  const w = item || {};
  return (
    <View style={styles.card}>
      {learned ? (
        <View style={styles.learnedTag}>
          <Text style={styles.learnedText}>Learned ✅</Text>
        </View>
      ) : null}
      <Text style={styles.emoji}>{w.emoji ?? "🌾"}</Text>
      <Text style={styles.word}>{w.word ?? "Word"}</Text>
      <Text style={styles.example}>{w.exampleText ?? ""}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors?.card ?? "#FFFFFF",
    borderRadius: 24,
    borderWidth: 3,
    borderColor: colors?.border ?? "#E5E8D8",
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: "center",
    marginVertical: 10,
  },
  learnedTag: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#E7F7EC",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  learnedText: { fontSize: 12, fontWeight: "700", color: colors?.success ?? "#52B788" },
  emoji: { fontSize: 96 },
  word: { fontSize: 40, fontWeight: "800", color: colors?.text ?? "#2E3440", marginTop: 8 },
  example: { fontSize: 18, color: colors?.mutedText ?? "#7B8794", marginTop: 10, textAlign: "center" },
});
