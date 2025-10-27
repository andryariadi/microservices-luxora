"use server";

import { auth } from "@clerk/nextjs/server";

export const createCategory = async ({ name, slug }: { name: string; slug: string }) => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    if (!token) {
      throw new Error("User is not authenticated");
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, slug }),
    });

    const data = await res.json();

    console.log({ token, data }, "<--createCategory");

    return data;
  } catch (error) {
    console.log("Failed create categories:", error);
  }
};
