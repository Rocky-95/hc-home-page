
import product1 from "../images/WeddingSuitProductImages/Sangeet/SangeetBlue.jpg";
import product2 from "../images/WeddingSuitProductImages/Sangeet/SangeetCream.jpg";
import product3 from "../images/WeddingSuitProductImages/Sangeet/SangeetBlackLeft1.jpg";
import product4 from "../images/WeddingSuitProductImages/Sangeet/SangeetBlackLeft2.jpg";
import product5 from "../images/WeddingSuitProductImages/Sangeet/SangeetBlackLeft3.jpg";
import product6 from "../images/WeddingSuitProductImages/Sangeet/SangeetCreamLeft1.jpg";
import product7 from "../images/WeddingSuitProductImages/Sangeet/SangeetCreamLeft2.jpg";

export const products = [

  // ------------------TUXEDO Page ---------------------

  {
    id: 1,
    name: "88 Classic Gold",
    category: "tuxedo",
    price: 2218,
    originalPrice: 3698,
    image: product1,

    subtitle: "Luxury Tuxedo",
    sku: "TXD-001",
    rating: 4.8,
    reviewCount: 120,
    stock: "in",

    description:
      "A smooth and rich flavor, crafted for those who seek timeless luxury.",

    colors: [
      {
        id: "gold",
        label: "Classic Gold",
        hex: "#FFD700" ,
        border: "#C9A000",
      },
      { id: "brown", label: "Earth Brown", hex: "#9B5C30", border: "#7a4726" },
      { id: "green", label: "Olive Green", hex: "#47412A", border: "#5a5235" }
    ],

    imagesByColor: {
      gold: [product1, product1, product1],
      brown: [product2, product2, product2],
      green: [product3, product3, product3],
    },

    sizeOptions: ["S", "M", "L", "XL"],

    sizes: [
      { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: true },
      { label: "XL", available: true },
    ],

    sizeChart: [
      { size: "S", chest: "36", waist: "30", length: "26" },
      { size: "M", chest: "38", waist: "32", length: "27" },
      { size: "L", chest: "40", waist: "34", length: "28" },
      { size: "XL", chest: "42", waist: "36", length: "29" },
    ],

    trustBadges: [
      "Premium Fabric",
      "Luxury Finish",
      "Wedding Collection",
    ],

    details: [
      "Imported Fabric",
      "Tailored Fit",
      "Elegant Finish",
    ],

    accordion: [
      {
        id: "desc",
        title: "Description",
        body: "Luxury tuxedo designed for weddings and elite events.",
      },
    ],
  },

  {
    id: 2,
    name: "88 Silver Lights",
    price: 1498,
    originalPrice: 2498,
    image: product2,
    category: "tuxedo",

    subtitle: "Modern Luxury",
    sku: "TXD-002",
    rating: 4.5,
    reviewCount: 95,
    stock: "in",

    description:
      "Light and refreshing with a refined taste for modern smokers.",

    colors: [
      {
        id: "silver",
        label: "Silver",
        hex: "#C0C0C0",
        border: "#A9A9A9",
      },
    ],

    imagesByColor: {
      silver: [product2, product2, product2],
    },

    sizeOptions: ["S", "M", "L"],

    sizes: [
      { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: true },
    ],

    sizeChart: [
      { size: "S", chest: "36", waist: "30", length: "26" },
      { size: "M", chest: "38", waist: "32", length: "27" },
      { size: "L", chest: "40", waist: "34", length: "28" },
    ],

    trustBadges: ["Premium Finish", "Comfort Fit"],

    details: ["Elegant Design", "Modern Look"],

    accordion: [
      {
        id: "desc",
        title: "Description",
        body: "Modern silver tuxedo with premium detailing.",
      },
    ],
  },

  {
    id: 3,
    name: "88 Platinum Menthol",
    price: 1498,
    originalPrice: 2498,
    image: product3,
    category: "tuxedo",

    subtitle: "Premium Collection",
    sku: "TXD-003",
    rating: 4.7,
    reviewCount: 88,
    stock: "in",

    description:
      "A bold menthol experience with a crisp, cooling sensation.",

    colors: [
      {
        id: "platinum",
        label: "Platinum",
        hex: "#E5E4E2",
        border: "#BEBEBE",
      },
    ],

    imagesByColor: {
      platinum: [product3, product3, product3],
    },

    sizeOptions: ["M", "L", "XL"],

    sizes: [
      { label: "M", available: true },
      { label: "L", available: true },
      { label: "XL", available: true },
    ],

    sizeChart: [
      { size: "M", chest: "38", waist: "32", length: "27" },
      { size: "L", chest: "40", waist: "34", length: "28" },
      { size: "XL", chest: "42", waist: "36", length: "29" },
    ],

    trustBadges: ["Luxury Finish", "Premium Fabric"],

    details: ["Tailored Fit", "Elegant Finish"],

    accordion: [
      {
        id: "desc",
        title: "Description",
        body: "Premium platinum tuxedo with bold styling.",
      },
    ],
  },

  {
    id: 4,
    name: "88 Bold Red",
    category: "tuxedo",
    price: 1798,
    originalPrice: 2698,
    image: product4,

    subtitle: "Bold Collection",
    sku: "TXD-004",
    rating: 4.6,
    reviewCount: 70,
    stock: "in",

    description:
      "Strong and full-bodied, crafted for those who enjoy intensity.",

    colors: [
      {
        id: "red",
        label: "Bold Red",
        hex: "#FF0000",
        border: "#8B0000",
      },
    ],

    imagesByColor: {
      red: [product4, product4, product4],
    },

    sizeOptions: ["S", "M", "L"],

    sizes: [
      { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: true },
    ],

    sizeChart: [
      { size: "S", chest: "36", waist: "30", length: "26" },
      { size: "M", chest: "38", waist: "32", length: "27" },
      { size: "L", chest: "40", waist: "34", length: "28" },
    ],

    trustBadges: ["Premium Fabric"],

    details: ["Luxury Design"],

    accordion: [
      {
        id: "desc",
        title: "Description",
        body: "Bold red tuxedo with striking elegance.",
      },
    ],
  },

  {
    id: 5,
    name: "88 Smooth Blue",
    category: "tuxedo",
    price: 1598,
    originalPrice: 2398,
    image: product5,

    subtitle: "Elegant Blue",
    sku: "TXD-005",
    rating: 4.4,
    reviewCount: 60,
    stock: "in",

    description:
      "A smooth blend with a refined taste, perfect for daily smoking.",

    colors: [
      {
        id: "blue",
        label: "Smooth Blue",
        hex: "#1E90FF",
        border: "#1560BD",
      },
    ],

    imagesByColor: {
      blue: [product5, product5, product5],
    },

    sizeOptions: ["M", "L", "XL"],

    sizes: [
      { label: "M", available: true },
      { label: "L", available: true },
      { label: "XL", available: true },
    ],

    sizeChart: [
      { size: "M", chest: "38", waist: "32", length: "27" },
      { size: "L", chest: "40", waist: "34", length: "28" },
      { size: "XL", chest: "42", waist: "36", length: "29" },
    ],

    trustBadges: ["Modern Style"],

    details: ["Elegant Finish"],

    accordion: [
      {
        id: "desc",
        title: "Description",
        body: "Smooth blue tuxedo crafted for modern elegance.",
      },
    ],
  },

  {
  id: 6,
  name: "88 Deluxe Black",
  category: "tuxedo",
  price: 2498,
  originalPrice: 3498,
  image: product6,

  subtitle: "Deluxe Luxury Edition",
  sku: "TXD-006",
  rating: 4.9,
  reviewCount: 142,
  stock: "in",

  description:
    "Premium dark blend offering luxury and sophistication.",

  colors: [
    {
      id: "black",
      label: "Deluxe Black",
      hex: "#000000",
      border: "#444444",
    },
  ],

  imagesByColor: {
    black: [product6, product6, product6],
  },

  sizeOptions: ["S", "M", "L", "XL"],

  sizes: [
    { label: "S", available: true },
    { label: "M", available: true },
    { label: "L", available: true },
    { label: "XL", available: true },
  ],

  sizeChart: [
    { size: "S", chest: "36", waist: "30", length: "26" },
    { size: "M", chest: "38", waist: "32", length: "27" },
    { size: "L", chest: "40", waist: "34", length: "28" },
    { size: "XL", chest: "42", waist: "36", length: "29" },
  ],

  trustBadges: [
    "Premium Fabric",
    "Luxury Finish",
    "Imported Material",
  ],

  details: [
    "Luxury Tailoring",
    "Elegant Finish",
    "Premium Design",
  ],

  accordion: [
    {
      id: "desc",
      title: "Description",
      body: "Premium black tuxedo crafted for elite luxury occasions.",
    },
    {
      id: "fabric",
      title: "Fabric",
      body: "Imported premium fabric with smooth luxury finish.",
    },
  ],
  },

  {
    id: 7,
    name: "88 Menthol Ice",
    category: "tuxedo",
    price: 1698,
    originalPrice: 2598,
    image: product7,

    subtitle: "Ice Collection",
    sku: "TXD-007",
    rating: 4.5,
    reviewCount: 89,
    stock: "in",

    description:
      "An icy-cool menthol with an ultra-refreshing aftertaste.",

    colors: [
      {
        id: "ice",
        label: "Menthol Ice",
        hex: "#00FFFF",
        border: "#00CED1",
      },
    ],

    imagesByColor: {
      ice: [product7, product7, product7],
    },

    sizeOptions: ["M", "L"],

    sizes: [
      { label: "M", available: true },
      { label: "L", available: true },
    ],

    sizeChart: [
      { size: "M", chest: "38", waist: "32", length: "27" },
      { size: "L", chest: "40", waist: "34", length: "28" },
    ],

    trustBadges: [
      "Cooling Comfort",
      "Premium Finish",
      "Modern Style",
    ],

    details: [
      "Elegant Tailoring",
      "Luxury Styling",
      "Premium Comfort",
    ],

    accordion: [
      {
        id: "desc",
        title: "Description",
        body: "Refreshing ice-themed tuxedo designed for modern elegance.",
      },
      {
        id: "fabric",
        title: "Fabric",
        body: "Soft premium fabric with breathable comfort and luxury finish.",
      },
    ],
  },

  // ------------------TUXEDO Page ---------------------

  // ------------------EXTREME POPPINS  Page ---------------------
{
  id: "Obsidian-Night",
  category: "extreme-poppins",

  name: "Obsidian Night Poppins",

  price: 4898,
  originalPrice: 6598,

  image: product7,

  subtitle: "Obsidian Collection",
  sku: "EPP-007",
  rating: 4.9,
  reviewCount: 156,
  stock: "in",

  description:
    "An ultra-luxury obsidian black ensemble crafted for elite evening celebrations and grand receptions.",

  colors: [
    {
      id: "obsidian",
      label: "Obsidian Black",
      hex: "#0A0A0A",
      border: "#222222",
    },
    {
      id: "platinum",
      label: "Platinum Silver",
      hex: "#C0C0C0",
      border: "#9E9E9E",
    },
  ],

  imagesByColor: {
    obsidian: [product7, product5, product7],
    platinum: [product6, product7, product5],
  },

  sizeOptions: ["S", "M", "L", "XL"],

  sizes: [
    { label: "S", available: true },
    { label: "M", available: true },
    { label: "L", available: true },
    { label: "XL", available: true },
  ],

  sizeChart: [
    { size: "S", chest: "36", waist: "30", length: "26" },
    { size: "M", chest: "38", waist: "32", length: "27" },
    { size: "L", chest: "40", waist: "34", length: "28" },
    { size: "XL", chest: "42", waist: "36", length: "29" },
  ],

  trustBadges: [
    "Elite Luxury",
    "Premium Finish",
    "Royal Collection",
  ],

  details: [
    "Imported Fabric",
    "Luxury Tailoring",
    "Elegant Styling",
  ],

  accordion: [
    {
      id: "desc",
      title: "Description",
      body: "Obsidian black luxury attire crafted for modern royalty and premium celebrations.",
    },
    {
      id: "fabric",
      title: "Fabric",
      body: "Premium imported fabric with breathable comfort and elegant luxury texture.",
    },
  ],
},

  {
  id: "Royal-Black",
  category: "extreme-poppins",

  name: "Royal Black Poppins",

  price: 3498,
  originalPrice: 4998,

  image: product1,

  subtitle: "Royal Collection",
  sku: "EPP-001",
  rating: 4.9,
  reviewCount: 142,
  stock: "in",

  description:
    "A royal black luxury ensemble crafted for elite celebrations and grand occasions.",

  colors: [
    {
      id: "black",
      label: "Royal Black",
      hex: "#000000",
      border: "#333333",
    },
    {
      id: "gold",
      label: "Luxury Gold",
      hex: "#D4AF37",
      border: "#B7950B",
    },
  ],

  imagesByColor: {
    black: [product1, product1, product5],
    gold: [product6, product6, product5],
  },

  sizeOptions: ["S", "M", "L", "XL"],

  sizes: [
    { label: "S", available: true },
    { label: "M", available: true },
    { label: "L", available: true },
    { label: "XL", available: true },
  ],

  sizeChart: [
    { size: "S", chest: "36", waist: "30", length: "26" },
    { size: "M", chest: "38", waist: "32", length: "27" },
    { size: "L", chest: "40", waist: "34", length: "28" },
    { size: "XL", chest: "42", waist: "36", length: "29" },
  ],

  trustBadges: [
    "Royal Finish",
    "Premium Tailoring",
    "Luxury Collection",
  ],

  details: [
    "Imported Fabric",
    "Luxury Styling",
    "Elegant Finish",
  ],

  accordion: [
    {
      id: "desc",
      title: "Description",
      body: "Royal black outfit designed for luxury receptions and premium celebrations.",
    },
  ],
},

{
  id: "Velvet-Maroon",
  category: "extreme-poppins",

  name: "Velvet Maroon Poppins",

  price: 3898,
  originalPrice: 5498,

  image: product2,

  subtitle: "Velvet Collection",
  sku: "EPP-002",
  rating: 4.8,
  reviewCount: 120,
  stock: "in",

  description:
    "Elegant maroon velvet styling crafted for luxurious evening occasions.",

  colors: [
    {
      id: "maroon",
      label: "Velvet Maroon",
      hex: "#800000",
      border: "#5C0000",
    },
    {
      id: "cream",
      label: "Royal Cream",
      hex: "#F5F5DC",
      border: "#D8D0B0",
    },
  ],

  imagesByColor: {
    maroon: [product2, product5, product2],
    cream: [product6, product2, product5],
  },

  sizeOptions: ["M", "L", "XL"],

  sizes: [
    { label: "M", available: true },
    { label: "L", available: true },
    { label: "XL", available: true },
  ],

  sizeChart: [
    { size: "M", chest: "38", waist: "32", length: "27" },
    { size: "L", chest: "40", waist: "34", length: "28" },
    { size: "XL", chest: "42", waist: "36", length: "29" },
  ],

  trustBadges: [
    "Velvet Finish",
    "Luxury Fabric",
    "Party Wear",
  ],

  details: [
    "Premium Velvet",
    "Modern Luxury",
    "Elegant Design",
  ],

  accordion: [
    {
      id: "desc",
      title: "Description",
      body: "Premium maroon velvet collection crafted for elite evening styling.",
    },
  ],
},

{
  id: "Emerald-Luxe",
  category: "extreme-poppins",

  name: "Emerald Luxe Poppins",

  price: 4198,
  originalPrice: 5898,

  image: product3,

  subtitle: "Luxury Green Collection",
  sku: "EPP-003",
  rating: 4.9,
  reviewCount: 101,
  stock: "in",

  description:
    "Rich emerald styling designed for bold and sophisticated fashion statements.",

  colors: [
    {
      id: "green",
      label: "Emerald Green",
      hex: "#0B6623",
      border: "#145A32",
    },
    {
      id: "black",
      label: "Classic Black",
      hex: "#000000",
      border: "#333333",
    },
  ],

  imagesByColor: {
    green: [product3, product5, product3],
    black: [product6, product3, product5],
  },

  sizeOptions: ["S", "M", "L"],

  sizes: [
    { label: "S", available: true },
    { label: "M", available: true },
    { label: "L", available: true },
  ],

  sizeChart: [
    { size: "S", chest: "36", waist: "30", length: "26" },
    { size: "M", chest: "38", waist: "32", length: "27" },
    { size: "L", chest: "40", waist: "34", length: "28" },
  ],

  trustBadges: [
    "Elite Styling",
    "Luxury Finish",
    "Modern Tailoring",
  ],

  details: [
    "Bold Design",
    "Premium Comfort",
    "Royal Finish",
  ],

  accordion: [
    {
      id: "desc",
      title: "Description",
      body: "Emerald luxury outfit crafted for bold and stylish celebrations.",
    },
  ],
},

{
  id: "Midnight-Blue",
  category: "extreme-poppins",

  name: "Midnight Blue Poppins",

  price: 3698,
  originalPrice: 5298,

  image: product4,

  subtitle: "Midnight Collection",
  sku: "EPP-004",
  rating: 4.7,
  reviewCount: 88,
  stock: "in",

  description:
    "Sophisticated midnight blue styling with luxurious modern tailoring.",

  colors: [
    {
      id: "blue",
      label: "Midnight Blue",
      hex: "#191970",
      border: "#0F1A4A",
    },
    {
      id: "silver",
      label: "Silver Mist",
      hex: "#C0C0C0",
      border: "#A9A9A9",
    },
  ],

  imagesByColor: {
    blue: [product4, product5, product4],
    silver: [product6, product4, product5],
  },

  sizeOptions: ["S", "M", "L", "XL"],

  sizes: [
    { label: "S", available: true },
    { label: "M", available: true },
    { label: "L", available: true },
    { label: "XL", available: true },
  ],

  sizeChart: [
    { size: "S", chest: "36", waist: "30", length: "26" },
    { size: "M", chest: "38", waist: "32", length: "27" },
    { size: "L", chest: "40", waist: "34", length: "28" },
    { size: "XL", chest: "42", waist: "36", length: "29" },
  ],

  trustBadges: [
    "Luxury Finish",
    "Imported Fabric",
    "Elegant Styling",
  ],

  details: [
    "Premium Stitching",
    "Elite Fashion",
    "Modern Comfort",
  ],

  accordion: [
    {
      id: "desc",
      title: "Description",
      body: "Midnight blue luxury outfit crafted for premium events and weddings.",
    },
  ],
},

{
  id: "Pearl-White",
  category: "extreme-poppins",

  name: "Pearl White Poppins",

  price: 4298,
  originalPrice: 5998,

  image: product5,

  subtitle: "Pearl Collection",
  sku: "EPP-005",
  rating: 4.9,
  reviewCount: 134,
  stock: "in",

  description:
    "Elegant pearl white styling crafted for luxury weddings and royal celebrations.",

  colors: [
    {
      id: "white",
      label: "Pearl White",
      hex: "#F8F8FF",
      border: "#DCDCDC",
    },
    {
      id: "champagne",
      label: "Champagne Gold",
      hex: "#F7E7CE",
      border: "#D6C29C",
    },
  ],

  imagesByColor: {
    white: [product5, product5, product6],
    champagne: [product6, product5, product6],
  },

  sizeOptions: ["S", "M", "L", "XL"],

  sizes: [
    { label: "S", available: true },
    { label: "M", available: true },
    { label: "L", available: true },
    { label: "XL", available: true },
  ],

  sizeChart: [
    { size: "S", chest: "36", waist: "30", length: "26" },
    { size: "M", chest: "38", waist: "32", length: "27" },
    { size: "L", chest: "40", waist: "34", length: "28" },
    { size: "XL", chest: "42", waist: "36", length: "29" },
  ],

  trustBadges: [
    "Wedding Luxury",
    "Premium Finish",
    "Elegant Tailoring",
  ],

  details: [
    "Luxury Stitching",
    "Royal Design",
    "Premium Comfort",
  ],

  accordion: [
    {
      id: "desc",
      title: "Description",
      body: "Pearl white luxury attire designed for elegant wedding celebrations.",
    },
    {
      id: "fabric",
      title: "Fabric",
      body: "Premium imported luxury fabric with soft breathable comfort.",
    },
  ],
},

{
  id: "Ruby-Red",
  category: "extreme-poppins",

  name: "Ruby Red Poppins",

  price: 4598,
  originalPrice: 6298,

  image: product6,

  subtitle: "Ruby Collection",
  sku: "EPP-006",
  rating: 4.8,
  reviewCount: 112,
  stock: "in",

  description:
    "Bold ruby red luxury styling designed for grand receptions and festive occasions.",

  colors: [
    {
      id: "ruby",
      label: "Ruby Red",
      hex: "#9B111E",
      border: "#7B0D18",
    },
    {
      id: "black",
      label: "Royal Black",
      hex: "#000000",
      border: "#333333",
    },
  ],

  imagesByColor: {
    ruby: [product6, product5, product6],
    black: [product5, product6, product5],
  },

  sizeOptions: ["M", "L", "XL"],

  sizes: [
    { label: "M", available: true },
    { label: "L", available: true },
    { label: "XL", available: true },
  ],

  sizeChart: [
    { size: "M", chest: "38", waist: "32", length: "27" },
    { size: "L", chest: "40", waist: "34", length: "28" },
    { size: "XL", chest: "42", waist: "36", length: "29" },
  ],

  trustBadges: [
    "Luxury Party Wear",
    "Bold Styling",
    "Premium Tailoring",
  ],

  details: [
    "Elegant Finish",
    "Imported Material",
    "Modern Royal Design",
  ],

  accordion: [
    {
      id: "desc",
      title: "Description",
      body: "Ruby red luxury outfit crafted for bold and premium celebrations.",
    },
    {
      id: "fabric",
      title: "Fabric",
      body: "Premium breathable luxury fabric with royal texture and elegant finish.",
    },
  ],
},
  // ------------------EXTREME POPPINS  Page ---------------------

    // ------------------Gurkha Trousers  Page ---------------------
{
  id: "Midnight-Gurkha",

  category: "gurkha-trousers",

  name: "Midnight Black Gurkha",

  price: 3298,
  originalPrice: 4898,

  image: product1,

  subtitle: "Midnight Collection",
  sku: "GTK-001",
  rating: 4.7,
  reviewCount: 102,
  stock: "in",

  description:
    "Elegant midnight black Gurkha trousers crafted for refined luxury styling.",

  colors: [
    {
      id: "black",
      label: "Midnight Black",
      hex: "#000000",
      border: "#333333",
    },
    {
      id: "grey",
      label: "Steel Grey",
      hex: "#5F5F5F",
      border: "#4A4A4A",
    },
  ],

  imagesByColor: {
    black: [product1, product2, product1],
    grey: [product2, product1, product2],
  },

  sizeOptions: ["30", "32", "34", "36"],

  sizes: [
    { label: "30", available: true },
    { label: "32", available: true },
    { label: "34", available: true },
    { label: "36", available: true },
  ],

  sizeChart: [
    { size: "30", waist: "30", length: "40" },
    { size: "32", waist: "32", length: "41" },
    { size: "34", waist: "34", length: "42" },
    { size: "36", waist: "36", length: "43" },
  ],

  trustBadges: [
    "Premium Tailoring",
    "Luxury Fabric",
    "Elegant Finish",
  ],

  details: [
    "High Waist Gurkha",
    "Pleated Styling",
    "Imported Material",
  ],

  accordion: [
    {
      id: "desc",
      title: "Description",
      body: "Sophisticated black Gurkha trousers designed for timeless elegance.",
    },
    {
      id: "fabric",
      title: "Fabric",
      body: "Premium imported fabric with luxurious comfort and refined texture.",
    },
  ],
},

{
  id: "Royal-Beige",

  category: "gurkha-trousers",

  name: "Royal Beige Gurkha",

  price: 3498,
  originalPrice: 5298,

  image: product2,

  subtitle: "Royal Collection",
  sku: "GTK-002",
  rating: 4.8,
  reviewCount: 115,
  stock: "in",

  description:
    "Luxury beige Gurkha trousers tailored for sophisticated modern styling.",

  colors: [
    {
      id: "beige",
      label: "Royal Beige",
      hex: "#D2B48C",
      border: "#B1906B",
    },
    {
      id: "brown",
      label: "Classic Brown",
      hex: "#5C4033",
      border: "#4A3227",
    },
  ],

  imagesByColor: {
    beige: [product2, product3, product2],
    brown: [product3, product2, product3],
  },

  sizeOptions: ["30", "32", "34", "36"],

  sizes: [
    { label: "30", available: true },
    { label: "32", available: true },
    { label: "34", available: true },
    { label: "36", available: true },
  ],

  sizeChart: [
    { size: "30", waist: "30", length: "40" },
    { size: "32", waist: "32", length: "41" },
    { size: "34", waist: "34", length: "42" },
    { size: "36", waist: "36", length: "43" },
  ],

  trustBadges: [
    "Modern Tailoring",
    "Premium Finish",
    "Comfort Fit",
  ],

  details: [
    "Elegant Pleats",
    "Soft Luxury Fabric",
    "Modern Gurkha Design",
  ],

  accordion: [
    {
      id: "desc",
      title: "Description",
      body: "Royal beige Gurkha trousers crafted for premium formal styling.",
    },
    {
      id: "fabric",
      title: "Fabric",
      body: "Smooth luxury fabric with elegant drape and breathable comfort.",
    },
  ],
},

{
  id: "Olive-Luxury",

  category: "gurkha-trousers",

  name: "Olive Luxury Gurkha",

  price: 3698,
  originalPrice: 5598,

  image: product3,

  subtitle: "Luxury Olive Collection",
  sku: "GTK-003",
  rating: 4.9,
  reviewCount: 128,
  stock: "in",

  description:
    "Sophisticated olive Gurkha trousers crafted with luxury tailoring and premium comfort.",

  colors: [
    {
      id: "olive",
      label: "Luxury Olive",
      hex: "#556B2F",
      border: "#445522",
    },
    {
      id: "black",
      label: "Jet Black",
      hex: "#000000",
      border: "#333333",
    },
  ],

  imagesByColor: {
    olive: [product3, product4, product3],
    black: [product4, product3, product4],
  },

  sizeOptions: ["30", "32", "34", "36"],

  sizes: [
    { label: "30", available: true },
    { label: "32", available: true },
    { label: "34", available: true },
    { label: "36", available: true },
  ],

  sizeChart: [
    { size: "30", waist: "30", length: "40" },
    { size: "32", waist: "32", length: "41" },
    { size: "34", waist: "34", length: "42" },
    { size: "36", waist: "36", length: "43" },
  ],

  trustBadges: [
    "Premium Comfort",
    "Elegant Styling",
    "Luxury Tailoring",
  ],

  details: [
    "Modern Fit",
    "Luxury Waist Design",
    "Premium Stitching",
  ],

  accordion: [
    {
      id: "desc",
      title: "Description",
      body: "Olive luxury Gurkha trousers crafted for modern elite styling.",
    },
    {
      id: "fabric",
      title: "Fabric",
      body: "Premium soft-touch fabric with elegant luxury finish.",
    },
  ],
},

{
  id: "Charcoal-Elite",

  category: "gurkha-trousers",

  name: "Charcoal Elite Gurkha",

  price: 3898,
  originalPrice: 5898,

  image: product4,

  subtitle: "Elite Collection",
  sku: "GTK-004",
  rating: 4.8,
  reviewCount: 136,
  stock: "in",

  description:
    "Charcoal elite Gurkha trousers designed for timeless luxury and modern elegance.",

  colors: [
    {
      id: "charcoal",
      label: "Charcoal Grey",
      hex: "#36454F",
      border: "#2C383F",
    },
    {
      id: "silver",
      label: "Silver Grey",
      hex: "#A9A9A9",
      border: "#8C8C8C",
    },
  ],

  imagesByColor: {
    charcoal: [product4, product5, product4],
    silver: [product5, product4, product5],
  },

  sizeOptions: ["30", "32", "34", "36"],

  sizes: [
    { label: "30", available: true },
    { label: "32", available: true },
    { label: "34", available: true },
    { label: "36", available: true },
  ],

  sizeChart: [
    { size: "30", waist: "30", length: "40" },
    { size: "32", waist: "32", length: "41" },
    { size: "34", waist: "34", length: "42" },
    { size: "36", waist: "36", length: "43" },
  ],

  trustBadges: [
    "Luxury Finish",
    "Tailored Comfort",
    "Elegant Styling",
  ],

  details: [
    "Imported Fabric",
    "Refined Waist Fit",
    "Premium Design",
  ],

  accordion: [
    {
      id: "desc",
      title: "Description",
      body: "Charcoal Gurkha trousers designed for refined formal elegance.",
    },
    {
      id: "fabric",
      title: "Fabric",
      body: "Luxury premium fabric with smooth finish and breathable comfort.",
    },
  ],
},

{
  id: "Sandstone-Royal",

  category: "gurkha-trousers",

  name: "Sandstone Royal Gurkha",

  price: 3598,
  originalPrice: 5498,

  image: product5,

  subtitle: "Royal Sand Collection",
  sku: "GTK-005",
  rating: 4.7,
  reviewCount: 99,
  stock: "in",

  description:
    "Sophisticated sandstone Gurkha trousers tailored for elegant modern fashion.",

  colors: [
    {
      id: "sand",
      label: "Sandstone Beige",
      hex: "#C2B280",
      border: "#A89666",
    },
    {
      id: "cream",
      label: "Royal Cream",
      hex: "#F5F5DC",
      border: "#D8D8C0",
    },
  ],

  imagesByColor: {
    sand: [product5, product6, product5],
    cream: [product6, product5, product6],
  },

  sizeOptions: ["30", "32", "34", "36"],

  sizes: [
    { label: "30", available: true },
    { label: "32", available: true },
    { label: "34", available: true },
    { label: "36", available: true },
  ],

  sizeChart: [
    { size: "30", waist: "30", length: "40" },
    { size: "32", waist: "32", length: "41" },
    { size: "34", waist: "34", length: "42" },
    { size: "36", waist: "36", length: "43" },
  ],

  trustBadges: [
    "Elegant Comfort",
    "Luxury Fabric",
    "Premium Stitching",
  ],

  details: [
    "Soft Tailoring",
    "Modern Waist Fit",
    "Imported Fabric",
  ],

  accordion: [
    {
      id: "desc",
      title: "Description",
      body: "Sandstone Gurkha trousers crafted for timeless premium elegance.",
    },
    {
      id: "fabric",
      title: "Fabric",
      body: "Smooth luxury fabric designed for comfort and elegant styling.",
    },
  ],
},

{
  id: "Emerald-Gurkha",

  category: "gurkha-trousers",

  name: "Emerald Green Gurkha",

  price: 4198,
  originalPrice: 6298,

  image: product6,

  subtitle: "Emerald Collection",
  sku: "GTK-006",
  rating: 4.9,
  reviewCount: 142,
  stock: "in",

  description:
    "Emerald green Gurkha trousers crafted for luxurious and bold fashion styling.",

  colors: [
    {
      id: "emerald",
      label: "Emerald Green",
      hex: "#046307",
      border: "#034A05",
    },
    {
      id: "black",
      label: "Classic Black",
      hex: "#000000",
      border: "#333333",
    },
  ],

  imagesByColor: {
    emerald: [product6, product7, product6],
    black: [product7, product6, product7],
  },

  sizeOptions: ["30", "32", "34", "36"],

  sizes: [
    { label: "30", available: true },
    { label: "32", available: true },
    { label: "34", available: true },
    { label: "36", available: true },
  ],

  sizeChart: [
    { size: "30", waist: "30", length: "40" },
    { size: "32", waist: "32", length: "41" },
    { size: "34", waist: "34", length: "42" },
    { size: "36", waist: "36", length: "43" },
  ],

  trustBadges: [
    "Luxury Tailoring",
    "Bold Fashion",
    "Premium Finish",
  ],

  details: [
    "Elite Styling",
    "Luxury Waist Design",
    "Elegant Fit",
  ],

  accordion: [
    {
      id: "desc",
      title: "Description",
      body: "Emerald green Gurkha trousers designed for bold luxury fashion.",
    },
    {
      id: "fabric",
      title: "Fabric",
      body: "Premium breathable fabric with smooth luxury finish.",
    },
  ],
},

{
  id: "Ivory-Signature",

  category: "gurkha-trousers",

  name: "Ivory Signature Gurkha",

  price: 4398,
  originalPrice: 6598,

  image: product7,

  subtitle: "Signature Collection",
  sku: "GTK-007",
  rating: 5.0,
  reviewCount: 155,
  stock: "in",

  description:
    "Luxury ivory Gurkha trousers designed for premium weddings and royal occasions.",

  colors: [
    {
      id: "ivory",
      label: "Royal Ivory",
      hex: "#FFFFF0",
      border: "#E8E8D0",
    },
    {
      id: "gold",
      label: "Luxury Gold",
      hex: "#D4AF37",
      border: "#B8942F",
    },
  ],

  imagesByColor: {
    ivory: [product7, product6, product7],
    gold: [product6, product7, product6],
  },

  sizeOptions: ["30", "32", "34", "36"],

  sizes: [
    { label: "30", available: true },
    { label: "32", available: true },
    { label: "34", available: true },
    { label: "36", available: true },
  ],

  sizeChart: [
    { size: "30", waist: "30", length: "40" },
    { size: "32", waist: "32", length: "41" },
    { size: "34", waist: "34", length: "42" },
    { size: "36", waist: "36", length: "43" },
  ],

  trustBadges: [
    "Royal Collection",
    "Luxury Tailoring",
    "Premium Finish",
  ],

  details: [
    "Wedding Styling",
    "Imported Luxury Fabric",
    "Elegant Gurkha Fit",
  ],

  accordion: [
    {
      id: "desc",
      title: "Description",
      body: "Ivory Gurkha trousers crafted for weddings and luxury celebrations.",
    },
    {
      id: "fabric",
      title: "Fabric",
      body: "Luxury imported fabric with elegant finish and breathable comfort.",
    },
  ],
},

  // ------------------Gurkha Trousers  Page ---------------------

  // ------------------Gurkha Trousers  Page ---------------------
  {
  id: "Ocean-Linen",

  category: "linen",

  name: "Ocean Blue Linen",

  price: 2898,
  originalPrice: 4298,

  image: product1,

  subtitle: "Ocean Collection",
  sku: "LIN-001",
  rating: 4.8,
  reviewCount: 118,
  stock: "in",

  description:
    "Premium ocean blue linen crafted for breathable comfort and timeless elegance.",

  colors: [
    {
      id: "blue",
      label: "Ocean Blue",
      hex: "#4F7CAC",
      border: "#3D6488",
    },
    {
      id: "white",
      label: "Pure White",
      hex: "#F5F5F5",
      border: "#DADADA",
    },
  ],

  imagesByColor: {
    blue: [product1, product2, product1],
    white: [product2, product1, product2],
  },

  sizeOptions: ["S", "M", "L", "XL"],

  sizes: [
    { label: "S", available: true },
    { label: "M", available: true },
    { label: "L", available: true },
    { label: "XL", available: true },
  ],

  sizeChart: [
    { size: "S", chest: "36", waist: "30", length: "27" },
    { size: "M", chest: "38", waist: "32", length: "28" },
    { size: "L", chest: "40", waist: "34", length: "29" },
    { size: "XL", chest: "42", waist: "36", length: "30" },
  ],

  trustBadges: [
    "Breathable Fabric",
    "Premium Linen",
    "Luxury Comfort",
  ],

  details: [
    "Soft Linen Weave",
    "Relaxed Tailoring",
    "Summer Collection",
  ],

  accordion: [
    {
      id: "desc",
      title: "Description",
      body: "Elegant ocean blue linen designed for premium summer styling.",
    },
    {
      id: "fabric",
      title: "Fabric",
      body: "Soft luxury linen crafted for comfort and breathable elegance.",
    },
  ],
},

{
  id: "Ivory-Linen",

  category: "linen",

  name: "Ivory Linen Classic",

  price: 3098,
  originalPrice: 4498,

  image: product2,

  subtitle: "Ivory Collection",
  sku: "LIN-002",
  rating: 4.9,
  reviewCount: 132,
  stock: "in",

  description:
    "Luxury ivory linen tailored for elegant casual and resort styling.",

  colors: [
    {
      id: "ivory",
      label: "Royal Ivory",
      hex: "#FFFFF0",
      border: "#E8E8D0",
    },
    {
      id: "beige",
      label: "Sand Beige",
      hex: "#D2B48C",
      border: "#B1906B",
    },
  ],

  imagesByColor: {
    ivory: [product2, product3, product2],
    beige: [product3, product2, product3],
  },

  sizeOptions: ["S", "M", "L", "XL"],

  sizes: [
    { label: "S", available: true },
    { label: "M", available: true },
    { label: "L", available: true },
    { label: "XL", available: true },
  ],

  sizeChart: [
    { size: "S", chest: "36", waist: "30", length: "27" },
    { size: "M", chest: "38", waist: "32", length: "28" },
    { size: "L", chest: "40", waist: "34", length: "29" },
    { size: "XL", chest: "42", waist: "36", length: "30" },
  ],

  trustBadges: [
    "Soft Luxury Linen",
    "Elegant Tailoring",
    "Premium Comfort",
  ],

  details: [
    "Resort Styling",
    "Breathable Fabric",
    "Luxury Finish",
  ],

  accordion: [
    {
      id: "desc",
      title: "Description",
      body: "Luxury ivory linen crafted for elegant summer sophistication.",
    },
  ],
},

{
  id: "Olive-Breeze",

  category: "linen",

  name: "Olive Breeze Linen",

  price: 3298,
  originalPrice: 4798,

  image: product3,

  subtitle: "Olive Collection",
  sku: "LIN-003",
  rating: 4.7,
  reviewCount: 101,
  stock: "in",

  description:
    "Sophisticated olive linen crafted for relaxed luxury styling.",

  colors: [
    {
      id: "olive",
      label: "Olive Green",
      hex: "#556B2F",
      border: "#445522",
    },
    {
      id: "black",
      label: "Jet Black",
      hex: "#000000",
      border: "#333333",
    },
  ],

  imagesByColor: {
    olive: [product3, product4, product3],
    black: [product4, product3, product4],
  },

  sizeOptions: ["S", "M", "L", "XL"],

  sizes: [
    { label: "S", available: true },
    { label: "M", available: true },
    { label: "L", available: true },
    { label: "XL", available: true },
  ],

  sizeChart: [
    { size: "S", chest: "36", waist: "30", length: "27" },
    { size: "M", chest: "38", waist: "32", length: "28" },
    { size: "L", chest: "40", waist: "34", length: "29" },
    { size: "XL", chest: "42", waist: "36", length: "30" },
  ],

  trustBadges: [
    "Modern Fit",
    "Breathable Linen",
    "Elegant Styling",
  ],

  details: [
    "Luxury Weave",
    "Premium Stitching",
    "Summer Collection",
  ],

  accordion: [
    {
      id: "desc",
      title: "Description",
      body: "Olive green linen tailored for sophisticated casual luxury.",
    },
  ],
},

{
  id: "Sandstone-Linen",

  category: "linen",

  name: "Sandstone Linen Shirt",

  price: 3398,
  originalPrice: 4998,

  image: product4,

  subtitle: "Sandstone Collection",
  sku: "LIN-004",
  rating: 4.8,
  reviewCount: 144,
  stock: "in",

  description:
    "Premium sandstone linen designed for timeless relaxed elegance.",

  colors: [
    {
      id: "sand",
      label: "Sandstone",
      hex: "#C2B280",
      border: "#A89666",
    },
    {
      id: "cream",
      label: "Royal Cream",
      hex: "#F5F5DC",
      border: "#D8D8C0",
    },
  ],

  imagesByColor: {
    sand: [product4, product5, product4],
    cream: [product5, product4, product5],
  },

  sizeOptions: ["S", "M", "L", "XL"],

  sizes: [
    { label: "S", available: true },
    { label: "M", available: true },
    { label: "L", available: true },
    { label: "XL", available: true },
  ],

  sizeChart: [
    { size: "S", chest: "36", waist: "30", length: "27" },
    { size: "M", chest: "38", waist: "32", length: "28" },
    { size: "L", chest: "40", waist: "34", length: "29" },
    { size: "XL", chest: "42", waist: "36", length: "30" },
  ],

  trustBadges: [
    "Luxury Linen",
    "Premium Comfort",
    "Elegant Finish",
  ],

  details: [
    "Relaxed Tailoring",
    "Premium Texture",
    "Modern Styling",
  ],

  accordion: [
    {
      id: "desc",
      title: "Description",
      body: "Sandstone linen tailored for premium modern elegance.",
    },
  ],
},

{
  id: "Ruby-Linen",

  category: "linen",

  name: "Ruby Red Linen",

  price: 3598,
  originalPrice: 5298,

  image: product5,

  subtitle: "Ruby Collection",
  sku: "LIN-005",
  rating: 4.9,
  reviewCount: 167,
  stock: "in",

  description:
    "Bold ruby red linen crafted for statement luxury styling.",

  colors: [
    {
      id: "ruby",
      label: "Ruby Red",
      hex: "#9B111E",
      border: "#7B0D18",
    },
    {
      id: "black",
      label: "Classic Black",
      hex: "#000000",
      border: "#333333",
    },
  ],

  imagesByColor: {
    ruby: [product5, product6, product5],
    black: [product6, product5, product6],
  },

  sizeOptions: ["S", "M", "L", "XL"],

  sizes: [
    { label: "S", available: true },
    { label: "M", available: true },
    { label: "L", available: true },
    { label: "XL", available: true },
  ],

  sizeChart: [
    { size: "S", chest: "36", waist: "30", length: "27" },
    { size: "M", chest: "38", waist: "32", length: "28" },
    { size: "L", chest: "40", waist: "34", length: "29" },
    { size: "XL", chest: "42", waist: "36", length: "30" },
  ],

  trustBadges: [
    "Premium Styling",
    "Luxury Finish",
    "Modern Elegance",
  ],

  details: [
    "Statement Fashion",
    "Luxury Texture",
    "Elite Tailoring",
  ],

  accordion: [
    {
      id: "desc",
      title: "Description",
      body: "Ruby red linen crafted for bold and sophisticated styling.",
    },
  ],
},

{
  id: "Emerald-Linen",

  category: "linen",

  name: "Emerald Luxury Linen",

  price: 3798,
  originalPrice: 5598,

  image: product6,

  subtitle: "Emerald Collection",
  sku: "LIN-006",
  rating: 5.0,
  reviewCount: 181,
  stock: "in",

  description:
    "Emerald green luxury linen crafted for premium resort elegance.",

  colors: [
    {
      id: "emerald",
      label: "Emerald Green",
      hex: "#046307",
      border: "#034A05",
    },
    {
      id: "white",
      label: "Pure White",
      hex: "#FFFFFF",
      border: "#DDDDDD",
    },
  ],

  imagesByColor: {
    emerald: [product6, product7, product6],
    white: [product7, product6, product7],
  },

  sizeOptions: ["S", "M", "L", "XL"],

  sizes: [
    { label: "S", available: true },
    { label: "M", available: true },
    { label: "L", available: true },
    { label: "XL", available: true },
  ],

  sizeChart: [
    { size: "S", chest: "36", waist: "30", length: "27" },
    { size: "M", chest: "38", waist: "32", length: "28" },
    { size: "L", chest: "40", waist: "34", length: "29" },
    { size: "XL", chest: "42", waist: "36", length: "30" },
  ],

  trustBadges: [
    "Premium Resort Wear",
    "Luxury Comfort",
    "Elegant Tailoring",
  ],

  details: [
    "Modern Fit",
    "Luxury Fabric",
    "Breathable Comfort",
  ],

  accordion: [
    {
      id: "desc",
      title: "Description",
      body: "Emerald luxury linen designed for premium summer styling.",
    },
  ],
},

{
  id: "Midnight-Linen",

  category: "linen",

  name: "Midnight Black Linen",

  price: 3998,
  originalPrice: 5898,

  image: product7,

  subtitle: "Midnight Collection",
  sku: "LIN-007",
  rating: 4.9,
  reviewCount: 190,
  stock: "in",

  description:
    "Sophisticated midnight black linen crafted for elite modern elegance.",

  colors: [
    {
      id: "midnight",
      label: "Midnight Black",
      hex: "#000000",
      border: "#222222",
    },
    {
      id: "grey",
      label: "Steel Grey",
      hex: "#5A5A5A",
      border: "#444444",
    },
  ],

  imagesByColor: {
    midnight: [product7, product1, product7],
    grey: [product1, product7, product1],
  },

  sizeOptions: ["S", "M", "L", "XL"],

  sizes: [
    { label: "S", available: true },
    { label: "M", available: true },
    { label: "L", available: true },
    { label: "XL", available: true },
  ],

  sizeChart: [
    { size: "S", chest: "36", waist: "30", length: "27" },
    { size: "M", chest: "38", waist: "32", length: "28" },
    { size: "L", chest: "40", waist: "34", length: "29" },
    { size: "XL", chest: "42", waist: "36", length: "30" },
  ],

  trustBadges: [
    "Elite Tailoring",
    "Luxury Styling",
    "Premium Linen",
  ],

  details: [
    "Modern Elegance",
    "Soft Luxury Fabric",
    "Premium Finish",
  ],

  accordion: [
    {
      id: "desc",
      title: "Description",
      body: "Midnight black linen tailored for timeless premium fashion.",
    },
  ],
},
  // ------------------Gurkha Trousers  Page ---------------------

  // ------------------88 Cigarette  Page ---------------------
    {
  id: "Classic-Gold",
  category: "cigarette",

  name: "88 Classic Gold",

  price: 2218,
  originalPrice: 3698,

  image: product1,

  subtitle: "Gold Collection",
  sku: "CIG-001",
  rating: 4.8,
  reviewCount: 142,
  stock: "in",

  description:
    "A rich and smooth premium blend crafted for timeless luxury lovers.",

  colors: [
    {
      id: "gold",
      label: "Classic Gold",
      hex: "#D4AF37",
      border: "#B9962F",
    },
    {
      id: "black",
      label: "Luxury Black",
      hex: "#000000",
      border: "#333333",
    },
  ],

  imagesByColor: {
    gold: [product1, product2, product1],
    black: [product2, product1, product2],
  },

  sizeOptions: ["Regular", "King"],

  sizes: [
    { label: "Regular", available: true },
    { label: "King", available: true },
  ],

  sizeChart: [
    { size: "Regular", chest: "-", waist: "-", length: "84mm" },
    { size: "King", chest: "-", waist: "-", length: "100mm" },
  ],

  trustBadges: [
    "Premium Blend",
    "Luxury Finish",
    "Smooth Experience",
  ],

  details: [
    "Rich Tobacco Flavor",
    "Luxury Packaging",
    "Classic Aroma",
  ],

  accordion: [
    {
      id: "desc",
      title: "Description",
      body: "Premium smooth cigarette crafted for refined smoking experiences.",
    },
  ],
},

{
  id: "Silver-Lights",
  category: "cigarette",

  name: "88 Silver Lights",

  price: 1898,
  originalPrice: 2998,

  image: product2,

  subtitle: "Silver Collection",
  sku: "CIG-002",
  rating: 4.6,
  reviewCount: 118,
  stock: "in",

  description:
    "A lighter refined blend delivering smoothness with modern elegance.",

  colors: [
    {
      id: "silver",
      label: "Silver Mist",
      hex: "#C0C0C0",
      border: "#9E9E9E",
    },
    {
      id: "blue",
      label: "Ice Blue",
      hex: "#6A8CAF",
      border: "#4E708F",
    },
  ],

  imagesByColor: {
    silver: [product2, product3, product2],
    blue: [product3, product2, product3],
  },

  sizeOptions: ["Regular", "King"],

  sizes: [
    { label: "Regular", available: true },
    { label: "King", available: true },
  ],

  sizeChart: [
    { size: "Regular", chest: "-", waist: "-", length: "84mm" },
    { size: "King", chest: "-", waist: "-", length: "100mm" },
  ],

  trustBadges: [
    "Light Blend",
    "Smooth Finish",
    "Premium Tobacco",
  ],

  details: [
    "Elegant Flavor",
    "Luxury Filter",
    "Smooth Draw",
  ],

  accordion: [
    {
      id: "desc",
      title: "Description",
      body: "Silver Lights delivers a clean and refreshing premium smoke.",
    },
  ],
},

{
  id: "Platinum-Menthol",
  category: "cigarette",

  name: "88 Platinum Menthol",

  price: 2498,
  originalPrice: 3898,

  image: product3,

  subtitle: "Menthol Collection",
  sku: "CIG-003",
  rating: 4.9,
  reviewCount: 166,
  stock: "in",

  description:
    "Refreshing menthol sensation blended with premium platinum smoothness.",

  colors: [
    {
      id: "mint",
      label: "Mint Green",
      hex: "#3EB489",
      border: "#2F8F6C",
    },
    {
      id: "silver",
      label: "Platinum Silver",
      hex: "#D9D9D9",
      border: "#B0B0B0",
    },
  ],

  imagesByColor: {
    mint: [product3, product4, product3],
    silver: [product4, product3, product4],
  },

  sizeOptions: ["Regular", "King"],

  sizes: [
    { label: "Regular", available: true },
    { label: "King", available: true },
  ],

  sizeChart: [
    { size: "Regular", chest: "-", waist: "-", length: "84mm" },
    { size: "King", chest: "-", waist: "-", length: "100mm" },
  ],

  trustBadges: [
    "Cooling Menthol",
    "Luxury Blend",
    "Smooth Finish",
  ],

  details: [
    "Mint Freshness",
    "Refined Taste",
    "Premium Tobacco",
  ],

  accordion: [
    {
      id: "desc",
      title: "Description",
      body: "Platinum Menthol delivers icy freshness with premium elegance.",
    },
  ],
},

{
  id: "Bold-Red",
  category: "cigarette",

  name: "88 Bold Red",

  price: 2698,
  originalPrice: 4198,

  image: product4,

  subtitle: "Bold Collection",
  sku: "CIG-004",
  rating: 4.7,
  reviewCount: 139,
  stock: "in",

  description:
    "Strong full-bodied flavor crafted for smokers who prefer intensity.",

  colors: [
    {
      id: "red",
      label: "Bold Red",
      hex: "#B22222",
      border: "#8B1A1A",
    },
    {
      id: "black",
      label: "Shadow Black",
      hex: "#111111",
      border: "#333333",
    },
  ],

  imagesByColor: {
    red: [product4, product5, product4],
    black: [product5, product4, product5],
  },

  sizeOptions: ["Regular", "King"],

  sizes: [
    { label: "Regular", available: true },
    { label: "King", available: true },
  ],

  sizeChart: [
    { size: "Regular", chest: "-", waist: "-", length: "84mm" },
    { size: "King", chest: "-", waist: "-", length: "100mm" },
  ],

  trustBadges: [
    "Bold Flavor",
    "Premium Strength",
    "Luxury Finish",
  ],

  details: [
    "Rich Tobacco",
    "Strong Aroma",
    "Premium Packaging",
  ],

  accordion: [
    {
      id: "desc",
      title: "Description",
      body: "Bold Red offers a powerful and luxurious smoking experience.",
    },
  ],
},

{
  id: "Smooth-Blue",
  category: "cigarette",

  name: "88 Smooth Blue",

  price: 2398,
  originalPrice: 3598,

  image: product5,

  subtitle: "Blue Collection",
  sku: "CIG-005",
  rating: 4.8,
  reviewCount: 151,
  stock: "in",

  description:
    "A perfectly balanced smooth blend with refined modern flavor.",

  colors: [
    {
      id: "blue",
      label: "Royal Blue",
      hex: "#4169E1",
      border: "#3151B5",
    },
    {
      id: "grey",
      label: "Smoke Grey",
      hex: "#708090",
      border: "#56616B",
    },
  ],

  imagesByColor: {
    blue: [product5, product6, product5],
    grey: [product6, product5, product6],
  },

  sizeOptions: ["Regular", "King"],

  sizes: [
    { label: "Regular", available: true },
    { label: "King", available: true },
  ],

  sizeChart: [
    { size: "Regular", chest: "-", waist: "-", length: "84mm" },
    { size: "King", chest: "-", waist: "-", length: "100mm" },
  ],

  trustBadges: [
    "Smooth Draw",
    "Premium Tobacco",
    "Balanced Flavor",
  ],

  details: [
    "Refined Blend",
    "Luxury Packaging",
    "Elegant Finish",
  ],

  accordion: [
    {
      id: "desc",
      title: "Description",
      body: "Smooth Blue delivers modern sophistication with every draw.",
    },
  ],
},

{
  id: "Deluxe-Black",
  category: "cigarette",

  name: "88 Deluxe Black",

  price: 3198,
  originalPrice: 4798,

  image: product6,

  subtitle: "Black Collection",
  sku: "CIG-006",
  rating: 5.0,
  reviewCount: 208,
  stock: "in",

  description:
    "Premium deluxe blend crafted for luxury and deep rich flavor.",

  colors: [
    {
      id: "black",
      label: "Deluxe Black",
      hex: "#000000",
      border: "#2A2A2A",
    },
    {
      id: "gold",
      label: "Luxury Gold",
      hex: "#D4AF37",
      border: "#A98B2C",
    },
  ],

  imagesByColor: {
    black: [product6, product7, product6],
    gold: [product7, product6, product7],
  },

  sizeOptions: ["Regular", "King"],

  sizes: [
    { label: "Regular", available: true },
    { label: "King", available: true },
  ],

  sizeChart: [
    { size: "Regular", chest: "-", waist: "-", length: "84mm" },
    { size: "King", chest: "-", waist: "-", length: "100mm" },
  ],

  trustBadges: [
    "Luxury Blend",
    "Deep Flavor",
    "Elite Packaging",
  ],

  details: [
    "Strong Finish",
    "Premium Tobacco",
    "Luxury Experience",
  ],

  accordion: [
    {
      id: "desc",
      title: "Description",
      body: "Deluxe Black is crafted for elite smokers who prefer rich luxury.",
    },
  ],
},

{
  id: "Menthol-Ice",
  category: "cigarette",

  name: "88 Menthol Ice",

  price: 2798,
  originalPrice: 4098,

  image: product7,

  subtitle: "Ice Collection",
  sku: "CIG-007",
  rating: 4.9,
  reviewCount: 177,
  stock: "in",

  description:
    "Ultra-cooling menthol blend with refreshing icy aftertaste.",

  colors: [
    {
      id: "ice",
      label: "Menthol Ice",
      hex: "#00CED1",
      border: "#009EA1",
    },
    {
      id: "white",
      label: "Frozen White",
      hex: "#F5FFFF",
      border: "#D6EDED",
    },
  ],

  imagesByColor: {
    ice: [product7, product1, product7],
    white: [product1, product7, product1],
  },

  sizeOptions: ["Regular", "King"],

  sizes: [
    { label: "Regular", available: true },
    { label: "King", available: true },
  ],

  sizeChart: [
    { size: "Regular", chest: "-", waist: "-", length: "84mm" },
    { size: "King", chest: "-", waist: "-", length: "100mm" },
  ],

  trustBadges: [
    "Refreshing Menthol",
    "Cooling Blend",
    "Luxury Finish",
  ],

  details: [
    "Icy Freshness",
    "Smooth Draw",
    "Premium Packaging",
  ],

  accordion: [
    {
      id: "desc",
      title: "Description",
      body: "Menthol Ice delivers refreshing coolness with luxury smoothness.",
    },
  ],
},
  // ------------------88 Cigarette  Page ---------------------

];

// import product1 from "../assets/images/SangeetBlue.jpg";

// export const products = [
//   {
//     id: 1,

//     name: "88 Classic Gold",

//     price: 2218,
//     originalPrice: 3698,

//     image: product1,

//     subtitle: "Luxury Tuxedo",

//     sku: "TXD-001",

//     rating: 4.8,

//     reviewCount: 120,

//     stock: "in",

//     description:
//       "Luxury premium tuxedo crafted for elite occasions.",

//     colors: [
//       {
//         id: "black",
//         label: "Classic Black",
//         hex: "#000000",
//         border: "#333333",
//       },
//     ],

//     imagesByColor: {
//       black: [
//         product1,
//         product1,
//         product1,
//       ],
//     },

//     sizeOptions: ["S", "M", "L", "XL"],

//     sizes: [
//       { label: "S", available: true },
//       { label: "M", available: true },
//       { label: "L", available: true },
//       { label: "XL", available: true },
//     ],

//     sizeChart: [
//       { size: "S", chest: "36", waist: "30", length: "26" },
//       { size: "M", chest: "38", waist: "32", length: "27" },
//       { size: "L", chest: "40", waist: "34", length: "28" },
//       { size: "XL", chest: "42", waist: "36", length: "29" },
//     ],

//     trustBadges: [
//       "Premium Fabric",
//       "Luxury Finish",
//       "Wedding Collection",
//     ],

//     details: [
//       "Imported Fabric",
//       "Tailored Fit",
//       "Elegant Finish",
//     ],

//     accordion: [
//       {
//         id: "desc",
//         title: "Description",
//         body: "Luxury tuxedo designed for weddings and elite events.",
//       },
//       {
//         id: "fabric",
//         title: "Fabric",
//         body: "Premium imported luxury fabric with elegant finish.",
//       },
//     ],
//   },
// ];
