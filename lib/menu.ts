export type MenuItem = {
  name: string;
  description: string;
  price: string;
  /** Thumbnail shown beside the item on the menu, at every breakpoint. */
  image: string;
  tag?: string;
  featured?: boolean;
};

export type MenuGroup = {
  id: "starters" | "mains" | "grills" | "desserts" | "drinks";
  title: string;
  items: MenuItem[];
};

export const menu: MenuGroup[] = [
  {
    id: "starters",
    title: "Starters",
    items: [
      { name: "Burrata & Heirloom Tomatoes", image: "/images/menu-burrata.jpg", description: "Creamy burrata, sun tomatoes, basil oil, sourdough crisp", price: "₦12,500", tag: "Vegetarian" },
      { name: "Seared Scallops", image: "/images/item-scallops.jpg", description: "Cauliflower cream, brown butter, toasted hazelnut", price: "₦16,000", tag: "Chef’s choice", featured: true },
      { name: "Suya-Spiced Beef Tataki", image: "/images/item-tataki.jpg", description: "Rare fillet, yaji crust, pickled onion, lime", price: "₦14,000", tag: "Popular" },
      { name: "Wild Mushroom Velouté", image: "/images/item-veloute.jpg", description: "Girolles, thyme cream, truffle oil, chive", price: "₦9,800", tag: "Vegetarian" },
      { name: "Oysters, Champagne Mignonette", image: "/images/item-oysters.jpg", description: "Half dozen, shallot, cracked pepper, lemon", price: "₦18,000" },
    ],
  },
  {
    id: "mains",
    title: "Main Courses",
    items: [
      { name: "Truffle Risotto", image: "/images/dish-risotto.jpg", description: "Arborio rice, aged parmesan, black truffle", price: "₦18,500", tag: "Chef’s choice", featured: true },
      { name: "Pan-Seared Sea Bass", image: "/images/menu-seabass.jpg", description: "Fennel, saffron broth, confit potato, dill oil", price: "₦26,000" },
      { name: "Duck Breast à l’Orange", image: "/images/item-duck.jpg", description: "Blood orange, endive, five-spice jus", price: "₦28,500" },
      { name: "Lobster Linguine", image: "/images/dish-linguine.jpg", description: "Hand-cut pasta, chilli, tomato, lobster butter", price: "₦34,000", tag: "Popular" },
      { name: "Braised Short Rib", image: "/images/item-short-rib.jpg", description: "Twelve hours in red wine, bone marrow mash", price: "₦27,500" },
    ],
  },
  {
    id: "grills",
    title: "Grills",
    items: [
      { name: "Herb-Crusted Ribeye", image: "/images/dish-ribeye.jpg", description: "Premium beef, roasted vegetables, house jus", price: "₦32,000", tag: "Chef’s choice", featured: true },
      { name: "Lamb Chops, Rosemary Jus", image: "/images/item-lamb.jpg", description: "Charred over wood, smoked aubergine, mint", price: "₦29,000" },
      { name: "Charcoal Chicken Piri-Piri", image: "/images/item-chicken.jpg", description: "Half bird, scotch bonnet glaze, burnt lemon", price: "₦19,500", tag: "Popular" },
      { name: "Grilled Tiger Prawns", image: "/images/item-prawns.jpg", description: "Garlic butter, chilli, parsley, grilled lime", price: "₦24,000" },
    ],
  },
  {
    id: "desserts",
    title: "Desserts",
    items: [
      { name: "Chocolate Fondant", image: "/images/dish-fondant.jpg", description: "Dark chocolate, vanilla cream, seasonal berries", price: "₦9,500", tag: "Popular" },
      { name: "Vanilla Crème Brûlée", image: "/images/item-brulee.jpg", description: "Madagascan vanilla, burnt sugar, shortbread", price: "₦8,500" },
      { name: "Tiramisu Classico", image: "/images/item-tiramisu.jpg", description: "Mascarpone, espresso, savoiardi, cocoa", price: "₦8,900" },
      { name: "Coconut & Passionfruit Panna Cotta", image: "/images/item-panna-cotta.jpg", description: "Set cream, passionfruit gel, toasted coconut", price: "₦9,200", tag: "Vegetarian" },
    ],
  },
  {
    id: "drinks",
    title: "Drinks",
    items: [
      { name: "Avanti Negroni", image: "/images/menu-negroni.jpg", description: "House gin, bitter aperitivo, hibiscus vermouth", price: "₦11,000", tag: "Cocktail" },
      { name: "Smoked Old Fashioned", image: "/images/item-old-fashioned.jpg", description: "Bourbon, cane sugar, orange oil, cherrywood smoke", price: "₦12,500", tag: "Popular" },
      { name: "Hibiscus Spritz", image: "/images/item-spritz.jpg", description: "Zobo reduction, soda, lime, rosemary", price: "₦6,500", tag: "Mocktail" },
      { name: "Brut Réserve, glass", image: "/images/item-brut.jpg", description: "Sparkling, crisp apple and brioche", price: "₦14,000", tag: "Wine" },
      { name: "Barolo DOCG, bottle", image: "/images/item-barolo.jpg", description: "Piedmont, 2016 — rose, tar, long finish", price: "₦96,000", tag: "Wine" },
      { name: "Still / Sparkling Water", image: "/images/item-water.jpg", description: "750ml, served chilled", price: "₦2,500" },
    ],
  },
];

export const signatures = [
  { id: "av-dish-1", image: "/images/dish-risotto.jpg", kicker: "Chef’s choice", name: "Truffle Risotto", description: "Creamy Arborio rice, aged parmesan, black truffle", price: "₦18,500" },
  { id: "av-dish-2", image: "/images/dish-ribeye.jpg", kicker: "From the grill", name: "Herb-Crusted Ribeye", description: "Premium beef, roasted roots, house jus", price: "₦32,000" },
  { id: "av-dish-3", image: "/images/dish-linguine.jpg", kicker: "Most ordered", name: "Lobster Linguine", description: "Hand-cut pasta, chilli, tomato, lobster butter", price: "₦34,000" },
  { id: "av-dish-4", image: "/images/dish-fondant.jpg", kicker: "To finish", name: "Chocolate Fondant", description: "Dark chocolate, vanilla cream, seasonal berries", price: "₦9,500" },
];
