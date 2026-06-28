// A big emoji-style picture card (used as a prompt or large display).

import React from "react";
import { View, Text, StyleSheet } from "react-native";

import colors from "../theme/colors";

export default function PictureCard({ emoji, caption, big = false }) {
  return (
    <View style={[styles.card, big ? styles.big : null]}>
      <Text style={[styles.emoji, big ? styles.emojiBig : null]}>{emoji ?? "🌾"}</Text>
      {caption ? <Text style={styles.caption}>{caption}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors?.cream ?? "#FFF8EC",
    borderRadius: 24,
    borderWidth: 3,
    borderColor: colors?.border ?? "#E5E8D8",
    paddingVertical: 24,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  big: { paddingVertical: 40 },
  emoji: { fontSize: 90 },
  emojiBig: { fontSize: 130 },
  caption: { fontSize: 16, color: colors?.mutedText ?? "#7B8794", marginTop: 8 },
});
