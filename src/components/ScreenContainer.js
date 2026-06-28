// Safe-area aware screen wrapper with farm background.
// Keeps content clear of notches, cutouts, and rounded corners.

import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import colors from "../theme/colors";

export default function ScreenContainer({ children, scroll = true, contentStyle }) {
  const insets = useSafeAreaInsets();
  const pad = {
    paddingTop: (insets?.top ?? 0) + 12,
    paddingBottom: (insets?.bottom ?? 0) + 16,
    paddingLeft: (insets?.left ?? 0) + 16,
    paddingRight: (insets?.right ?? 0) + 16,
  };

  if (scroll) {
    return (
      <View style={styles.root}>
        <ScrollView
          style={styles.flex}
          contentContainerStyle={[styles.scrollContent, pad, contentStyle]}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <View style={[styles.flex, pad, contentStyle]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors?.background ?? "#F3FFE8",
  },
  flex: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
  },
});
