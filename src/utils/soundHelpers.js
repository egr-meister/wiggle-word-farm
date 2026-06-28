// Lightweight, safe feedback for a correct answer.
// No heavy audio libraries, no external audio files, no microphone.
// If audio cannot play, this returns safely; visual feedback still works.
//
// We reuse the safe one-way speech channel for a tiny spoken cue when sound
// is enabled. If speech is unavailable, nothing happens and the app continues.

import { speakWordIfEnabled, isSpeechAvailableSafely } from "./speechHelpers";

export function playCorrectSoundIfEnabled(settings) {
  try {
    const soundOn = settings ? settings.soundEnabled !== false : true;
    if (!soundOn) return false;
    if (!isSpeechAvailableSafely()) return false;
    // A short, gentle spoken cue. Visual feedback is shown regardless.
    return speakWordIfEnabled("Great word", settings);
  } catch (e) {
    return false;
  }
}
