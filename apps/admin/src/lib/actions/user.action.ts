"use server";

import { auth } from "@clerk/nextjs/server";
import { UserFormSchema } from "@repo/types";

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

    return data;
  } catch (error) {
    console.log("Failed fetch user:", error);
  }
};

export const createUser = async (dataUser: UserFormSchema) => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    if (!token) {
      throw new Error("User is not authenticated");
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataUser),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.log("Server error response:", errorData);

      // Extract pesan error dari Clerk
      if (errorData.errors && Array.isArray(errorData.errors)) {
        const errorMessages = errorData.errors.map((err: any) => err.message).join(", ");
        throw new Error(errorMessages);
      }

      throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
    }

    const data = await res.json();

    console.log({ res, token, dataUser, data }, "<--createUserAction2");

    return data;
  } catch (error) {
    console.log("Failed create user:", error);

    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to create user");
  }
};

export const deleteUser = async (id: string) => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    if (!token) {
      throw new Error("User is not authenticated");
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.log("Server error response:", errorData);

      // Extract pesan error dari Clerk
      if (errorData.errors && Array.isArray(errorData.errors)) {
        const errorMessages = errorData.errors.map((err: any) => err.message).join(", ");
        throw new Error(errorMessages);
      }

      throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
    }

    const data = await res.json();

    console.log({ token, id, res, data }, "<--deleteUserAction");

    return data;
  } catch (error) {
    console.log("Failed delete user:", error);

    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to create user");
  }
};
