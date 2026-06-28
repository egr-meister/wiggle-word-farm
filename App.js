// Wiggle Word Farm - app entry.
// Offline farm vocabulary app for children. No internet, no permissions.

import React, { useEffect } from "react";
import { registerRootComponent } from "expo";
import { SafeAreaProvider } from "react-native-safe-area-context";

import AppNavigator from "./src/navigation/AppNavigator";
import {
  enableStickyImmersiveMode,
  disableKeepAwakeSafely,
} from "./src/utils/immersiveHelpers";

function App() {
  useEffect(() => {
    // Fullscreen sticky immersive for a calm, child-friendly experience.
    enableStickyImmersiveMode();
    // Ensure the device is never kept awake outside game screens at startup.
    disableKeepAwakeSafely();
  }, []);

  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
}

registerRootComponent(App);

export default App;
