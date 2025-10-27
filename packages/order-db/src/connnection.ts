// src/db/connection.ts
import mongoose from "mongoose";

let isConnected = false;
let connectionAttempts = 0;
const MAX_RETRIES = 3;

export const connectOrderDB = async (): Promise<void> => {
  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in environment variables");
  }

  try {
    // Configure mongoose options
    mongoose.set("strictQuery", false);

    const options = {
      serverSelectionTimeoutMS: 10000, // 10 seconds
      socketTimeoutMS: 45000, // 45 seconds
      maxPoolSize: 10,
      retryWrites: true,
      w: "majority",
    };

    console.log("Attempting to connect to MongoDB...");

    await mongoose.connect(process.env.MONGODB_URI, options);

    isConnected = true;
    connectionAttempts = 0;

    console.log("✅ Successfully connected to MongoDB!");

    // Handle connection events
    mongoose.connection.on("error", (error) => {
      console.error("MongoDB connection error:", error);
      isConnected = false;
    });

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB disconnected");
      isConnected = false;
    });

    mongoose.connection.on("reconnected", () => {
      console.log("MongoDB reconnected");
      isConnected = true;
    });
  } catch (error: any) {
    connectionAttempts++;

    console.error(`❌ MongoDB connection attempt ${connectionAttempts} failed:`, error.message);

    if (connectionAttempts < MAX_RETRIES) {
      console.log(`Retrying connection in 3 seconds... (${connectionAttempts}/${MAX_RETRIES})`);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return connectOrderDB();
    } else {
      console.error("Max connection attempts reached. Exiting...");
      throw new Error(`Failed to connect to MongoDB after ${MAX_RETRIES} attempts: ${error.message}`);
    }
  }
};

export const disconnectOrderDB = async (): Promise<void> => {
  if (!isConnected) return;

  try {
    await mongoose.disconnect();
    isConnected = false;
    console.log("MongoDB disconnected");
  } catch (error) {
    console.error("Error disconnecting from MongoDB:", error);
  }
};
