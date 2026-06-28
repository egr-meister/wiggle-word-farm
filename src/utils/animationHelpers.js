// Simple, gentle React Native Animated configs only.
// No heavy animation libraries, no flashing, no stressful motion.

export function getCorrectAnswerAnimationConfig() {
  // A soft scale pop used for a correct answer card.
  return {
    fromScale: 1,
    toScale: 1.06,
    duration: 220,
    useNativeDriver: true,
  };
}

export function getCardPressAnimationConfig() {
  // A small, calm press feedback.
  return {
    fromScale: 1,
    toScale: 0.97,
    duration: 110,
    useNativeDriver: true,
  };
}
