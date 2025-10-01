import { footerLinks, footerLinksCompany, footerLinksProduct } from "@/libs/constant";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800 container flex flex-col gap-8 md:flex-row md:items-center md:justify-between p-8 rounded-lg">
      {/* logo */}
      <div className="b-rose-500 flex flex-col items-center md:items-start gap-4">
        <Link href="/" className="flex items-center hover:scale-105 transition-all duration-300">
          <Image src="/logo.png" alt="Luxora" width={36} height={36} />
          <p className="hidden md:block text-md font-medium tracking-wider text-white uppercase">Luxora.</p>
        </Link>

        <p className="text-sm text-gray-400">© 2025 Luxora.</p>
        <p className="text-sm text-gray-400">All rights reserved.</p>
      </div>

      {/* Links */}
      <div className="b-rose-500 flex flex-col items-center md:items-start gap-4">
        {footerLinks.map((link) => (
          <Link key={link.label} href={link.href} className="text-sm text-gray-400 hover:text-white">
            {link.label}
          </Link>
        ))}
      </div>

      {/* Products Links */}
      <div className="b-rose-500 flex flex-col items-center md:items-start gap-4">
        {footerLinksProduct.map((link) => (
          <Link key={link.label} href={link.href} className="text-sm text-gray-400 hover:text-white">
            {link.label}
          </Link>
        ))}
      </div>

      {/* Company Links */}
      <div className="b-rose-500 flex flex-col items-center md:items-start gap-4">
        {footerLinksCompany.map((link) => (
          <Link key={link.label} href={link.href} className="text-sm text-gray-400 hover:text-white">
            {link.label}
          </Link>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
