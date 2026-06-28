// A small stat tile used on home and progress screens.

import React from "react";
import { View, Text, StyleSheet } from "react-native";

import colors from "../theme/colors";

export default function StatCard({ label, value, emoji }) {
  return (
    <View style={styles.card}>
      <Text style={styles.emoji}>{emoji ?? "🌟"}</Text>
      <Text style={styles.value}>{value != null ? String(value) : "0"}</Text>
      <Text style={styles.label}>{label ?? ""}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors?.card ?? "#FFFFFF",
    borderRadius: 18,
    borderWidth: 2,
    borderColor: colors?.border ?? "#E5E8D8",
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: "center",
    margin: 6,
    minWidth: 96,
    flexGrow: 1,
  },
  emoji: { fontSize: 26 },
  value: { fontSize: 24, fontWeight: "800", color: colors?.text ?? "#2E3440", marginTop: 4 },
  label: { fontSize: 13, color: colors?.mutedText ?? "#7B8794", marginTop: 2, textAlign: "center" },
});
