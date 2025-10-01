import { CartItemType, ProductType } from "../types";
import { Footprints, Glasses, Briefcase, Shirt, ShoppingBasket, Hand, Venus } from "lucide-react";

export const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/contact", label: "Contact" },
  { href: "/terms-of-service", label: "Terms of Service" },
  { href: "/privacy-policy", label: "Privacy Policy" },
];

export const footerLinksProduct = [
  { href: "/products", label: "All Products" },
  { href: "/new-arrivals", label: "New Arrivals" },
  { href: "/best-sellers", label: "Best Sellers" },
  { href: "/sales", label: "Sales" },
];

export const footerLinksCompany = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
  { href: "/affiliate-program", label: "Affiliate Program" },
];

export const categories = [
  {
    name: "All",
    icon: ShoppingBasket,
    slug: "all",
  },
  {
    name: "T-shirts",
    icon: Shirt,
    slug: "t-shirts",
  },
  {
    name: "Shoes",
    icon: Footprints,
    slug: "shoes",
  },
  {
    name: "Accessories",
    icon: Glasses,
    slug: "accessories",
  },
  {
    name: "Bags",
    icon: Briefcase,
    slug: "bags",
  },
  {
    name: "Dresses",
    icon: Venus,
    slug: "dresses",
  },
  {
    name: "Jackets",
    icon: Shirt,
    slug: "jackets",
  },
  {
    name: "Gloves",
    icon: Hand,
    slug: "gloves",
  },
];

export const filters = [
  { label: "News", value: "news" },
  { label: "Oldest", value: "oldest" },
  { label: "Price: Low to Hight", value: "asc" },
  { label: "Price: High to Low", value: "desc" },
];

export const cardPayment = [
  {
    label: "Klarna",
    icon: "/klarna.png",
  },
  {
    label: "Cards",
    icon: "/cards.png",
  },
  {
    label: "Stripe",
    icon: "/stripe.png",
  },
];

export const stepsMenu = [
  {
    id: 1,
    title: "Shopping Cart",
  },
  {
    id: 2,
    title: "Shipping Address",
  },
  {
    id: 3,
    title: "Payment Method",
  },
];

export const products: ProductType[] = [
  {
    id: 1,
    name: "Adidas CoreFit T-Shirt",
    shortDescription: "Classic fit t-shirt for everyday comfort",
    description: "Made from 100% organic cotton with premium stitching. Machine washable. Imported.",
    basePrice: 39.9,
    variants: [
      // Gray variants
      { size: "s", color: "gray", stock: 15, price: 39.9 },
      { size: "m", color: "gray", stock: 8, price: 39.9 },
      { size: "l", color: "gray", stock: 12, price: 39.9 },
      { size: "xl", color: "gray", stock: 5, price: 42.9 },
      { size: "xxl", color: "gray", stock: 5, price: 42.9 },

      // Purple variants
      { size: "s", color: "purple", stock: 10, price: 39.9 },
      { size: "m", color: "purple", stock: 6, price: 39.9 },
      { size: "l", color: "purple", stock: 4, price: 39.9 },
      { size: "xl", color: "purple", stock: 2, price: 42.9 },
      { size: "xxl", color: "purple", stock: 0, price: 42.9 },

      // Green variants
      { size: "s", color: "green", stock: 12, price: 39.9 },
      { size: "m", color: "green", stock: 9, price: 39.9 },
      { size: "l", color: "green", stock: 7, price: 39.9 },
      { size: "xl", color: "green", stock: 3, price: 42.9 },
      { size: "xxl", color: "green", stock: 5, price: 42.9 },
    ],
    availableSizes: ["s", "m", "l", "xl", "xxl"],
    availableColors: ["gray", "purple", "green"],
    avaliableimages: {
      gray: "/products/1g.png",
      purple: "/products/1p.png",
      green: "/products/1gr.png",
    },
  },
  {
    id: 2,
    name: "Puma Ultra Warm Zip",
    shortDescription: "Lightweight zip jacket for cold weather",
    description: "Water-resistant outer shell with fleece lining. Front zip closure with chin guard.",
    basePrice: 59.9,
    variants: [
      // Gray variants
      { size: "s", color: "gray", stock: 5, price: 59.9 },
      { size: "m", color: "gray", stock: 3, price: 59.9 },
      { size: "l", color: "gray", stock: 2, price: 59.9 },
      { size: "xl", color: "gray", stock: 0, price: 62.9 },

      // Green variants
      { size: "s", color: "green", stock: 7, price: 59.9 },
      { size: "m", color: "green", stock: 0, price: 59.9 },
      { size: "l", color: "green", stock: 4, price: 59.9 },
      { size: "xl", color: "green", stock: 1, price: 62.9 },
    ],
    availableSizes: ["s", "m", "l", "xl"],
    availableColors: ["gray", "green"],
    avaliableimages: { gray: "/products/2g.png", green: "/products/2gr.png" },
  },
  {
    id: 3,
    name: "Nike Air Essentials Pullover",
    shortDescription: "Lightweight hoodie for casual wear",
    description: "Brushed fleece interior with adjustable drawstring hood. Kangaroo pocket.",
    basePrice: 69.9,
    variants: [
      // Green variants
      { size: "s", color: "green", stock: 8, price: 69.9 },
      { size: "m", color: "green", stock: 5, price: 69.9 },
      { size: "l", color: "green", stock: 3, price: 69.9 },

      // Blue variants
      { size: "s", color: "blue", stock: 6, price: 69.9 },
      { size: "m", color: "blue", stock: 4, price: 69.9 },
      { size: "l", color: "blue", stock: 2, price: 69.9 },

      // Black variants
      { size: "s", color: "black", stock: 10, price: 69.9 },
      { size: "m", color: "black", stock: 7, price: 69.9 },
      { size: "l", color: "black", stock: 5, price: 69.9 },
    ],
    availableSizes: ["s", "m", "l"],
    availableColors: ["green", "blue", "black"],
    avaliableimages: {
      green: "/products/3gr.png",
      blue: "/products/3b.png",
      black: "/products/3bl.png",
    },
  },
  {
    id: 4,
    name: "Nike Dri-FIT T-Shirt",
    shortDescription: "Moisture-wicking performance tee",
    description: "Dri-FIT technology keeps you dry and comfortable. Raglan sleeves for mobility.",
    basePrice: 29.9,
    variants: [
      // White variants
      { size: "s", color: "white", stock: 20, price: 29.9 },
      { size: "m", color: "white", stock: 15, price: 29.9 },
      { size: "l", color: "white", stock: 10, price: 29.9 },

      // Pink variants
      { size: "s", color: "pink", stock: 12, price: 29.9 },
      { size: "m", color: "pink", stock: 8, price: 29.9 },
      { size: "l", color: "pink", stock: 5, price: 29.9 },
    ],
    availableSizes: ["s", "m", "l"],
    availableColors: ["white", "pink"],
    avaliableimages: { white: "/products/4w.png", pink: "/products/4p.png" },
  },
  {
    id: 5,
    name: "Under Armour StormFleece",
    shortDescription: "ColdGear infrared fleece jacket",
    description: "Storm technology repels water while remaining breathable. Anti-odor technology.",
    basePrice: 49.9,
    variants: [
      // Red variants
      { size: "s", color: "red", stock: 6, price: 49.9 },
      { size: "m", color: "red", stock: 4, price: 49.9 },
      { size: "l", color: "red", stock: 2, price: 49.9 },

      // Orange variants
      { size: "s", color: "orange", stock: 8, price: 49.9 },
      { size: "m", color: "orange", stock: 5, price: 49.9 },
      { size: "l", color: "orange", stock: 3, price: 49.9 },

      // Black variants
      { size: "s", color: "black", stock: 10, price: 49.9 },
      { size: "m", color: "black", stock: 7, price: 49.9 },
      { size: "l", color: "black", stock: 4, price: 49.9 },
    ],
    availableSizes: ["s", "m", "l"],
    availableColors: ["red", "orange", "black"],
    avaliableimages: {
      red: "/products/5r.png",
      orange: "/products/5o.png",
      black: "/products/5bl.png",
    },
  },
  {
    id: 6,
    name: "Nike Air Max 270",
    shortDescription: "Iconic Air Max cushioning",
    description: "Max Air unit for all-day comfort. Breathable mesh upper. Rubber outsole.",
    basePrice: 59.9,
    variants: [
      // Gray variants (shoe sizes)
      { size: "40", color: "gray", stock: 4, price: 59.9 },
      { size: "42", color: "gray", stock: 3, price: 59.9 },
      { size: "43", color: "gray", stock: 2, price: 59.9 },
      { size: "44", color: "gray", stock: 1, price: 59.9 },

      // White variants
      { size: "40", color: "white", stock: 5, price: 59.9 },
      { size: "42", color: "white", stock: 4, price: 59.9 },
      { size: "43", color: "white", stock: 0, price: 59.9 },
      { size: "44", color: "white", stock: 2, price: 59.9 },
    ],
    availableSizes: ["40", "42", "43", "44"],
    availableColors: ["gray", "white"],
    avaliableimages: { gray: "/products/6g.png", white: "/products/6w.png" },
  },
  {
    id: 7,
    name: "Nike Ultraboost Pulse",
    shortDescription: "Responsive running shoes",
    description: "Boost midsole for energy return. Stretchweb outsole flexes naturally.",
    basePrice: 69.9,
    variants: [
      // Gray variants
      { size: "40", color: "gray", stock: 3, price: 69.9 },
      { size: "42", color: "gray", stock: 2, price: 69.9 },
      { size: "43", color: "gray", stock: 1, price: 69.9 },

      // Pink variants
      { size: "40", color: "pink", stock: 5, price: 69.9 },
      { size: "42", color: "pink", stock: 3, price: 69.9 },
      { size: "43", color: "pink", stock: 0, price: 69.9 },
    ],
    availableSizes: ["40", "42", "43"],
    availableColors: ["gray", "pink"],
    avaliableimages: { gray: "/products/7g.png", pink: "/products/7p.png" },
  },
  {
    id: 8,
    name: "Levi's Classic Denim",
    shortDescription: "Straight fit denim jeans",
    description: "Classic 5-pocket design. Mid-rise waist. Zip fly with button closure.",
    basePrice: 59.9,
    variants: [
      // Blue variants
      { size: "s", color: "blue", stock: 7, price: 59.9 },
      { size: "m", color: "blue", stock: 5, price: 59.9 },
      { size: "l", color: "blue", stock: 3, price: 59.9 },

      // Green variants
      { size: "s", color: "green", stock: 4, price: 59.9 },
      { size: "m", color: "green", stock: 2, price: 59.9 },
      { size: "l", color: "green", stock: 1, price: 59.9 },
    ],
    availableSizes: ["s", "m", "l"],
    availableColors: ["blue", "green"],
    avaliableimages: { blue: "/products/8b.png", green: "/products/8gr.png" },
  },
];

export const cartItems: CartItemType[] = [
  {
    id: 1,
    variantId: "1-m-gray",
    name: "Adidas CoreFit T-Shirt",
    shortDescription: "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    description:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    basePrice: 39.9,
    availableSizes: ["s", "m", "l"],
    availableColors: ["gray", "purple", "green"],
    avaliableimages: {
      gray: "/products/1g.png",
      purple: "/products/1p.png",
      green: "/products/1gr.png",
    },
    quantity: 1,
    selectedSize: "m",
    selectedColor: "gray",
    variantPrice: 39.9,
    maxStock: 15, // Example stock value from product variants
    remainingStock: 14, // maxStock - quantity
  },
  {
    id: 2,
    variantId: "2-l-gray",
    name: "Puma Ultra Warm Zip",
    shortDescription: "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    description:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    basePrice: 59.9,
    availableSizes: ["s", "m", "l", "xl"],
    availableColors: ["gray", "green"],
    avaliableimages: { gray: "/products/2g.png", green: "/products/2gr.png" },
    quantity: 1,
    selectedSize: "l",
    selectedColor: "gray",
    variantPrice: 59.9,
    maxStock: 6, // Example stock value from product variants
    remainingStock: 5, // maxStock - quantity
  },
  {
    id: 3,
    variantId: "3-l-black",
    name: "Nike Air Essentials Pullover",
    shortDescription: "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    description:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    basePrice: 69.9,
    availableSizes: ["s", "m", "l"],
    availableColors: ["green", "blue", "black"],
    avaliableimages: {
      green: "/products/3gr.png",
      blue: "/products/3b.png",
      black: "/products/3bl.png",
    },
    quantity: 1,
    selectedSize: "l",
    selectedColor: "black",
    variantPrice: 69.9,
    maxStock: 6, // Example stock value from product variants
    remainingStock: 5, // maxStock - quantity
  },
];
