export type MenuItem = {
  name: string;
  /** Recipe code from the pricing sheets (F = food, B = bar), kept for data mapping. Never shown publicly. */
  sku?: string;
  /** Further SKUs that map to this same product (duplicate source records). */
  altSkus?: string[];
  /** Selling price in naira, tax exclusive. */
  /** Omitted until the price is confirmed. */
  price?: string;
  /** Several ways to buy the same thing, e.g. a measure or the bottle. Shown instead of `price`. */
  options?: { label: string; price: string }[];
  /** Short menu blurb. */
  description?: string;
  /** Optional thumbnail; rows without one render without an image. */
  image?: string;
  tag?: string;
  featured?: boolean;
};

export type MenuGroup = {
  id:
    | "starters" | "soups" | "salads" | "burgers" | "pasta" | "sides" | "platters" | "desserts"
    | "cocktails" | "mocktails" | "milkshakes" | "smoothies" | "spirits" | "wine" | "softdrinks";
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
 * Source: "Menu Pricing" and "Wine, Spirits and Bottled Drinks" sheets. Names are the
 * sheets' "Menu name" column and prices are their "Suggested menu price" column.
 * Not listed because the sheets give no price yet: Lemonade and Strawberry Lemonade
 * (still "SET PORTIONS"). Open points in the sheets: Black Russian (no coffee liqueur
 * stocked), Negroni (Campari and vermouth to be stocked), Four Cousins wine colour,
 * and whether Chi and Chivita juice are sold by the bottle or by the glass.
 */
export const menu: MenuGroup[] = [
  {
    id: "starters",
    title: "Starters",
    items: [
      item("Charred Gizzard Skewers", "F12", 7500),
      item("Prime Beef Kebab Skewers", "F13", 10500),
      item("Signature Buffalo Wings", "F14", 15000),
      item("Chef's Assorted Grill", "F15", 9500),
      item("Golden Chicken Bites", "F16", 10500),
      item("Crispy Popcorn Prawns", "F17", 15500),
      item("Chicken Lollipop Drumsticks", "F24", 9000),
      item("Signature Chicken Wings", "F18", 9500),
      item("Golden Chicken Samosa", "F19", 5000),
      item("Golden Shrimp Samosa", "F20", 7500),
      item("Crispy Oriental Spring Rolls", "F21", 4500),
      item("Prime Beef Suya", "F22", 13500),
      item("Charcoal Chicken Suya", "F23", 8500),
    ],
  },
  {
    id: "soups",
    title: "Soups & Sauces",
    items: [
      item("Velvet Chicken & Sweet Corn Soup", "F28", 15000),
      item("Nigerian Catfish Pepper Broth", "F29", 22500),
      item("Slow-Simmered Goat Pepper Broth", "F30", 9500),
      item("Herbed Turkey Pepper Broth", "F31", 9500),
      item("Signature Assorted Meat Pepper Broth", "F32", 9000),
      item("Golden Chicken Curry", "F33", 11000),
      item("Roasted Chicken in Garlic Velouté", "F34", 17500),
      item("Pan-Seared Titus in Signature Sauce", "F35", 12000),
    ],
  },
  {
    id: "salads",
    title: "Salads",
    items: [
      item("Grilled Chicken Caesar", "F07", 14500),
      item("Tropical Fruit Éclat", "F08", 9000),
      item("Garden Harvest Salad", "F09", 5000),
      item("Emerald Garden Salad", "F10", 3500),
    ],
  },
  {
    id: "burgers",
    title: "Burgers",
    items: [
      item("The Signature Prime Beef Burger", "F11", 18000),
      item("Golden Crispy Chicken Burger", "F25", 11500),
      item("The Double Agent", "F26", 25000),
    ],
  },
  {
    id: "pasta",
    title: "Pasta",
    items: [
      item("Alfredo Pasta", "F36", 29500),
      item("Bolognese", "F37", 9500),
      item("Seafood Penne Pasta", "F46", 24000),
      item("Meatball Pasta", "F47", 33500),
    ],
  },
  {
    id: "sides",
    title: "Sides",
    items: [
      item("Jollof Rice", "F38", 5500),
      item("Seafood Chinese Rice", "F48", 38500),
      item("Chips", "F49", 4500),
      item("Fried Plantain", "F50", 5500),
    ],
  },
  {
    id: "platters",
    title: "Platters",
    items: [
      item("The Grand Ocean Platter", "F04", 70000),
      item("The Signature Feast Platter", "F05", 39500),
      item("The Royal Grill Platter", "F06", 43000),
    ],
  },
  {
    id: "desserts",
    title: "Desserts",
    items: [
      item("Velvet Crêpe", "F01", 8000),
      item("Strawberry Caramel Royale", "F02", 10500),
      item("Madagascan Vanilla Éclat", "F03", 10000),
    ],
  },
  {
    id: "cocktails",
    title: "Cocktails",
    items: [
      item("Mojito", "B01", 9000, "Cuban-style classic of white rum, fresh mint and lime, topped with soda."),
      item("Piña Colada", "B02", 10500, "Creamy tropical blend of white rum, pineapple and coconut."),
      item("Sex on the Beach", "B03", 9000, "Fruity and bright: vodka, orange and cranberry."),
      item("Tequila Sunrise", "B04", 11500, "Tequila and orange juice with a sunset swirl of grenadine."),
      item("Long Island", "B05", 15500, "Five spirits, lemon and cola in one bold, long drink."),
      item("Margarita", "B06", 18500, "Tequila, orange liqueur and fresh lime, finished with a salted rim."),
      item("Cosmopolitan", "B07", 13500, "Crisp vodka, cranberry and lime with a citrus lift."),
      item("Daiquiri", "B08", 10000, "Clean and refreshing white rum with fresh lime."),
      item("Tropical Long Island", "B09", 16000, "The Long Island with a fruity twist of pineapple and orange."),
      item("Deep Blue Sea", "B10", 9500, "Vivid blue vodka cocktail with blue curaçao and pineapple."),
      item("Whiskey Sour", "B12", 13500, "Whiskey balanced with fresh lemon, smooth and tangy."),
      item("Pornstar Martini", "B13", 11500, "A chilled vodka martini with passion fruit."),
      item("Negroni", "B14", 11500, "Gin, Campari and sweet vermouth: bittersweet and bold.", { image: "/images/menu-negroni.jpg" }),
      item("Black Russian", "B15", 9000, "A vodka classic over ice, simple and smooth."),
      item("Tropical Sunrise", "B16", 10000, "Vodka with orange and pineapple, finished with a grenadine glow."),
      item("Mango Mule", "B17", 10500, "Mango and lime with a ginger beer kick."),
    ],
  },
  {
    id: "mocktails",
    title: "Mocktails",
    items: [
      item("Virgin Piña Colada", "B18", 4000, "All the pineapple and coconut, completely alcohol-free."),
      item("Virgin Mojito", "B19", 1500, "Fresh mint and lime with soda, cool and alcohol-free."),
      item("Chapman", "B20", 4000, "Nigeria’s favourite: Fanta and Sprite with grenadine, cucumber and citrus."),
      item("Passion Fruit Cooler", "B23", 7500, "Tangy passion fruit and lime with a sparkling finish."),
      item("Watermelon Mint Cooler", "B24", 2500, "Juicy watermelon, cool mint and lime, light and refreshing."),
      item("Mint Storm", "B25", 1500, "A zesty burst of mint and lime with a fizzy finish."),
    ],
  },
  {
    id: "milkshakes",
    title: "Milkshakes",
    items: [
      item("Vanilla Milkshake", "B26", 13000, "Thick, creamy vanilla topped with whipped cream."),
      item("Strawberry Milkshake", "B29", 13000, "Strawberry ice cream blended thick and topped with whipped cream."),
      item("Chocolate Milkshake", "B30", 13000, "Rich, indulgent chocolate blended thick and creamy."),
    ],
  },
  {
    id: "smoothies",
    title: "Smoothies",
    items: [
      item("Banana Smoothie", "B31", 15000, "Ripe banana blended with milk, yoghurt and honey."),
      item("Strawberry Smoothie", "B32", 15000, "Fresh strawberries blended with milk, yoghurt and honey."),
      item("Mango Smoothie", "B33", 9000, "Ripe mango blended with milk, yoghurt and honey."),
      item("Pineapple Smoothie", "B34", 11500, "Sweet pineapple blended with milk, yoghurt and honey."),
    ],
  },
  {
    id: "spirits",
    title: "Spirits",
    items: [
      item("Don Julio Tequila", undefined, undefined, undefined, { options: [{ label: "Shot", price: "₦37,500" }, { label: "Bottle", price: "₦562,500" }] }),
      item("Casamigos Tequila", undefined, undefined, undefined, { options: [{ label: "Shot", price: "₦15,500" }, { label: "Bottle", price: "₦229,500" }] }),
      item("Sierra Tequila", undefined, undefined, undefined, { options: [{ label: "Shot", price: "₦5,500" }, { label: "Bottle", price: "₦71,000" }] }),
      item("Hennessy VSOP", undefined, undefined, undefined, { options: [{ label: "Shot", price: "₦18,000" }, { label: "Bottle", price: "₦246,000" }] }),
      item("Absolut Vodka (Imported)", undefined, undefined, undefined, { options: [{ label: "Shot", price: "₦4,500" }, { label: "Bottle", price: "₦60,500" }] }),
      item("Absolut Vodka (Plain)", undefined, undefined, undefined, { options: [{ label: "Shot", price: "₦4,500" }, { label: "Bottle", price: "₦60,500" }] }),
      item("Gordon's Gin", undefined, undefined, undefined, { options: [{ label: "Shot", price: "₦3,000" }, { label: "Bottle", price: "₦41,000" }] }),
      item("Bacardi White Rum", undefined, undefined, undefined, { options: [{ label: "Shot", price: "₦4,000" }, { label: "Bottle", price: "₦56,500" }] }),
      item("Bacardi Gold Rum", undefined, undefined, undefined, { options: [{ label: "Shot", price: "₦4,000" }, { label: "Bottle", price: "₦56,500" }] }),
    ],
  },
  {
    id: "wine",
    title: "Wine & Champagne",
    items: [
      item("Four Cousins Wine", undefined, undefined, undefined, { options: [{ label: "Glass", price: "₦3,500" }, { label: "Bottle", price: "₦41,000" }] }),
      item("Moët Champagne", undefined, undefined, undefined, { options: [{ label: "Glass", price: "₦112,000" }, { label: "Bottle", price: "₦670,000" }] }),
    ],
  },
  {
    id: "softdrinks",
    title: "Soft Drinks & Juice",
    items: [
      item("Coca-Cola", undefined, 1500, "50 cl bottle."),
      item("Fanta Orange", undefined, 1500, "50 cl bottle."),
      item("Sprite", undefined, 1500, "60 cl bottle."),
      item("Chi Exotic Juice", undefined, 4500, "Pineapple, 1 L bottle."),
      item("Chivita Juice", undefined, 5000, "Orange, 1 L bottle."),
    ],
  },
];
