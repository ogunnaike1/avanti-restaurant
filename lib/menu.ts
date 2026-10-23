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
    | "starters" | "ricepasta" | "soups" | "salads" | "burgers" | "platters" | "heritage" | "desserts" | "sides"
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
 * Food: the "Website Menu Copy" handoff (names, descriptions, prices). Drinks: the "Menu Pricing"
 * and "Wine, Spirits and Bottled Drinks" sheets (Menu name and Suggested menu price columns).
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
      item("Charred Gizzard Skewers", undefined, 8000, "Tender, seasoned gizzard pieces grilled on skewers for a flavourful bite"),
      item("Prime Beef Kebab Skewers", undefined, 10500, "Succulent beef cubes, marinated in aromatic spices and grilled to perfection"),
      item("Signature Buffalo Wings", undefined, 10000, "Crispy chicken wings tossed in a bold, tangy buffalo sauce"),
      item("Chef’s Assorted Grill", undefined, 9500, "A flavourful selection of assorted meats, seasoned and grilled to perfection"),
      item("Crispy Popcorn Prawns", undefined, 15000, "Bite-sized prawns, lightly seasoned, coated and fried until golden and crispy"),
      item("Chicken Lollipop Drumsticks", undefined, 10000, "Crunchy chicken drumstick shaped for easy eating, seasoned and fried to golden perfection, served with garlic mayo/chilli pepper sauce"),
      item("Signature Chicken Wings", undefined, 9500, "Juicy chicken wings, seasoned with aromatic spices and cooked to perfection"),
      item("Golden Chicken Samosa", undefined, 5000, "Crispy pastry parcel filled with a savoury, spiced chicken filling, served with garlic mayo/spicy sauce"),
      item("Crispy Oriental Spring Rolls", undefined, 4000, "Light, crispy pastry rolls filled with a delicious savoury mixture, served with garlic mayo or spicy sauce"),
      item("Prime Beef Suya", undefined, 13500, "Tender beef slices coated in a rich, spicy suya blend and grilled to perfection, with a side of fries"),
      item("Char Chicken Suya", undefined, 8500, "Succulent chicken pieces marinated in traditional suya spices and grilled for a smoky, flavourful finish"),
    ],
  },
  {
    id: "ricepasta",
    title: "Rice and Pasta Dish",
    items: [
      item("Avanti Signature", undefined, 28000, "An Avanti original rice dish crafted with rich flavour, loaded with chicken and beef, served with juicy chicken and salad"),
      item("Alfredo Pasta", undefined, 18000, "Creamy tagliatelle pasta tossed in a rich creamy sauce, for a smooth and delicious taste"),
      item("Spaghetti Bolognese", undefined, 15000, "Pasta served with a tasty minced beef and tomato sauce"),
      item("Seafood Stir Fry Pasta", undefined, 22000, "Pasta stir-fried with a mix of seafood, vegetables and delicious spices"),
      item("Seafood Chinese Rice", undefined, 30000, "Chinese-style rice cooked with seafood, vegetables and tasty seasoning"),
    ],
  },
  {
    id: "soups",
    title: "Soups & Sauces",
    items: [
      item("Velvet Chicken & Sweet Corn Soup", undefined, 10000, "A comforting blend of tender chicken, sweet corn and savoury broth"),
      item("Nigerian Catfish Pepper Broth", undefined, 22500, "Fresh catfish simmered in a fragrant, spicy broth infused with traditional herbs and spices"),
      item("Slow-Simmered Goat Pepper Broth", undefined, 10000, "Tender goat meat cooked in a rich, aromatic broth with traditional pepper soup spices"),
      item("Signature Assorted Meat Pepper Broth", undefined, 10000, "A hearty combination of assorted meats simmered in a rich, spicy broth with traditional herbs and Avanti special spices"),
      item("Golden Chicken Curry Sauce", undefined, 12000, "Tender chicken pieces cooked in a rich, aromatic curry sauce with a blend of savoury spices"),
      item("Roasted Chicken in Garlic Velouté", undefined, 15000, "Juicy chicken prepared in a savoury garlic-infused sauce, with rich aromatic flavours"),
      item("Pan-Seared Mackerel in Signature Sauce", undefined, 12000, "Mackerel cooked in a flavourful, well-seasoned sauce for a rich taste"),
    ],
  },
  {
    id: "salads",
    title: "Salads",
    items: [
      item("Grilled Chicken Caesar", undefined, 15000, "Fresh lettuce topped with grilled chicken and creamy Caesar dressing"),
      item("Tropical Fruit Éclat", undefined, 9000, "A refreshing mix of fresh, juicy seasonal fruits"),
      item("Garden Harvest Salad", undefined, 6000, "A mix of fresh vegetables served with a delicious salad dressing"),
      item("Emerald Garden Salad", undefined, 4000, "Fresh green vegetables tossed together for a light and refreshing meal"),
    ],
  },
  {
    id: "burgers",
    title: "Burgers & Bites",
    items: [
      item("The Signature Prime Beef Burger", undefined, 16000, "Juicy beef patty in a soft burger bun with fresh vegetables, delicious sauce and melted cheese, served with a side of fries"),
      item("Golden Crispy Chicken Burger", undefined, 11500, "Crispy golden chicken in a soft burger bun with fresh vegetables, delicious sauce and melted cheese, served with a side of fries"),
      item("The Double Agent", undefined, 22000, "Two layers of juicy chicken or beef in a soft burger bun with fresh vegetables, delicious sauce and melted cheese, served with a side of fries"),
    ],
  },
  {
    id: "platters",
    title: "Platters",
    items: [
      item("The Grand Ocean Platter", undefined, 95000, "Seafood platter: a mix of prawns, shrimp samosa, grilled calamari rings, crab and lobsters, served with garlic dip and sweet corn as fries, or plantain as a side"),
      item("The Signature Feast Platter", undefined, 55000, "A delicious mix of assorted meats, chicken wings, spring rolls and other tasty bites, grilled and seasoned to perfection"),
      item("The Royal Grill Platter", undefined, 45000, "A mouthwatering selection of assorted meats, grilled and seasoned with rich, delicious spices"),
    ],
  },
  {
    id: "heritage",
    title: "Nigerian Heritage",
    items: [
      item("Premium Seafood Okro", undefined, 28000, "Rich, flavourful okro soup with assorted seafood, served with poundo yam"),
    ],
  },
  {
    id: "desserts",
    title: "Desserts",
    items: [
      item("Velvet Crêpe", undefined, 10000, "Classic crêpe"),
      item("Strawberry Caramel Royale", undefined, 11500, "Strawberry caramel cake"),
      item("Classic Velvet Vanilla", undefined, 10000, "Vanilla cake"),
    ],
  },
  {
    id: "sides",
    title: "Sides",
    items: [
      item("Plantain", undefined, 5000, "Deep-fried plantain slices"),
      item("Crispy Chips", undefined, 4500, "Deep-fried golden Yukon potato chips"),
      item("Smoky Jollof", undefined, 7000, "Rich, flavourful, classic Nigerian jollof rice with a delicious smoky taste"),
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
