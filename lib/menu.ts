export type MenuItem = {
  name: string;
  /** Source SKU, kept for order and data mapping. Never shown publicly. */
  sku?: string;
  /** Further SKUs that map to this same product (duplicate source records). */
  altSkus?: string[];
  /** Selling price in naira, tax exclusive. */
  /** Omitted until the price is confirmed. */
  price?: string;
  /** Only where supplied by the bar; otherwise omitted. */
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
  ingredients: string[] = [],
  extra: Partial<MenuItem> = {},
): MenuItem => ({
  name,
  sku,
  ...(price !== undefined ? { price: `₦${price.toLocaleString("en-NG")}` } : {}),
  ...(ingredients.length ? { description: ingredients.join(", ") } : {}),
  ...extra,
});

/*
 * Review flags (source data, unconfirmed):
 *  - Biryani Rice (1606) at ₦100,000 is unusually high for the category.
 *  - Tequila Sunrise (1610) and Long Island (1611) are filed under Fresh Juice in the source
 *    spreadsheet; kept as-is, though both are normally alcoholic cocktails.
 *  - Items without a price or SKU are on the bar menu but not yet in the product list; add both when confirmed.
 *  - Strawberry Smoothie exists twice in the source (1637, 1639). One card is shown; 1639 is kept
 *    as an altSku until confirmed.
 */
export const menu: MenuGroup[] = [
  {
    id: "soups",
    title: "Soups & Sauces",
    items: [
      item("Chicken Corn Soup", "1605", 15000),
      item("Biryani Rice", "1606", 100000),
    ],
  },
  {
    id: "cocktails",
    title: "Cocktails",
    items: [
      item("Mojito", "1607", 11000, ["50 ml white rum", "8–10 fresh mint leaves", "½ lime, cut into wedges", "2 tsp sugar (or 15 ml sugar syrup)", "100–120 ml soda water", "Ice cubes or crushed ice", "Mint sprig and lime slice for garnish"]),
      item("Piña Colada", "1608", 12000, ["60 ml white rum", "90 ml pineapple juice", "60 ml cream of coconut", "1 cup ice cubes", "Pineapple wedge and cherry for garnish (optional)"]),
      item("Sex on the Beach", "1609", 12000, ["40 ml vodka", "20 ml peach schnapps", "40 ml orange juice", "40 ml cranberry juice", "Ice cubes", "Orange slice or cherry for garnish"]),
      item("Margarita", "1612", 12000, ["50 ml tequila blanco", "25 ml triple sec or Cointreau", "25 ml freshly squeezed lime juice", "5–10 ml simple syrup (optional)", "Ice cubes", "Salt for the rim", "Lime wedge for garnish"]),
      item("Cosmopolitan", "1613", 12000, ["45 ml vodka (citrus vodka is ideal)", "15 ml triple sec or Cointreau", "30 ml cranberry juice", "15 ml fresh lime juice", "Ice cubes", "Orange peel or lime wheel for garnish"]),
      item("Daiquiri", "1614", 12000, ["60 ml white rum", "25 ml fresh lime juice", "15 ml simple syrup", "Ice cubes", "Lime wheel for garnish (optional)"]),
      item("Deep Blue Sea", "1615", 11000, ["45 ml vodka", "20 ml blue curaçao", "60 ml pineapple juice", "15 ml fresh lime juice", "10 ml simple syrup (optional)", "Ice cubes", "Lemon or pineapple wedge for garnish"]),
      item("Mai Tai", "1616", 12000, ["30 ml aged Jamaican rum", "30 ml white rum", "15 ml orange curaçao or triple sec", "15 ml orgeat syrup (almond syrup)", "30 ml fresh lime juice", "7.5 ml simple syrup (optional, to taste)", "Crushed ice", "Fresh mint sprig and lime shell for garnish"]),
      item("Tropical Long Island", undefined, undefined, ["15 ml vodka", "15 ml white rum", "15 ml gin", "15 ml tequila blanco", "15 ml triple sec", "60 ml pineapple juice", "30 ml orange juice", "15 ml fresh lemon juice", "10 ml simple syrup (optional)", "30 ml lemon-lime soda", "Ice cubes", "Pineapple wedge or orange slice for garnish"]),
      item("Whiskey Sour", undefined, undefined, ["60 ml bourbon whiskey", "25 ml fresh lemon juice", "20 ml simple syrup", "Ice cubes", "Lemon slice and cocktail cherry for garnish", "Optional foamy top: 15–20 ml pasteurized egg white, 2–3 drops Angostura bitters"]),
      item("Pornstar Martini", undefined, undefined, ["40 ml vanilla vodka", "20 ml passion fruit liqueur", "40 ml passion fruit purée", "15 ml fresh lime juice", "10–15 ml vanilla sugar syrup", "Ice cubes", "½ fresh passion fruit for garnish", "50–60 ml chilled sparkling wine, served separately (optional)"]),
      item("Negroni", undefined, undefined, ["30 ml gin", "30 ml Campari", "30 ml sweet red vermouth", "Ice cubes", "Orange slice or orange peel for garnish"], { image: "/images/menu-negroni.jpg" }),
      item("Black Russian", undefined, undefined, ["50 ml vodka", "25 ml coffee liqueur (such as Kahlúa)", "Ice cubes", "Coffee beans for garnish (optional)"]),
      item("Pinacolada", undefined, undefined, ["50 ml white rum", "90 ml pineapple juice", "30 ml cream of coconut", "1 cup ice cubes", "Pineapple wedge for garnish", "1 cocktail cherry (optional)"]),
      item("Tropical Sunrise", undefined, undefined, ["45 ml vodka", "60 ml orange juice", "60 ml pineapple juice", "15 ml grenadine", "Ice cubes", "Orange slice and cherry for garnish"]),
    ],
  },
  {
    id: "juice",
    title: "Fresh Juice",
    items: [
      item("Tequila Sunrise", "1610", 13000, ["45 ml tequila blanco", "120 ml orange juice", "15 ml grenadine syrup", "Ice cubes", "Orange slice and maraschino cherry for garnish"]),
      item("Long Island", "1611", 12000, ["15 ml vodka", "15 ml white rum", "15 ml gin", "15 ml tequila blanco", "15 ml triple sec", "25 ml fresh lemon juice", "20 ml simple syrup", "30–60 ml cola, to top", "Ice cubes", "Lemon wedge for garnish"]),
    ],
  },
  {
    id: "mocktails",
    title: "Mocktails",
    items: [
      item("Virgin Piña Colada", "1617", 10000, ["120 ml pineapple juice", "60 ml coconut cream", "30 ml coconut milk (optional, for a lighter texture)", "1 cup ice cubes", "15 ml sugar syrup (optional)", "Pineapple wedge and cherry for garnish"]),
      item("Virgin Mojito", "1618", 9000, ["8–10 fresh mint leaves", "½ fresh lime, cut into wedges", "20 ml sugar syrup", "120–150 ml soda water", "Crushed ice", "Mint sprig and lime slice for garnish"]),
      item("Chapman", "1619", 8000, ["100 ml Fanta Orange", "100 ml Sprite", "30 ml grenadine syrup", "15 ml fresh lemon or lime juice", "2–3 dashes Angostura bitters (optional)", "Ice cubes", "2 cucumber slices", "1 orange slice", "1 lemon or lime slice"]),
      item("Strawberry Lemonade", "1621", 10000, ["150 g fresh strawberries", "60 ml fresh lemon juice", "400 ml cold water", "40–60 ml sugar syrup, to taste", "Ice cubes", "Lemon slices and strawberries for garnish", "Fresh mint leaves (optional)"]),
      item("Mango Mule", "1622", 10000, ["45 ml vodka", "60 ml mango purée or mango nectar", "15 ml fresh lime juice", "100–120 ml ginger beer", "Ice cubes", "Mango slice and lime wedge for garnish", "Fresh mint (optional)"]),
      item("Fruit Chapman", undefined, undefined, ["60 ml orange juice", "60 ml pineapple juice", "30 ml lemon juice", "10–15 ml grenadine syrup (optional)", "60 ml soda water or ginger ale", "Ice cubes", "Orange slice and cherry for garnish"]),
      item("Lemonade", undefined, undefined, ["60 ml fresh lemon juice (about 2–3 lemons)", "500 ml cold water", "40–60 ml sugar syrup, to taste", "Ice cubes", "Lemon slices for garnish", "Fresh mint leaves (optional)"]),
      item("Passion Fruit Cooler", undefined, undefined, ["60 ml passion fruit pulp or juice", "20 ml fresh lime juice", "20 ml sugar syrup", "100 ml soda water or sparkling water", "Ice cubes", "Fresh mint leaves", "Lime wheel and passion fruit half for garnish"]),
      item("Watermelon Mint Cooler", undefined, undefined, ["200 g fresh watermelon, deseeded", "8–10 fresh mint leaves", "15 ml fresh lime juice", "10–15 ml sugar syrup (optional)", "60–100 ml soda water", "Ice cubes", "Watermelon wedge and mint sprig for garnish"]),
      item("Mint Storm", undefined, undefined, ["8–10 fresh mint leaves", "25 ml fresh lime juice", "20 ml sugar syrup (adjust to taste)", "150 ml Sprite, 7UP, or soda water", "Crushed ice", "Lime slices and mint sprigs for garnish"]),
    ],
  },
  {
    id: "milkshakes",
    title: "Milkshakes",
    items: [
      item("Vanilla Milkshake", "1623", 11000, ["3 scoops vanilla ice cream", "150 ml cold milk", "40 ml sugar syrup", "150 ml whipped cream", "Blended with ice"]),
      item("Oreo Milkshake", "1624", 13000, ["4 Oreo cookies", "3 scoops vanilla ice cream", "150 ml cold milk", "40 ml sugar syrup", "150 ml whipped cream", "Blended with ice"]),
      item("Strawberry Milkshake", "1625", 13000, ["3 scoops strawberry ice cream", "150 ml cold milk", "40 ml sugar syrup", "150 ml whipped cream", "Blended with ice"]),
      item("Chocolate Milkshake", "1626", 11000, ["3 scoops chocolate or vanilla ice cream", "150 ml cold milk", "40 ml sugar syrup", "150 ml whipped cream", "Blended with ice"]),
      item("Salted Caramel Milkshake", "1634", 10000, ["3 scoops vanilla ice cream", "150 ml cold whole milk", "3 tbsp caramel", "A small pinch of salt", "Extra caramel for garnish"]),
    ],
  },
  {
    id: "smoothies",
    title: "Smoothies",
    items: [
      item("Banana Smoothie", "1635", 9000, ["3 ripe bananas", "200 ml cold milk", "100 ml yoghurt", "1 tbsp honey", "Blended with ice"]),
      item("Pineapple Smoothie", "1636", 9000, ["200 g fresh ripe pineapple", "200 ml cold milk", "100 ml yoghurt", "1 tbsp honey", "Blended with ice"]),
      item("Strawberry Smoothie", "1637", 9000, ["200 g strawberries", "200 ml cold milk", "100 ml yoghurt", "1 tbsp honey", "Blended with ice"], { altSkus: ["1639"] }),
      item("Mango Smoothie", "1638", 9000, ["1 large ripe mango", "200 ml cold milk", "100 ml yoghurt", "1 tbsp honey", "Blended with ice"]),
    ],
  },
  {
    id: "water",
    title: "Water",
    items: [
      item("Bottled Water", "1627", 1500),
    ],
  },
  {
    id: "cognac",
    title: "Cognac",
    items: [
      item("Hennessy VSOP", "1628", 190000),
      item("Martell VS", "1629", 100000),
      item("Hennessy XO", "1630", 600000),
    ],
  },
  {
    id: "vodka",
    title: "Vodka",
    items: [
      item("Cîroc Blue", "1631", 85000),
    ],
  },
  {
    id: "whiskey",
    title: "Whiskey",
    items: [
      item("Johnnie Walker Gold Label", "1632", 130000),
      item("Jack Daniel’s", "1633", 45000),
    ],
  },
];

export const signatures = [
  { id: "av-dish-1", image: undefined, kicker: "Cocktail", name: "Mojito", description: "White rum, fresh mint, lime, sugar and soda over crushed ice", price: "₦11,000" },
  { id: "av-dish-2", image: undefined, kicker: "Cocktail", name: "Piña Colada", description: "White rum, pineapple juice and cream of coconut", price: "₦12,000" },
  { id: "av-dish-3", image: undefined, kicker: "Mocktail", name: "Chapman", description: "Fanta, Sprite, grenadine, cucumber and citrus over ice", price: "₦8,000" },
  { id: "av-dish-4", image: undefined, kicker: "Milkshake", name: "Salted Caramel Milkshake", description: "Vanilla ice cream, cold whole milk, caramel and a pinch of salt", price: "₦10,000" },
];
