import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[url('/bg-main.svg')] bg-cover bg-[center_-30px]">
      <Navbar />
      <main>{children}</main>;
      <Footer />
    </div>
  );
}
