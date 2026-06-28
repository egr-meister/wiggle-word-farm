// Wiggle the friendly farm worm. Built from pure React Native Views.
// Rounded, smiling, soft green/yellow. Not realistic, not scary.

import React from "react";
import { View, Text, StyleSheet } from "react-native";

import colors from "../theme/colors";

export default function WiggleMascot({ size = 110, mood = "happy" }) {
  const headSize = size;
  const bodySeg = size * 0.62;
  const green = colors?.gardenGreen ?? "#70C1B3";
  const green2 = colors?.primary ?? "#5FA777";

  return (
    <View style={styles.wrap} accessibilityLabel="Wiggle the farm worm">
      {/* Body segments behind the head */}
      <View style={styles.bodyRow}>
        <View
          style={[
            styles.seg,
            {
              width: bodySeg,
              height: bodySeg,
              borderRadius: bodySeg / 2,
              backgroundColor: green2,
              marginRight: -bodySeg * 0.45,
            },
          ]}
        />
        <View
          style={[
            styles.seg,
            {
              width: bodySeg * 1.05,
              height: bodySeg * 1.05,
              borderRadius: bodySeg,
              backgroundColor: green,
              marginRight: -bodySeg * 0.4,
            },
          ]}
        />
        {/* Head */}
        <View
          style={[
            styles.head,
            {
              width: headSize,
              height: headSize,
              borderRadius: headSize / 2,
              backgroundColor: green,
            },
          ]}
        >
          {/* Antennae */}
          <View style={[styles.antenna, { left: headSize * 0.28 }]}>
            <View style={[styles.antBall, { backgroundColor: colors?.hayYellow ?? "#FFD166" }]} />
          </View>
          <View style={[styles.antenna, { right: headSize * 0.28 }]}>
            <View style={[styles.antBall, { backgroundColor: colors?.hayYellow ?? "#FFD166" }]} />
          </View>
          {/* Eyes */}
          <View style={styles.eyesRow}>
            <View style={styles.eye}>
              <View style={styles.pupil} />
            </View>
            <View style={styles.eye}>
              <View style={styles.pupil} />
            </View>
          </View>
          {/* Cheeks + smile */}
          <View style={styles.cheeksRow}>
            <View style={styles.cheek} />
            <View style={styles.cheek} />
          </View>
          <Text style={styles.smile}>{mood === "cheer" ? "◡" : "‿"}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: "center", justifyContent: "center" },
  bodyRow: { flexDirection: "row", alignItems: "center" },
  seg: {},
  head: {
    alignItems: "center",
    justifyContent: "center",
  },
  antenna: {
    position: "absolute",
    top: -10,
    width: 4,
    height: 14,
    backgroundColor: "#5FA777",
    borderRadius: 2,
    alignItems: "center",
  },
  antBall: {
    position: "absolute",
    top: -8,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  eyesRow: { flexDirection: "row", marginTop: 4 },
  eye: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  pupil: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#2E3440",
  },
  cheeksRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
    position: "absolute",
    top: "55%",
  },
  cheek: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FFB4AA",
  },
  smile: {
    fontSize: 22,
    color: "#2E3440",
    marginTop: 0,
    fontWeight: "700",
  },
});
