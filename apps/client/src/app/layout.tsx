// app/layout.tsx
import type { Metadata } from "next";
import { Archivo, Roboto, Sora, Urbanist } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  weight: ["400", "500", "600", "700"],
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["400", "500", "600", "700"],
});

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Luxora",
    template: "%s | Luxora",
  },
  description: "Luxora is a platform e-commerce that allows you to sell your products online.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${archivo.variable} ${roboto.variable} ${sora.variable} ${urbanist.variable} font-archivo antialiased`}>
        {children}
        <ToastContainer autoClose={1500} theme="colored" />
      </body>
    </html>
  );
}
