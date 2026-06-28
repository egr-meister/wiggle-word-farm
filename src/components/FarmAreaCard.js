// A farm-sign style card for a vocabulary category / farm area.

import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

import colors from "../theme/colors";

export default function FarmAreaCard({ category, selected, progressCount = 0, onPress }) {
  const c = category || {};
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
      <View style={styles.signPost} />
      <View style={styles.row}>
        <Text style={styles.emoji}>{c.emoji ?? "🌾"}</Text>
        <View style={styles.textCol}>
          <Text style={styles.label}>{c.label ?? "Farm Area"}</Text>
          <Text style={styles.area}>{c.farmArea ?? ""}</Text>
          <Text style={styles.desc}>{c.description ?? ""}</Text>
          <Text style={styles.progress}>Words learned: {progressCount}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors?.cream ?? "#FFF8EC",
    borderRadius: 20,
    borderWidth: 3,
    borderColor: colors?.border ?? "#E5E8D8",
    padding: 16,
    marginVertical: 8,
  },
  selected: {
    borderColor: colors?.primary ?? "#5FA777",
    backgroundColor: "#FBFFF3",
  },
  pressed: { opacity: 0.9 },
  signPost: {
    position: "absolute",
    bottom: -8,
    left: "48%",
    width: 8,
    height: 16,
    backgroundColor: colors?.fenceBrown ?? "#B08968",
    borderRadius: 3,
  },
  row: { flexDirection: "row", alignItems: "center" },
  emoji: { fontSize: 46, marginRight: 14 },
  textCol: { flex: 1 },
  label: { fontSize: 20, fontWeight: "800", color: colors?.text ?? "#2E3440" },
  area: { fontSize: 15, fontWeight: "700", color: colors?.primary ?? "#5FA777", marginTop: 1 },
  desc: { fontSize: 14, color: colors?.mutedText ?? "#7B8794", marginTop: 4 },
  progress: { fontSize: 13, color: colors?.text ?? "#2E3440", marginTop: 6, fontWeight: "600" },
});
