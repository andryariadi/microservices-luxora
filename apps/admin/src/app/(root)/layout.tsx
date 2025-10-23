import Nabvar from "@/components/Nabvar";
import ASidebar from "@/components/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { ClerkProvider } from "@clerk/nextjs";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    // <ClerkProvider>
    <SidebarProvider defaultOpen={defaultOpen}>
      <div className="b-amber-500 w-full flex">
        <ASidebar />

        <main className="b-lime-600">
          <Nabvar />
          {children}
        </main>
      </div>
    </SidebarProvider>
    // </ClerkProvider>
  );
}
