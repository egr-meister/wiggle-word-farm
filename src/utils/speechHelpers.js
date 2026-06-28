// Safe one-way pronunciation support.
// The app may speak a word; the child only listens.
// No speech recognition, no microphone, no recording, no internet audio,
// no stored voice data. Fails safely if speech is unavailable.

let Speech = null;
try {
  // Loaded only if expo-speech is installed as a direct dependency.
  // eslint-disable-next-line global-require
  Speech = require("expo-speech");
} catch (e) {
  Speech = null;
}

export function isSpeechAvailableSafely() {
  try {
    return !!(Speech && typeof Speech.speak === "function");
  } catch (e) {
    return false;
  }
}

// Speaks the word only when word voice / sound is enabled in settings.
// Returns true if speech was attempted, false otherwise (caller shows visual).
export function speakWordIfEnabled(word, settings) {
  try {
    const soundOn = settings ? settings.soundEnabled !== false : true;
    const voiceOn = settings ? settings.wordVoiceEnabled !== false : true;
    if (!soundOn || !voiceOn) return false;
    if (!word || typeof word !== "string") return false;
    if (!isSpeechAvailableSafely()) return false;

    Speech.stop();
    Speech.speak(word, {
      language: "en-US",
      pitch: 1.0,
      rate: 0.85,
    });
    return true;
  } catch (e) {
    // Never crash on speech failure.
    return false;
  }
}

export function stopSpeechSafely() {
  try {
    if (Speech && typeof Speech.stop === "function") {
      Speech.stop();
    }
  } catch (e) {
    // ignore
  }
}
