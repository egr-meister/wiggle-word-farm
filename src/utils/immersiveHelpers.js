// Fullscreen sticky immersive + keep-awake helpers.
// All wrapped in try/catch so unavailable APIs never crash the app.
// Keep awake is used only on active game screens.

let SystemBars = null;
try {
  // react-native-edge-to-edge provides SystemBars for edge-to-edge control.
  // eslint-disable-next-line global-require
  const edge = require("react-native-edge-to-edge");
  SystemBars = edge.SystemBars || null;
} catch (e) {
  SystemBars = null;
}

let KeepAwake = null;
try {
  // eslint-disable-next-line global-require
  KeepAwake = require("expo-keep-awake");
} catch (e) {
  KeepAwake = null;
}

const KEEP_AWAKE_TAG = "wiggle-word-game";

// Hide status + navigation bars for a fullscreen sticky immersive feel.
// System bars may reappear temporarily after an edge swipe (Android default).
export function enableStickyImmersiveMode() {
  try {
    if (SystemBars && typeof SystemBars.setHidden === "function") {
      SystemBars.setHidden(true);
    } else if (SystemBars && typeof SystemBars.pushStackEntry === "function") {
      SystemBars.pushStackEntry({ hidden: true });
    }
  } catch (e) {
    // ignore - safe fallback
  }
}

export function activateGameKeepAwake() {
  try {
    if (KeepAwake && typeof KeepAwake.activateKeepAwakeAsync === "function") {
      KeepAwake.activateKeepAwakeAsync(KEEP_AWAKE_TAG);
    } else if (KeepAwake && typeof KeepAwake.activateKeepAwake === "function") {
      KeepAwake.activateKeepAwake(KEEP_AWAKE_TAG);
    }
  } catch (e) {
    // ignore
  }
}

export function deactivateGameKeepAwake() {
  try {
    if (KeepAwake && typeof KeepAwake.deactivateKeepAwake === "function") {
      KeepAwake.deactivateKeepAwake(KEEP_AWAKE_TAG);
    }
  } catch (e) {
    // ignore
  }
}

// Alias kept for clarity; ensures the device is not kept awake outside games.
export function disableKeepAwakeSafely() {
  deactivateGameKeepAwake();
}
