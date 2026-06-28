// Static farm vocabulary. Every word has an emoji picture and a short example.
// Local data only. No network, no copyrighted characters, child-safe words.

export const VOCABULARY_ITEMS = [
  // Animals
  { id: "animal_cow", word: "Cow", categoryId: "animals", emoji: "🐮", exampleText: "A cow is on the farm." },
  { id: "animal_pig", word: "Pig", categoryId: "animals", emoji: "🐷", exampleText: "A pig likes the mud." },
  { id: "animal_chicken", word: "Chicken", categoryId: "animals", emoji: "🐔", exampleText: "A chicken says cluck." },
  { id: "animal_horse", word: "Horse", categoryId: "animals", emoji: "🐴", exampleText: "A horse can run fast." },
  { id: "animal_sheep", word: "Sheep", categoryId: "animals", emoji: "🐑", exampleText: "A sheep has soft wool." },
  { id: "animal_duck", word: "Duck", categoryId: "animals", emoji: "🦆", exampleText: "A duck likes the pond." },

  // Food
  { id: "food_apple", word: "Apple", categoryId: "food", emoji: "🍎", exampleText: "An apple is red." },
  { id: "food_corn", word: "Corn", categoryId: "food", emoji: "🌽", exampleText: "Corn grows in the field." },
  { id: "food_carrot", word: "Carrot", categoryId: "food", emoji: "🥕", exampleText: "A carrot is orange." },
  { id: "food_egg", word: "Egg", categoryId: "food", emoji: "🥚", exampleText: "An egg is from a hen." },
  { id: "food_milk", word: "Milk", categoryId: "food", emoji: "🥛", exampleText: "Milk is good to drink." },
  { id: "food_bread", word: "Bread", categoryId: "food", emoji: "🍞", exampleText: "Bread is warm and soft." },

  // Colors
  { id: "color_red", word: "Red", categoryId: "colors", emoji: "🔴", exampleText: "Red is a bright color." },
  { id: "color_blue", word: "Blue", categoryId: "colors", emoji: "🔵", exampleText: "Blue is like the sky." },
  { id: "color_yellow", word: "Yellow", categoryId: "colors", emoji: "🟡", exampleText: "Yellow is like the sun." },
  { id: "color_green", word: "Green", categoryId: "colors", emoji: "🟢", exampleText: "Green is like the grass." },
  { id: "color_orange", word: "Orange", categoryId: "colors", emoji: "🟠", exampleText: "Orange is a warm color." },
  { id: "color_brown", word: "Brown", categoryId: "colors", emoji: "🟤", exampleText: "Brown is like the soil." },

  // Tools
  { id: "tool_shovel", word: "Shovel", categoryId: "tools", emoji: "🪏", exampleText: "A shovel digs the soil." },
  { id: "tool_bucket", word: "Bucket", categoryId: "tools", emoji: "🪣", exampleText: "A bucket holds water." },
  { id: "tool_rake", word: "Rake", categoryId: "tools", emoji: "🧹", exampleText: "A rake tidies the hay." },
  { id: "tool_basket", word: "Basket", categoryId: "tools", emoji: "🧺", exampleText: "A basket holds apples." },
  { id: "tool_watering_can", word: "Watering Can", categoryId: "tools", emoji: "🚿", exampleText: "A watering can helps plants." },
  { id: "tool_hat", word: "Hat", categoryId: "tools", emoji: "👒", exampleText: "A hat keeps off the sun." },
];

const VALID_CATEGORY_IDS = ["animals", "food", "colors", "tools"];

function safeCategoryId(categoryId) {
  return VALID_CATEGORY_IDS.indexOf(categoryId) >= 0 ? categoryId : "animals";
}

// Returns all words for a category. Falls back to animals for invalid input.
export function getWordsByCategory(categoryId) {
  const id = safeCategoryId(categoryId);
  const list = VOCABULARY_ITEMS.filter((w) => w.categoryId === id);
  return list.length > 0 ? list : VOCABULARY_ITEMS.filter((w) => w.categoryId === "animals");
}

// Returns a single vocabulary item, or null if not found.
export function getVocabularyItem(wordId) {
  if (!wordId) return null;
  const found = VOCABULARY_ITEMS.find((w) => w.id === wordId);
  return found || null;
}

// Returns words appropriate for a difficulty.
// Easy: a small set of familiar words from the category.
// Medium: more words from the same category.
// Hard: words from mixed categories.
export function getWordsForDifficulty(categoryId, difficulty) {
  const id = safeCategoryId(categoryId);
  const diff = difficulty || "easy";

  if (diff === "hard") {
    // Mixed categories, still child-friendly.
    return VOCABULARY_ITEMS.slice();
  }

  const inCategory = getWordsByCategory(id);

  if (diff === "easy") {
    // Familiar smaller set (first words of the category).
    const easy = inCategory.slice(0, 4);
    return easy.length > 0 ? easy : inCategory;
  }

  // medium: full category set
  return inCategory;
}
