import { auth } from "@clerk/nextjs/server";

export const getOrdersChart = async () => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    if (!token) {
      throw new Error("User is not authenticated");
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_ORDER_SERVICE_URL}/order-chart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    console.log({ data }, "<---orderschartaction");

    return data;
  } catch (error) {
    console.log("Failed fetch orders chart:", error);
  }
};
