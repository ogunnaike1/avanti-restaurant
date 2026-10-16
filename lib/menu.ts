export type MenuItem = {
  name: string;
  /** Ingredients, comma-separated. */
  description: string;
  /** Optional thumbnail; rows without one render without an image. */
  image?: string;
  price?: string;
  tag?: string;
  featured?: boolean;
};

export type MenuGroup = {
  id: "cocktails" | "mocktails" | "milkshakes" | "smoothies";
  title: string;
  items: MenuItem[];
};

const item = (name: string, ingredients: string[], extra: Partial<MenuItem> = {}): MenuItem => ({
  name,
  description: ingredients.join(", "),
  ...extra,
});

export const menu: MenuGroup[] = [
  {
    id: "cocktails",
    title: "Cocktails",
    items: [
      item("Mojito", ["50 ml white rum", "8–10 fresh mint leaves", "½ lime, cut into wedges", "2 tsp sugar (or 15 ml sugar syrup)", "100–120 ml soda water", "Ice cubes or crushed ice", "Mint sprig and lime slice for garnish"]),
      item("Piña Colada", ["60 ml white rum", "90 ml pineapple juice", "60 ml cream of coconut", "1 cup ice cubes", "Pineapple wedge and cherry for garnish (optional)"]),
      item("Sex on the Beach", ["40 ml vodka", "20 ml peach schnapps", "40 ml orange juice", "40 ml cranberry juice", "Ice cubes", "Orange slice or cherry for garnish"]),
      item("Tequila Sunrise", ["45 ml tequila blanco", "120 ml orange juice", "15 ml grenadine syrup", "Ice cubes", "Orange slice and maraschino cherry for garnish"]),
      item("Long Island", ["15 ml vodka", "15 ml white rum", "15 ml gin", "15 ml tequila blanco", "15 ml triple sec", "25 ml fresh lemon juice", "20 ml simple syrup", "30–60 ml cola, to top", "Ice cubes", "Lemon wedge for garnish"]),
      item("Margarita", ["50 ml tequila blanco", "25 ml triple sec or Cointreau", "25 ml freshly squeezed lime juice", "5–10 ml simple syrup (optional)", "Ice cubes", "Salt for the rim", "Lime wedge for garnish"]),
      item("Cosmopolitan", ["45 ml vodka (citrus vodka is ideal)", "15 ml triple sec or Cointreau", "30 ml cranberry juice", "15 ml fresh lime juice", "Ice cubes", "Orange peel or lime wheel for garnish"]),
      item("Daiquiri", ["60 ml white rum", "25 ml fresh lime juice", "15 ml simple syrup", "Ice cubes", "Lime wheel for garnish (optional)"]),
      item("Tropical Long Island", ["15 ml vodka", "15 ml white rum", "15 ml gin", "15 ml tequila blanco", "15 ml triple sec", "60 ml pineapple juice", "30 ml orange juice", "15 ml fresh lemon juice", "10 ml simple syrup (optional)", "30 ml lemon-lime soda", "Ice cubes", "Pineapple wedge or orange slice for garnish"]),
      item("Deep Blue Sea", ["45 ml vodka", "20 ml blue curaçao", "60 ml pineapple juice", "15 ml fresh lime juice", "10 ml simple syrup (optional)", "Ice cubes", "Lemon or pineapple wedge for garnish"]),
      item("Mai Tai", ["30 ml aged Jamaican rum", "30 ml white rum", "15 ml orange curaçao or triple sec", "15 ml orgeat syrup (almond syrup)", "30 ml fresh lime juice", "7.5 ml simple syrup (optional, to taste)", "Crushed ice", "Fresh mint sprig and lime shell for garnish"]),
      item("Whiskey Sour", ["60 ml bourbon whiskey", "25 ml fresh lemon juice", "20 ml simple syrup", "Ice cubes", "Lemon slice and cocktail cherry for garnish", "Optional foamy top: 15–20 ml pasteurized egg white, 2–3 drops Angostura bitters"]),
      item("Pornstar Martini", ["40 ml vanilla vodka", "20 ml passion fruit liqueur", "40 ml passion fruit purée", "15 ml fresh lime juice", "10–15 ml vanilla sugar syrup", "Ice cubes", "½ fresh passion fruit for garnish", "50–60 ml chilled sparkling wine, served separately (optional)"]),
      item("Negroni", ["30 ml gin", "30 ml Campari", "30 ml sweet red vermouth", "Ice cubes", "Orange slice or orange peel for garnish"], { image: "/images/menu-negroni.jpg" }),
      item("Black Russian", ["50 ml vodka", "25 ml coffee liqueur (such as Kahlúa)", "Ice cubes", "Coffee beans for garnish (optional)"]),
      item("Pinacolada", ["50 ml white rum", "90 ml pineapple juice", "30 ml cream of coconut", "1 cup ice cubes", "Pineapple wedge for garnish", "1 cocktail cherry (optional)"]),
      item("Tropical Sunrise", ["45 ml vodka", "60 ml orange juice", "60 ml pineapple juice", "15 ml grenadine", "Ice cubes", "Orange slice and cherry for garnish"]),
    ],
  },
  {
    id: "mocktails",
    title: "Mocktails",
    items: [
      item("Virgin Piña Colada", ["120 ml pineapple juice", "60 ml coconut cream", "30 ml coconut milk (optional, for a lighter texture)", "1 cup ice cubes", "15 ml sugar syrup (optional)", "Pineapple wedge and cherry for garnish"]),
      item("Virgin Mojito", ["8–10 fresh mint leaves", "½ fresh lime, cut into wedges", "20 ml sugar syrup", "120–150 ml soda water", "Crushed ice", "Mint sprig and lime slice for garnish"]),
      item("Chapman", ["100 ml Fanta Orange", "100 ml Sprite", "30 ml grenadine syrup", "15 ml fresh lemon or lime juice", "2–3 dashes Angostura bitters (optional)", "Ice cubes", "2 cucumber slices", "1 orange slice", "1 lemon or lime slice"]),
      item("Fruit Chapman", ["60 ml orange juice", "60 ml pineapple juice", "30 ml lemon juice", "10–15 ml grenadine syrup (optional)", "60 ml soda water or ginger ale", "Ice cubes", "Orange slice and cherry for garnish"]),
      item("Lemonade", ["60 ml fresh lemon juice (about 2–3 lemons)", "500 ml cold water", "40–60 ml sugar syrup, to taste", "Ice cubes", "Lemon slices for garnish", "Fresh mint leaves (optional)"]),
      item("Strawberry Lemonade", ["150 g fresh strawberries", "60 ml fresh lemon juice", "400 ml cold water", "40–60 ml sugar syrup, to taste", "Ice cubes", "Lemon slices and strawberries for garnish", "Fresh mint leaves (optional)"]),
      item("Mango Mule", ["45 ml vodka", "60 ml mango purée or mango nectar", "15 ml fresh lime juice", "100–120 ml ginger beer", "Ice cubes", "Mango slice and lime wedge for garnish", "Fresh mint (optional)"]),
      item("Passion Fruit Cooler", ["60 ml passion fruit pulp or juice", "20 ml fresh lime juice", "20 ml sugar syrup", "100 ml soda water or sparkling water", "Ice cubes", "Fresh mint leaves", "Lime wheel and passion fruit half for garnish"]),
      item("Watermelon Mint Cooler", ["200 g fresh watermelon, deseeded", "8–10 fresh mint leaves", "15 ml fresh lime juice", "10–15 ml sugar syrup (optional)", "60–100 ml soda water", "Ice cubes", "Watermelon wedge and mint sprig for garnish"]),
      item("Mint Storm", ["8–10 fresh mint leaves", "25 ml fresh lime juice", "20 ml sugar syrup (adjust to taste)", "150 ml Sprite, 7UP, or soda water", "Crushed ice", "Lime slices and mint sprigs for garnish"]),
    ],
  },
  {
    id: "milkshakes",
    title: "Milkshakes",
    items: [
      item("Vanilla Milkshake", ["3 scoops vanilla ice cream", "150 ml cold milk", "40 ml sugar syrup", "150 ml whipped cream", "Blended with ice"]),
      item("Oreo Milkshake", ["4 Oreo cookies", "3 scoops vanilla ice cream", "150 ml cold milk", "40 ml sugar syrup", "150 ml whipped cream", "Blended with ice"]),
      item("Salted Caramel Milkshake", ["3 scoops vanilla ice cream", "150 ml cold whole milk", "3 tbsp caramel", "A small pinch of salt", "Extra caramel for garnish"]),
      item("Strawberry Milkshake", ["3 scoops strawberry ice cream", "150 ml cold milk", "40 ml sugar syrup", "150 ml whipped cream", "Blended with ice"]),
      item("Chocolate Milkshake", ["3 scoops chocolate or vanilla ice cream", "150 ml cold milk", "40 ml sugar syrup", "150 ml whipped cream", "Blended with ice"]),
    ],
  },
  {
    id: "smoothies",
    title: "Smoothies",
    items: [
      item("Banana Smoothie", ["3 ripe bananas", "200 ml cold milk", "100 ml yoghurt", "1 tbsp honey", "Blended with ice"]),
      item("Strawberry Smoothie", ["200 g strawberries", "200 ml cold milk", "100 ml yoghurt", "1 tbsp honey", "Blended with ice"]),
      item("Mango Smoothie", ["1 large ripe mango", "200 ml cold milk", "100 ml yoghurt", "1 tbsp honey", "Blended with ice"]),
      item("Pineapple Smoothie", ["200 g fresh ripe pineapple", "200 ml cold milk", "100 ml yoghurt", "1 tbsp honey", "Blended with ice"]),
    ],
  },
];

export const signatures = [
  { id: "av-dish-1", image: undefined, kicker: "Cocktail", name: "Mojito", description: "White rum, fresh mint, lime, sugar and soda over crushed ice" },
  { id: "av-dish-2", image: "/images/menu-negroni.jpg", kicker: "Cocktail", name: "Negroni", description: "Gin, Campari and sweet red vermouth, finished with orange" },
  { id: "av-dish-3", image: undefined, kicker: "Mocktail", name: "Chapman", description: "Fanta, Sprite, grenadine, cucumber and citrus over ice" },
  { id: "av-dish-4", image: undefined, kicker: "Milkshake", name: "Salted Caramel Milkshake", description: "Vanilla ice cream, cold whole milk, caramel and a pinch of salt" },
];
