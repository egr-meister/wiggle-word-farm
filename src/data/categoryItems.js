// Static farm vocabulary categories. Local data only, no network.

export const CATEGORY_ITEMS = [
  {
    id: "animals",
    label: "Animals",
    farmArea: "Animal Barn",
    emoji: "🐮",
    description: "Learn animal words from the barn.",
  },
  {
    id: "food",
    label: "Food",
    farmArea: "Food Garden",
    emoji: "🍎",
    description: "Learn simple food words from the garden.",
  },
  {
    id: "colors",
    label: "Colors",
    farmArea: "Color Fence",
    emoji: "🌈",
    description: "Learn bright color words.",
  },
  {
    id: "tools",
    label: "Tools",
    farmArea: "Tool Shed",
    emoji: "🧺",
    description: "Learn simple farm tool words.",
  },
];

// Always returns a valid category. Falls back to the first one (animals).
export function getCategoryItem(categoryId) {
  const found = CATEGORY_ITEMS.find((c) => c.id === categoryId);
  return found || CATEGORY_ITEMS[0];
}
