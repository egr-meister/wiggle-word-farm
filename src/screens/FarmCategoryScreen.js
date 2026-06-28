// Choose a vocabulary category / farm area.

import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import colors from "../theme/colors";
import ScreenContainer from "../components/ScreenContainer";
import FarmAreaCard from "../components/FarmAreaCard";
import AppButton from "../components/AppButton";
import { CATEGORY_ITEMS } from "../data/categoryItems";
import { getWordsByCategory } from "../data/vocabularyItems";
import { loadAppData } from "../storage/appStorage";
import { getLearnedWordIds } from "../utils/progressHelpers";

export default function FarmCategoryScreen({ navigation, route }) {
  const next = route?.params?.next ?? "WordCards";
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState("");
  const [learnedIds, setLearnedIds] = useState([]);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      loadAppData().then((d) => {
        if (active) setLearnedIds(getLearnedWordIds(d?.progress));
      });
      return () => {
        active = false;
      };
    }, [])
  );

  const learnedInCategory = (categoryId) => {
    const words = getWordsByCategory(categoryId);
    return words.filter((w) => learnedIds.indexOf(w.id) >= 0).length;
  };

  const onContinue = () => {
    if (!selected) {
      setError("Please choose a farm area.");
      return;
    }
    setError("");
    navigation.navigate(next, { categoryId: selected });
  };

  return (
    <ScreenContainer>
      <Text style={styles.lead}>Pick a farm area to visit and learn its words.</Text>

      {CATEGORY_ITEMS.map((cat) => (
        <FarmAreaCard
          key={cat.id}
          category={cat}
          selected={selected === cat.id}
          progressCount={learnedInCategory(cat.id)}
          onPress={() => {
            setSelected(cat.id);
            setError("");
          }}
        />
      ))}

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={styles.buttons}>
        <AppButton label="Continue" emoji="➡️" variant="primary" onPress={onContinue} />
        <AppButton
          label="Back Home"
          emoji="🏠"
          variant="ghost"
          onPress={() => navigation.navigate("WiggleHome")}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  lead: { fontSize: 16, color: colors?.text ?? "#2E3440", marginBottom: 10, textAlign: "center" },
  error: { fontSize: 15, color: colors?.danger ?? "#E76F51", textAlign: "center", marginTop: 8, fontWeight: "700" },
  buttons: { marginTop: 14 },
});
