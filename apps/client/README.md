This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

- Hanle logic addToCart for operation (<100) item cart:
  addToCart: (product) =>
  set((state) => {
  console.log({ state, product }, "<---addToCart");

      const productExists = state.cart.find((item) => item.id === product.id && item.selectedSize === product.selectedSize && item.selectedColor === product.selectedColor);

      if (productExists) {
        return {
          cart: state.cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + product.quantity || 1 } : item)),
        };
      }

      return {
        cart: [...state.cart, { ...product, quantity: product.quantity, selectedSize: product.selectedSize, selectedColor: product.selectedColor }],
      };

  }),

- Hanle logic addToCart for operation (>100) item cart:
  addToCart: (product) =>
  set((state) => {
  console.log({ state, product }, "<---addToCart");

        const quantity = product.quantity || 1;

        const existingIndex = state.cart.findIndex((item) => item.id === product.id && item.selectedSize === product.selectedSize && item.selectedColor === product.selectedColor);

        if (existingIndex !== -1) {
          const updatedCart = [...state.cart];

          updatedCart[existingIndex] = {
            ...updatedCart[existingIndex],
            quantity: updatedCart[existingIndex].quantity + quantity,
          };

          return { cart: updatedCart };
        }

        return {
          cart: [
            ...state.cart,
            {
              ...product,
              quantity,
              selectedSize: product.selectedSize,
              selectedColor: product.selectedColor,
            },
          ],
        };
      }),

         // variantPrice: product.variants?.find((v) => v.size === selectedSize && v.color === selectedColor)?.price || 0,
      // maxStock: product.variants?.find((v) => v.size === selectedSize && v.color === selectedColor)?.stock || 0,

{
// id: 1,
// variantId: "1-m-gray", // Unique ID untuk kombinasi size+color
// name: "Adidas CoreFit T-Shirt",
// selectedSize: "m",
// selectedColor: "gray",
// price: 39.9,
// quantity: 2,
// maxStock: 5, // Diambil dari `variants.stock`
// image: "/products/1g.png",
// remainingStock: 7 // Hanya untuk tampilan UI
// }

export const products: ProductType[] = [
{
id: 1,
name: "Adidas CoreFit T-Shirt",
shortDescription: "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
description:
"Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
price: 39.9,
sizes: ["s", "m", "l", "xl", "xxl"],
colors: ["gray", "purple", "green"],
images: {
gray: "/products/1g.png",
purple: "/products/1p.png",
green: "/products/1gr.png",
},
},
{
id: 2,
name: "Puma Ultra Warm Zip",
shortDescription: "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
description:
"Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
price: 59.9,
sizes: ["s", "m", "l", "xl"],
colors: ["gray", "green"],
images: { gray: "/products/2g.png", green: "/products/2gr.png" },
},
{
id: 3,
name: "Nike Air Essentials Pullover",
shortDescription: "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
description:
"Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
price: 69.9,
sizes: ["s", "m", "l"],
colors: ["green", "blue", "black"],
images: {
green: "/products/3gr.png",
blue: "/products/3b.png",
black: "/products/3bl.png",
},
},
{
id: 4,
name: "Nike Dri Flex T-Shirt",
shortDescription: "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
description:
"Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
price: 29.9,
sizes: ["s", "m", "l"],
colors: ["white", "pink"],
images: { white: "/products/4w.png", pink: "/products/4p.png" },
},
{
id: 5,
name: "Under Armour StormFleece",
shortDescription: "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
description:
"Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
price: 49.9,
sizes: ["s", "m", "l"],
colors: ["red", "orange", "black"],
images: {
red: "/products/5r.png",
orange: "/products/5o.png",
black: "/products/5bl.png",
},
},
{
id: 6,
name: "Nike Air Max 270",
shortDescription: "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
description:
"Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
price: 59.9,
sizes: ["40", "42", "43", "44"],
colors: ["gray", "white"],
images: { gray: "/products/6g.png", white: "/products/6w.png" },
},
{
id: 7,
name: "Nike Ultraboost Pulse ",
shortDescription: "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
description:
"Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
price: 69.9,
sizes: ["40", "42", "43"],
colors: ["gray", "pink"],
images: { gray: "/products/7g.png", pink: "/products/7p.png" },
},
{
id: 8,
name: "Levi’s Classic Denim",
shortDescription: "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
description:
"Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
price: 59.9,
sizes: ["s", "m", "l"],
colors: ["blue", "green"],
images: { blue: "/products/8b.png", green: "/products/8gr.png" },
},
];

{
productId: 1, // ID referensi ke produk utama
variantId: "1-m-gray", // ID unik kombinasi size+color
name: "Adidas CoreFit T-Shirt",
selectedSize: "m",
selectedColor: "gray",
basePrice: 39.9,
image: "/products/1g.png",
quantity: 3,
maxStock: 8, // Stok maksimum untuk variant ini
variantPrice: 39.9 // Harga spesifik variant (jika berbeda)
remainingStock: 5 // Hanya untuk tampilan UI
},
