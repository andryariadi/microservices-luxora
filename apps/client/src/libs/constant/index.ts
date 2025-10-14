// import { CartItemType, ProductType } from "../types";
import { CartItemType, ProductType } from "@repo/types";
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
    id: "1",
    name: "Adidas CoreFit T-Shirt",
    shortDescription: "Classic fit t-shirt for everyday comfort",
    description: "Made from 100% organic cotton with premium stitching. Machine washable. Imported.",
    basePrice: 3990,
    categorySlug: "t-shirts",
    availableSizes: ["s", "m", "l", "xl", "xxl"],
    availableColors: ["gray", "purple", "green"],
    availableImages: {
      gray: "/products/1g.png",
      purple: "/products/1p.png",
      green: "/products/1gr.png",
    },
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
    variants: [
      { id: "1-1", size: "s", color: "gray", stock: 15, price: 3990, productId: "1" },
      { id: "1-2", size: "m", color: "gray", stock: 8, price: 3990, productId: "1" },
      { id: "1-3", size: "l", color: "gray", stock: 12, price: 3990, productId: "1" },
      { id: "1-4", size: "xl", color: "gray", stock: 5, price: 4290, productId: "1" },
      { id: "1-5", size: "xxl", color: "gray", stock: 5, price: 4290, productId: "1" },
      { id: "1-6", size: "s", color: "purple", stock: 10, price: 3990, productId: "1" },
      { id: "1-7", size: "m", color: "purple", stock: 6, price: 3990, productId: "1" },
      { id: "1-8", size: "l", color: "purple", stock: 4, price: 3990, productId: "1" },
      { id: "1-9", size: "xl", color: "purple", stock: 2, price: 4290, productId: "1" },
      { id: "1-10", size: "xxl", color: "purple", stock: 0, price: 4290, productId: "1" },
      { id: "1-11", size: "s", color: "green", stock: 12, price: 3990, productId: "1" },
      { id: "1-12", size: "m", color: "green", stock: 9, price: 3990, productId: "1" },
      { id: "1-13", size: "l", color: "green", stock: 7, price: 3990, productId: "1" },
      { id: "1-14", size: "xl", color: "green", stock: 3, price: 4290, productId: "1" },
      { id: "1-15", size: "xxl", color: "green", stock: 5, price: 4290, productId: "1" },
    ],
  },
  {
    id: "2",
    name: "Puma Ultra Warm Zip",
    shortDescription: "Lightweight zip jacket for cold weather",
    description: "Water-resistant outer shell with fleece lining. Front zip closure with chin guard.",
    basePrice: 5990,
    categorySlug: "jackets",
    availableSizes: ["s", "m", "l", "xl"],
    availableColors: ["gray", "green"],
    availableImages: {
      gray: "/products/2g.png",
      green: "/products/2gr.png",
    },
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
    variants: [
      { id: "2-1", size: "s", color: "gray", stock: 5, price: 5990, productId: "2" },
      { id: "2-2", size: "m", color: "gray", stock: 3, price: 5990, productId: "2" },
      { id: "2-3", size: "l", color: "gray", stock: 2, price: 5990, productId: "2" },
      { id: "2-4", size: "xl", color: "gray", stock: 0, price: 6290, productId: "2" },
      { id: "2-5", size: "s", color: "green", stock: 7, price: 5990, productId: "2" },
      { id: "2-6", size: "m", color: "green", stock: 0, price: 5990, productId: "2" },
      { id: "2-7", size: "l", color: "green", stock: 4, price: 5990, productId: "2" },
      { id: "2-8", size: "xl", color: "green", stock: 1, price: 6290, productId: "2" },
    ],
  },
  {
    id: "3",
    name: "Nike Air Essentials Pullover",
    shortDescription: "Lightweight hoodie for casual wear",
    description: "Brushed fleece interior with adjustable drawstring hood. Kangaroo pocket.",
    basePrice: 6990,
    categorySlug: "hoodies",
    availableSizes: ["s", "m", "l"],
    availableColors: ["green", "blue", "black"],
    availableImages: {
      green: "/products/3gr.png",
      blue: "/products/3b.png",
      black: "/products/3bl.png",
    },
    createdAt: new Date("2024-02-05"),
    updatedAt: new Date("2024-02-05"),
    variants: [
      { id: "3-1", size: "s", color: "green", stock: 8, price: 6990, productId: "3" },
      { id: "3-2", size: "m", color: "green", stock: 5, price: 6990, productId: "3" },
      { id: "3-3", size: "l", color: "green", stock: 3, price: 6990, productId: "3" },
      { id: "3-4", size: "s", color: "blue", stock: 6, price: 6990, productId: "3" },
      { id: "3-5", size: "m", color: "blue", stock: 4, price: 6990, productId: "3" },
      { id: "3-6", size: "l", color: "blue", stock: 2, price: 6990, productId: "3" },
      { id: "3-7", size: "s", color: "black", stock: 10, price: 6990, productId: "3" },
      { id: "3-8", size: "m", color: "black", stock: 7, price: 6990, productId: "3" },
      { id: "3-9", size: "l", color: "black", stock: 5, price: 6990, productId: "3" },
    ],
  },
  {
    id: "4",
    name: "Nike Dri-FIT T-Shirt",
    shortDescription: "Moisture-wicking performance tee",
    description: "Dri-FIT technology keeps you dry and comfortable. Raglan sleeves for mobility.",
    basePrice: 2990,
    categorySlug: "sports-t-shirts",
    availableSizes: ["s", "m", "l"],
    availableColors: ["white", "pink"],
    availableImages: {
      white: "/products/4w.png",
      pink: "/products/4p.png",
    },
    createdAt: new Date("2024-02-10"),
    updatedAt: new Date("2024-02-10"),
    variants: [
      { id: "4-1", size: "s", color: "white", stock: 20, price: 2990, productId: "4" },
      { id: "4-2", size: "m", color: "white", stock: 15, price: 2990, productId: "4" },
      { id: "4-3", size: "l", color: "white", stock: 10, price: 2990, productId: "4" },
      { id: "4-4", size: "s", color: "pink", stock: 12, price: 2990, productId: "4" },
      { id: "4-5", size: "m", color: "pink", stock: 8, price: 2990, productId: "4" },
      { id: "4-6", size: "l", color: "pink", stock: 5, price: 2990, productId: "4" },
    ],
  },
  {
    id: "5",
    name: "Under Armour StormFleece",
    shortDescription: "ColdGear infrared fleece jacket",
    description: "Storm technology repels water while remaining breathable. Anti-odor technology.",
    basePrice: 4990,
    categorySlug: "fleece-jackets",
    availableSizes: ["s", "m", "l"],
    availableColors: ["red", "orange", "black"],
    availableImages: {
      red: "/products/5r.png",
      orange: "/products/5o.png",
      black: "/products/5bl.png",
    },
    createdAt: new Date("2024-02-15"),
    updatedAt: new Date("2024-02-15"),
    variants: [
      { id: "5-1", size: "s", color: "red", stock: 6, price: 4990, productId: "5" },
      { id: "5-2", size: "m", color: "red", stock: 4, price: 4990, productId: "5" },
      { id: "5-3", size: "l", color: "red", stock: 2, price: 4990, productId: "5" },
      { id: "5-4", size: "s", color: "orange", stock: 8, price: 4990, productId: "5" },
      { id: "5-5", size: "m", color: "orange", stock: 5, price: 4990, productId: "5" },
      { id: "5-6", size: "l", color: "orange", stock: 3, price: 4990, productId: "5" },
      { id: "5-7", size: "s", color: "black", stock: 10, price: 4990, productId: "5" },
      { id: "5-8", size: "m", color: "black", stock: 7, price: 4990, productId: "5" },
      { id: "5-9", size: "l", color: "black", stock: 4, price: 4990, productId: "5" },
    ],
  },
  {
    id: "6",
    name: "Nike Air Max 270",
    shortDescription: "Iconic Air Max cushioning",
    description: "Max Air unit for all-day comfort. Breathable mesh upper. Rubber outsole.",
    basePrice: 5990,
    categorySlug: "shoes",
    availableSizes: ["40", "42", "43", "44"],
    availableColors: ["gray", "white"],
    availableImages: {
      gray: "/products/6g.png",
      white: "/products/6w.png",
    },
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2024-03-01"),
    variants: [
      { id: "6-1", size: "40", color: "gray", stock: 4, price: 5990, productId: "6" },
      { id: "6-2", size: "42", color: "gray", stock: 3, price: 5990, productId: "6" },
      { id: "6-3", size: "43", color: "gray", stock: 2, price: 5990, productId: "6" },
      { id: "6-4", size: "44", color: "gray", stock: 1, price: 5990, productId: "6" },
      { id: "6-5", size: "40", color: "white", stock: 5, price: 5990, productId: "6" },
      { id: "6-6", size: "42", color: "white", stock: 4, price: 5990, productId: "6" },
      { id: "6-7", size: "43", color: "white", stock: 0, price: 5990, productId: "6" },
      { id: "6-8", size: "44", color: "white", stock: 2, price: 5990, productId: "6" },
    ],
  },
  {
    id: "7",
    name: "Nike Ultraboost Pulse",
    shortDescription: "Responsive running shoes",
    description: "Boost midsole for energy return. Stretchweb outsole flexes naturally.",
    basePrice: 6990,
    categorySlug: "running-shoes",
    availableSizes: ["40", "42", "43"],
    availableColors: ["gray", "pink"],
    availableImages: {
      gray: "/products/7g.png",
      pink: "/products/7p.png",
    },
    createdAt: new Date("2024-03-05"),
    updatedAt: new Date("2024-03-05"),
    variants: [
      { id: "7-1", size: "40", color: "gray", stock: 3, price: 6990, productId: "7" },
      { id: "7-2", size: "42", color: "gray", stock: 2, price: 6990, productId: "7" },
      { id: "7-3", size: "43", color: "gray", stock: 1, price: 6990, productId: "7" },
      { id: "7-4", size: "40", color: "pink", stock: 5, price: 6990, productId: "7" },
      { id: "7-5", size: "42", color: "pink", stock: 3, price: 6990, productId: "7" },
      { id: "7-6", size: "43", color: "pink", stock: 0, price: 6990, productId: "7" },
    ],
  },
  {
    id: "8",
    name: "Levi's Classic Denim",
    shortDescription: "Straight fit denim jeans",
    description: "Classic 5-pocket design. Mid-rise waist. Zip fly with button closure.",
    basePrice: 5990,
    categorySlug: "jeans",
    availableSizes: ["s", "m", "l"],
    availableColors: ["blue", "green"],
    availableImages: {
      blue: "/products/8b.png",
      green: "/products/8gr.png",
    },
    createdAt: new Date("2024-03-10"),
    updatedAt: new Date("2024-03-10"),
    variants: [
      { id: "8-1", size: "s", color: "blue", stock: 7, price: 5990, productId: "8" },
      { id: "8-2", size: "m", color: "blue", stock: 5, price: 5990, productId: "8" },
      { id: "8-3", size: "l", color: "blue", stock: 3, price: 5990, productId: "8" },
      { id: "8-4", size: "s", color: "green", stock: 4, price: 5990, productId: "8" },
      { id: "8-5", size: "m", color: "green", stock: 2, price: 5990, productId: "8" },
      { id: "8-6", size: "l", color: "green", stock: 1, price: 5990, productId: "8" },
    ],
  },
];

export const cartItems: CartItemType[] = [
  {
    id: "1",
    variantId: "1-2", // Sesuai dengan ID variant dari products data
    name: "Adidas CoreFit T-Shirt",
    shortDescription: "Classic fit t-shirt for everyday comfort",
    description: "Made from 100% organic cotton with premium stitching. Machine washable. Imported.",
    basePrice: 3990, // ✅ Diubah ke integer (cents)
    categorySlug: "t-shirts", // ✅ Ditambahkan
    availableSizes: ["s", "m", "l", "xl", "xxl"],
    availableColors: ["gray", "purple", "green"],
    availableImages: {
      // ✅ Diperbaiki typo: avaliableimages → availableImages
      gray: "/products/1g.png",
      purple: "/products/1p.png",
      green: "/products/1gr.png",
    },
    createdAt: new Date("2024-01-15"), // ✅ Ditambahkan
    updatedAt: new Date("2024-01-15"), // ✅ Ditambahkan
    quantity: 1,
    selectedSize: "m",
    selectedColor: "gray",
    variantPrice: 3990, // ✅ Diubah ke integer (cents)
    maxStock: 8, // Sesuai dengan stock dari variant ID "1-2"
    remainingStock: 7, // maxStock - quantity
  },
  {
    id: "2",
    variantId: "2-3", // Sesuai dengan ID variant dari products data
    name: "Puma Ultra Warm Zip",
    shortDescription: "Lightweight zip jacket for cold weather",
    description: "Water-resistant outer shell with fleece lining. Front zip closure with chin guard.",
    basePrice: 5990, // ✅ Diubah ke integer (cents)
    categorySlug: "jackets", // ✅ Ditambahkan
    availableSizes: ["s", "m", "l", "xl"],
    availableColors: ["gray", "green"],
    availableImages: {
      // ✅ Diperbaiki typo
      gray: "/products/2g.png",
      green: "/products/2gr.png",
    },
    createdAt: new Date("2024-01-20"), // ✅ Ditambahkan
    updatedAt: new Date("2024-01-20"), // ✅ Ditambahkan
    quantity: 1,
    selectedSize: "l",
    selectedColor: "gray",
    variantPrice: 5990, // ✅ Diubah ke integer (cents)
    maxStock: 2, // Sesuai dengan stock dari variant ID "2-3"
    remainingStock: 1, // maxStock - quantity
  },
  {
    id: "3",
    variantId: "3-9", // Sesuai dengan ID variant dari products data
    name: "Nike Air Essentials Pullover",
    shortDescription: "Lightweight hoodie for casual wear",
    description: "Brushed fleece interior with adjustable drawstring hood. Kangaroo pocket.",
    basePrice: 6990, // ✅ Diubah ke integer (cents)
    categorySlug: "hoodies", // ✅ Ditambahkan
    availableSizes: ["s", "m", "l"],
    availableColors: ["green", "blue", "black"],
    availableImages: {
      // ✅ Diperbaiki typo
      green: "/products/3gr.png",
      blue: "/products/3b.png",
      black: "/products/3bl.png",
    },
    createdAt: new Date("2024-02-05"), // ✅ Ditambahkan
    updatedAt: new Date("2024-02-05"), // ✅ Ditambahkan
    quantity: 1,
    selectedSize: "l",
    selectedColor: "black",
    variantPrice: 6990, // ✅ Diubah ke integer (cents)
    maxStock: 5, // Sesuai dengan stock dari variant ID "3-9"
    remainingStock: 4, // maxStock - quantity
  },
  {
    id: "6",
    variantId: "6-5", // Sesuai dengan ID variant dari products data
    name: "Nike Air Max 270",
    shortDescription: "Iconic Air Max cushioning",
    description: "Max Air unit for all-day comfort. Breathable mesh upper. Rubber outsole.",
    basePrice: 5990, // ✅ Diubah ke integer (cents)
    categorySlug: "shoes", // ✅ Ditambahkan
    availableSizes: ["40", "42", "43", "44"],
    availableColors: ["gray", "white"],
    availableImages: {
      // ✅ Diperbaiki typo
      gray: "/products/6g.png",
      white: "/products/6w.png",
    },
    createdAt: new Date("2024-03-01"), // ✅ Ditambahkan
    updatedAt: new Date("2024-03-01"), // ✅ Ditambahkan
    quantity: 2,
    selectedSize: "40",
    selectedColor: "white",
    variantPrice: 5990, // ✅ Diubah ke integer (cents)
    maxStock: 5, // Sesuai dengan stock dari variant ID "6-5"
    remainingStock: 3, // maxStock - quantity
  },
  {
    id: "9",
    variantId: "9-7", // Sesuai dengan ID variant dari products data
    name: "Adidas Ultraboost 5.0 DNA",
    shortDescription: "Premium running shoes with Boost technology",
    description: "Responsive cushioning with Primeknit upper. Continental rubber outsole for traction.",
    basePrice: 7990, // ✅ Diubah ke integer (cents)
    categorySlug: "running-shoes", // ✅ Ditambahkan
    availableSizes: ["40", "41", "42", "43", "44"],
    availableColors: ["black", "white", "blue"],
    availableImages: {
      // ✅ Diperbaiki typo
      black: "/products/9bl.png",
      white: "/products/9w.png",
      blue: "/products/9b.png",
    },
    createdAt: new Date("2024-03-15"), // ✅ Ditambahkan
    updatedAt: new Date("2024-03-15"), // ✅ Ditambahkan
    quantity: 1,
    selectedSize: "41",
    selectedColor: "white",
    variantPrice: 7990, // ✅ Diubah ke integer (cents)
    maxStock: 7, // Sesuai dengan stock dari variant ID "9-7"
    remainingStock: 6, // maxStock - quantity
  },
];
