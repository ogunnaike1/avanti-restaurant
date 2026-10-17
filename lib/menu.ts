export type MenuItem = {
  name: string;
  /** Source SKU, kept for order and data mapping. Never shown publicly. */
  sku?: string;
  /** Further SKUs that map to this same product (duplicate source records). */
  altSkus?: string[];
  /** Selling price in naira, tax exclusive. */
  /** Omitted until the price is confirmed. */
  price?: string;
  /** Short menu blurb. */
  description?: string;
  /** Optional thumbnail; rows without one render without an image. */
  image?: string;
  tag?: string;
  featured?: boolean;
};

export type MenuGroup = {
  id: "soups" | "cocktails" | "juice" | "mocktails" | "milkshakes" | "smoothies" | "water" | "cognac" | "vodka" | "whiskey";
  title: string;
  items: MenuItem[];
};

const item = (
  name: string,
  sku: string | undefined,
  price: number | undefined,
  description?: string,
  extra: Partial<MenuItem> = {},
): MenuItem => ({
  name,
  sku,
  ...(price !== undefined ? { price: `₦${price.toLocaleString("en-NG")}` } : {}),
  ...(description ? { description } : {}),
  ...extra,
});

/*
 * Review flags (source data, unconfirmed):
 *  - Tequila Sunrise (1610) and Long Island (1611) are filed under Fresh Juice in the source
 *    spreadsheet; kept as-is, though both are normally alcoholic cocktails.
 *  - Items without a price or SKU are not yet in the product list; add both when confirmed.
 *  - Strawberry Smoothie exists twice in the source (1637, 1639). One card is shown; 1639 is kept
 *    as an altSku until confirmed.
 */
export const menu: MenuGroup[] = [
  {
    id: "soups",
    title: "Soups & Sauces",
    items: [
      item("Chicken Corn Soup", "1605", 15000, "A warm, comforting bowl of chicken and sweet corn."),
    ],
  },
  {
    id: "cocktails",
    title: "Cocktails",
    items: [
      item("Mojito", "1607", 11000, "Cuban-style classic of white rum, fresh mint and lime, topped with soda."),
      item("Piña Colada", "1608", 12000, "Creamy tropical blend of white rum, pineapple and coconut."),
      item("Sex on the Beach", "1609", 12000, "Fruity and bright: vodka, peach, orange and cranberry."),
      item("Margarita", "1612", 12000, "Tequila, orange liqueur and fresh lime, finished with a salted rim."),
      item("Cosmopolitan", "1613", 12000, "Crisp vodka, cranberry and lime with a citrus lift."),
      item("Daiquiri", "1614", 12000, "Clean and refreshing white rum with fresh lime."),
      item("Deep Blue Sea", "1615", 11000, "Vivid blue vodka cocktail with blue curaçao and pineapple."),
      item("Mai Tai", "1616", 12000, "Rich rum cocktail with lime, orange and almond notes, over crushed ice."),
      item("Tropical Long Island", undefined, undefined, "The Long Island with a fruity twist of pineapple and orange."),
      item("Whiskey Sour", undefined, undefined, "Bourbon balanced with fresh lemon, smooth and tangy."),
      item("Pornstar Martini", undefined, undefined, "Vanilla vodka and passion fruit, with a glass of sparkling wine on the side."),
      item("Negroni", undefined, undefined, "Gin, Campari and sweet vermouth: bittersweet and bold.", { image: "/images/menu-negroni.jpg" }),
      item("Black Russian", undefined, undefined, "Vodka and coffee liqueur over ice, simple and smooth."),
      item("Pinacolada", undefined, undefined, "A lighter take on the tropical classic of rum, pineapple and coconut."),
      item("Tropical Sunrise", undefined, undefined, "Vodka with orange and pineapple, finished with a grenadine glow."),
    ],
  },
  {
    id: "juice",
    title: "Fresh Juice",
    items: [
      item("Tequila Sunrise", "1610", 13000, "Tequila and orange juice with a sunset swirl of grenadine."),
      item("Long Island", "1611", 12000, "Five spirits, lemon and cola in one bold, long drink."),
    ],
  },
  {
    id: "mocktails",
    title: "Mocktails",
    items: [
      item("Virgin Piña Colada", "1617", 10000, "All the pineapple and coconut, completely alcohol-free."),
      item("Virgin Mojito", "1618", 9000, "Fresh mint and lime with soda, cool and alcohol-free."),
      item("Chapman", "1619", 8000, "Nigeria’s favourite: Fanta and Sprite with grenadine, cucumber and citrus."),
      item("Strawberry Lemonade", "1621", 10000, "Sweet strawberries meet tangy lemon in a chilled, refreshing glass."),
      item("Mango Mule", "1622", 10000, "Mango and lime with a ginger beer kick."),
      item("Fruit Chapman", undefined, undefined, "A fresh take on Chapman with orange, pineapple and lemon."),
      item("Lemonade", undefined, undefined, "Freshly squeezed lemon, lightly sweetened and served ice cold."),
      item("Passion Fruit Cooler", undefined, undefined, "Tangy passion fruit and lime with a sparkling finish."),
      item("Watermelon Mint Cooler", undefined, undefined, "Juicy watermelon, cool mint and lime, light and refreshing."),
      item("Mint Storm", undefined, undefined, "A zesty burst of mint and lime with a fizzy finish."),
    ],
  },
  {
    id: "milkshakes",
    title: "Milkshakes",
    items: [
      item("Vanilla Milkshake", "1623", 11000, "Thick, creamy vanilla topped with whipped cream."),
      item("Oreo Milkshake", "1624", 13000, "Vanilla ice cream blended with Oreo cookies and topped with whipped cream."),
      item("Strawberry Milkshake", "1625", 13000, "Strawberry ice cream blended thick and topped with whipped cream."),
      item("Chocolate Milkshake", "1626", 11000, "Rich, indulgent chocolate blended thick and creamy."),
      item("Salted Caramel Milkshake", "1634", 10000, "Creamy vanilla with rich caramel and a hint of salt."),
    ],
  },
  {
    id: "smoothies",
    title: "Smoothies",
    items: [
      item("Banana Smoothie", "1635", 9000, "Ripe banana blended with milk, yoghurt and honey."),
      item("Pineapple Smoothie", "1636", 9000, "Sweet pineapple blended with milk, yoghurt and honey."),
      item("Strawberry Smoothie", "1637", 9000, "Fresh strawberries blended with milk, yoghurt and honey.", { altSkus: ["1639"] }),
      item("Mango Smoothie", "1638", 9000, "Ripe mango blended with milk, yoghurt and honey."),
    ],
  },
  {
    id: "water",
    title: "Water",
    items: [
      item("Bottled Water", "1627", 1500, "Chilled bottled water."),
    ],
  },
  {
    id: "cognac",
    title: "Cognac",
    items: [
      item("Hennessy VSOP", "1628", 190000, "Smooth, rounded cognac, served by the bottle."),
      item("Martell VS", "1629", 100000, "A fruity, accessible cognac, served by the bottle."),
      item("Hennessy XO", "1630", 600000, "Hennessy’s rich, long-aged cognac, served by the bottle."),
    ],
  },
  {
    id: "vodka",
    title: "Vodka",
    items: [
      item("Cîroc Blue", "1631", 85000, "Premium vodka, served by the bottle."),
    ],
  },
  {
    id: "whiskey",
    title: "Whiskey",
    items: [
      item("Johnnie Walker Gold Label", "1632", 130000, "Smooth, honeyed blended Scotch whisky, served by the bottle."),
      item("Jack Daniel’s", "1633", 45000, "Classic Tennessee whiskey, served by the bottle."),
    ],
  },
];

export const signatures = [
  { id: "av-dish-1", image: undefined, kicker: "Cocktail", name: "Mojito", description: "White rum, fresh mint, lime, sugar and soda over crushed ice", price: "₦11,000" },
  { id: "av-dish-2", image: undefined, kicker: "Cocktail", name: "Piña Colada", description: "White rum, pineapple juice and cream of coconut", price: "₦12,000" },
  { id: "av-dish-3", image: undefined, kicker: "Mocktail", name: "Chapman", description: "Fanta, Sprite, grenadine, cucumber and citrus over ice", price: "₦8,000" },
  { id: "av-dish-4", image: undefined, kicker: "Milkshake", name: "Salted Caramel Milkshake", description: "Vanilla ice cream, cold whole milk, caramel and a pinch of salt", price: "₦10,000" },
];
