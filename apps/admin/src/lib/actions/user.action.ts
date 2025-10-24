import { auth } from "@clerk/nextjs/server";

export const getUsers = async () => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    if (!token) {
      throw new Error("User is not authenticated");
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const data = await res.json();

    console.log({ data, token }, "<---getUsersAction");

    return data;
  } catch (error) {
    console.log("Failed fetch users:", error);
  }
};
export const getUser = async (id: string) => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    if (!token) {
      throw new Error("User is not authenticated");
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const data = await res.json();

    console.log({ data, token }, "<---getUserAction");

    return data;
  } catch (error) {
    console.log("Failed fetch user:", error);
  }
};
