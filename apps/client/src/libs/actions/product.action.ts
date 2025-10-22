export const getProducts = async ({ category, sort, search, params }: { category?: string; sort?: string; search?: string; params: "homepage" | "products" }) => {
  console.log({ category, sort, search, params }, "<--getProducts");

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products?${category ? `category=${category}` : ""}${search ? `&search=${search}` : ""}&sort=${sort || "newest"}${params === "homepage" ? "&limit=8" : ""}`);

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.log("Failed fetch products:", error);
  }
};

export const getProduct = async (id: string) => {
  try {
    const resJson = await fetch(`${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products/${id}`);

    if (!resJson.ok) {
      throw new Error("Network response was not ok");
    }

    const res = await resJson.json();
    const data = res.data;

    return data;
  } catch (error) {
    console.log("Failed fetch products:", error);
  }
};
