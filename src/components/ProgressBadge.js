// A farm-sticker style achievement badge. Local marker only, no money value.

import React from "react";
import { View, Text, StyleSheet } from "react-native";

import colors from "../theme/colors";

export default function ProgressBadge({ achievement, unlocked = false }) {
  const a = achievement || {};
  return (
    <View style={[styles.badge, unlocked ? styles.unlocked : styles.locked]}>
      <Text style={[styles.emoji, unlocked ? null : styles.dim]}>{a.emoji ?? "🏅"}</Text>
      <Text style={[styles.label, unlocked ? null : styles.dimText]}>{a.label ?? "Badge"}</Text>
      <Text style={styles.desc}>{a.description ?? ""}</Text>
      <Text style={[styles.status, unlocked ? styles.statusOn : styles.statusOff]}>
        {unlocked ? "Unlocked" : "Keep learning"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: colors?.cream ?? "#FFF8EC",
    borderRadius: 20,
    borderWidth: 3,
    padding: 14,
    alignItems: "center",
    margin: 6,
    width: "46%",
  },
  unlocked: { borderColor: colors?.hayYellow ?? "#FFD166" },
  locked: { borderColor: colors?.border ?? "#E5E8D8", opacity: 0.85 },
  emoji: { fontSize: 40 },
  dim: { opacity: 0.4 },
  label: { fontSize: 14, fontWeight: "800", color: colors?.text ?? "#2E3440", textAlign: "center", marginTop: 6 },
  dimText: { color: colors?.mutedText ?? "#7B8794" },
  desc: { fontSize: 12, color: colors?.mutedText ?? "#7B8794", textAlign: "center", marginTop: 4 },
  status: { fontSize: 12, fontWeight: "700", marginTop: 8 },
  statusOn: { color: colors?.success ?? "#52B788" },
  statusOff: { color: colors?.mutedText ?? "#7B8794" },
});
