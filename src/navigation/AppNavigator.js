// Simple stack navigation for Wiggle Word Farm.
// The navigation theme extends DefaultTheme (never built from scratch).

import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import colors from "../theme/colors";

import WiggleHomeScreen from "../screens/WiggleHomeScreen";
import FarmCategoryScreen from "../screens/FarmCategoryScreen";
import WordCardsScreen from "../screens/WordCardsScreen";
import GamePickerScreen from "../screens/GamePickerScreen";
import WordGameScreen from "../screens/WordGameScreen";
import VocabularyProgressScreen from "../screens/VocabularyProgressScreen";
import ParentSettingsScreen from "../screens/ParentSettingsScreen";

const Stack = createNativeStackNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors?.background ?? "#F3FFE8",
    card: colors?.card ?? "#FFFFFF",
    primary: colors?.primary ?? "#5FA777",
    text: colors?.text ?? "#2E3440",
    border: colors?.border ?? "#E5E8D8",
  },
};

const screenOptions = {
  headerStyle: { backgroundColor: colors?.primary ?? "#5FA777" },
  headerTintColor: "#FFFFFF",
  headerTitleStyle: { fontWeight: "800" },
  headerShadowVisible: false,
  contentStyle: { backgroundColor: colors?.background ?? "#F3FFE8" },
};

export default function AppNavigator() {
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator initialRouteName="WiggleHome" screenOptions={screenOptions}>
        <Stack.Screen
          name="WiggleHome"
          component={WiggleHomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FarmCategory"
          component={FarmCategoryScreen}
          options={{ title: "Choose a Farm Area" }}
        />
        <Stack.Screen
          name="WordCards"
          component={WordCardsScreen}
          options={{ title: "Word Cards" }}
        />
        <Stack.Screen
          name="GamePicker"
          component={GamePickerScreen}
          options={{ title: "Choose a Game" }}
        />
        <Stack.Screen
          name="WordGame"
          component={WordGameScreen}
          options={{ title: "Farm Word Game" }}
        />
        <Stack.Screen
          name="VocabularyProgress"
          component={VocabularyProgressScreen}
          options={{ title: "My Progress" }}
        />
        <Stack.Screen
          name="ParentSettings"
          component={ParentSettingsScreen}
          options={{ title: "Parent Settings" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
