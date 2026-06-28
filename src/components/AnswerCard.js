// An answer choice card. Can show a word, a picture, or both.
// Soft scale/opacity feedback for correct/incorrect. No flashing.

import React, { useEffect, useRef } from "react";
import { Animated, Text, Pressable, StyleSheet } from "react-native";

import colors from "../theme/colors";
import { getCorrectAnswerAnimationConfig } from "../utils/animationHelpers";

export default function AnswerCard({
  choice,
  mode = "word", // "word" | "picture"
  state = "idle", // "idle" | "correct" | "incorrect" | "disabled"
  onPress,
}) {
  const c = choice || {};
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (state === "correct") {
      const cfg = getCorrectAnswerAnimationConfig();
      Animated.sequence([
        Animated.timing(scale, {
          toValue: cfg.toScale,
          duration: cfg.duration,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: cfg.duration,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [state, scale]);

  const stateStyle =
    state === "correct"
      ? styles.correct
      : state === "incorrect"
      ? styles.incorrect
      : null;

  return (
    <Animated.View style={[styles.wrap, { transform: [{ scale }] }]}>
      <Pressable
        accessibilityRole="button"
        disabled={state === "disabled" || state === "correct" || state === "incorrect"}
        onPress={onPress}
        style={({ pressed }) => [
          styles.card,
          stateStyle,
          pressed ? styles.pressed : null,
        ]}
      >
        {mode === "picture" ? (
          <Text style={styles.emoji}>{c.emoji ?? "🌾"}</Text>
        ) : (
          <Text style={styles.word}>{c.label ?? "Word"}</Text>
        )}
        {state === "correct" ? <Text style={styles.mark}>✅</Text> : null}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, margin: 6, minWidth: "44%" },
  card: {
    backgroundColor: colors?.card ?? "#FFFFFF",
    borderRadius: 20,
    borderWidth: 3,
    borderColor: colors?.border ?? "#E5E8D8",
    minHeight: 110,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    paddingHorizontal: 12,
  },
  correct: { borderColor: colors?.success ?? "#52B788", backgroundColor: "#EAF7EE" },
  incorrect: { borderColor: colors?.danger ?? "#E76F51", backgroundColor: "#FDEDE8" },
  pressed: { opacity: 0.9 },
  emoji: { fontSize: 64 },
  word: { fontSize: 26, fontWeight: "800", color: colors?.text ?? "#2E3440", textAlign: "center" },
  mark: { position: "absolute", top: 8, right: 10, fontSize: 18 },
});
