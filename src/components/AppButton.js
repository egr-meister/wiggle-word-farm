// Large, child-friendly tap-target button.

import React from "react";
import { Text, Pressable, StyleSheet } from "react-native";

import colors from "../theme/colors";

export default function AppButton({
  label,
  onPress,
  variant = "primary",
  emoji,
  disabled = false,
  style,
}) {
  const palette = getPalette(variant);
  return (
    <Pressable
      accessibilityRole="button"
      onPress={disabled ? undefined : onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: palette.bg, borderColor: palette.border },
        pressed && !disabled ? styles.pressed : null,
        disabled ? styles.disabled : null,
        style,
      ]}
    >
      <Text style={[styles.label, { color: palette.text }]}>
        {emoji ? emoji + "  " : ""}
        {label}
      </Text>
    </Pressable>
  );
}

function getPalette(variant) {
  const primary = colors?.primary ?? "#5FA777";
  const card = colors?.card ?? "#FFFFFF";
  const text = colors?.text ?? "#2E3440";
  switch (variant) {
    case "secondary":
      return { bg: colors?.secondary ?? "#6C63FF", border: colors?.secondary ?? "#6C63FF", text: "#FFFFFF" };
    case "accent":
      return { bg: colors?.accent ?? "#FFD166", border: colors?.accent ?? "#FFD166", text };
    case "danger":
      return { bg: colors?.danger ?? "#E76F51", border: colors?.danger ?? "#E76F51", text: "#FFFFFF" };
    case "ghost":
      return { bg: card, border: colors?.border ?? "#E5E8D8", text };
    case "primary":
    default:
      return { bg: primary, border: primary, text: "#FFFFFF" };
  }
}

const styles = StyleSheet.create({
  button: {
    minHeight: 60,
    borderRadius: 18,
    borderWidth: 2,
    paddingVertical: 16,
    paddingHorizontal: 22,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 7,
  },
  pressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  disabled: { opacity: 0.5 },
  label: { fontSize: 20, fontWeight: "700", textAlign: "center" },
});
