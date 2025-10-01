"use client";

import Image from "next/image";
import Link from "next/link";
import { Bell, Home } from "lucide-react";
import SearchBar from "./SearchBar";
import ShoppingCartIcon from "./ShoppingCartIcon";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`b-white w-full fixed top-0 left-0 z-50 ${isScrolled && "backdrop-blur-md shadow-md"}`}>
      <nav className="container flex items-center justify-between py-3">
        {/* Left */}
        <Link href="/" className="flex items-center hover:scale-105 transition-all duration-300">
          <Image src="/logo.png" alt="Luxora" width={36} height={36} className="w-6 h-6 md:w-9 md:h-9" />

          <p className="hidden md:block text-dark-200 text-md font-medium tracking-wider uppercase">Luxora.</p>
        </Link>

        {/* Right */}
        <div className="b-fuchsia-500 flex items-center gap-5">
          <SearchBar />

          <Link href="/">
            <Home className="w-4 h-4 text-gray-600" />
          </Link>

          <Bell className="w-4 h-4 text-gray-600" />

          <ShoppingCartIcon />

          <Link href="/login">Sign in</Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
