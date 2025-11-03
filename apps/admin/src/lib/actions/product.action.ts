"use server";

import { auth } from "@clerk/nextjs/server";
import { ProductFormSchema } from "@repo/types";

export const getProducts = async ({ limit, popular }: { limit?: number; popular?: boolean }) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products?${limit ? `&limit=${limit}` : ""}${popular ? "&popular=true" : ""}`);

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

export const createProduct = async (dataProduct: ProductFormSchema) => {
  console.log({ dataProduct }, "<---createProductAction1");

  try {
    const { getToken } = await auth();
    const token = await getToken();

    if (!token) {
      throw new Error("User is not authenticated");
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataProduct),
    });

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await res.json();

    console.log({ data }, "<---createProductAction2");

    return data;
  } catch (error) {
    console.log("Failed fetch products:", error);
  }
};
