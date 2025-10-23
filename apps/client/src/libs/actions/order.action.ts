import { auth } from "@clerk/nextjs/server";

export const getOrders = async () => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_ORDER_SERVICE_URL}/user-orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const data = await res.json();

    console.log(data, "<---getOrdersAction");

    return data;
  } catch (error) {
    console.log("Failed fetch orders:", error);
  }
};
