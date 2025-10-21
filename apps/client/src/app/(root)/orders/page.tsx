import { auth } from "@clerk/nextjs/server";
import React from "react";

const OrdersPage = async () => {
  const { getToken } = await auth();
  const token = await getToken();

  const data = await fetch("http://localhost:8000/clerk", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const products = await data.json();

  console.log({ token });

  return <section className="bg-sky-500 w-full mx-auto sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-6xl space-y-10">andry</section>;
};

export default OrdersPage;
