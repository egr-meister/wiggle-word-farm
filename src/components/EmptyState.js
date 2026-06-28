// A friendly empty state with Wiggle.

import React from "react";
import { View, Text, StyleSheet } from "react-native";

import colors from "../theme/colors";
import WiggleMascot from "./WiggleMascot";

export default function EmptyState({ title, message, emoji }) {
  return (
    <View style={styles.wrap}>
      <WiggleMascot size={90} />
      {emoji ? <Text style={styles.emoji}>{emoji}</Text> : null}
      <Text style={styles.title}>{title ?? "Nothing here yet"}</Text>
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: "center", justifyContent: "center", paddingVertical: 30 },
  emoji: { fontSize: 34, marginTop: 10 },
  title: { fontSize: 20, fontWeight: "800", color: colors?.text ?? "#2E3440", marginTop: 14, textAlign: "center" },
  message: { fontSize: 15, color: colors?.mutedText ?? "#7B8794", marginTop: 8, textAlign: "center" },
});
