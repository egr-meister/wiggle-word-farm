// A small selectable difficulty chip.

import React from "react";
import { Text, Pressable, StyleSheet } from "react-native";

import colors from "../theme/colors";

export default function DifficultyChip({ difficulty, selected, onPress }) {
  const d = difficulty || {};
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        selected ? styles.selected : null,
        pressed ? styles.pressed : null,
      ]}
    >
      <Text style={[styles.label, selected ? styles.labelSelected : null]}>
        {(d.emoji ? d.emoji + " " : "") + (d.label ?? "Easy")}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    minHeight: 52,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: colors?.border ?? "#E5E8D8",
    backgroundColor: colors?.card ?? "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    marginVertical: 6,
  },
  selected: {
    borderColor: colors?.primary ?? "#5FA777",
    backgroundColor: "#EAF7EE",
  },
  pressed: { opacity: 0.9 },
  label: { fontSize: 16, fontWeight: "700", color: colors?.text ?? "#2E3440" },
  labelSelected: { color: colors?.primary ?? "#5FA777" },
});
