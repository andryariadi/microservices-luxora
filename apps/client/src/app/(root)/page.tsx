import HeroSection from "@/components/HeroSection";
import ProductList from "@/components/ProductList";

export default async function HomePage({ searchParams }: { searchParams: Promise<{ category: string; sort: string; search: string }> }) {
  const { category, sort, search } = await searchParams;

  return (
    <section className="b-sky-500 w-full mx-auto sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-6xl space-y-10">
      <HeroSection />

      <ProductList isShowFilter={false} category={category} sort={sort} search={search} params="homepage" />
    </section>
  );
}
