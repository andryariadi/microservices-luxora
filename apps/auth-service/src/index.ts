import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { authAdminMiddleware, authUserMiddleware } from "./middleware/authMiddleware";
import userRoute from "./routes/user.route";
import { producer } from "./utils/kafka";

const app = express();
const PORT = process.env.PORT || 8003;
app.use(
  cors({
    origin: ["http://localhost:3003"],
    credentials: true,
  })
);
app.use(express.json());
app.use(clerkMiddleware());

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "Ok", uptime: process.uptime(), timestamp: Date.now() });
});

app.get("/clerk", authUserMiddleware, async (req: Request, res: Response) => {
  res.status(200).json({ message: "Authenticated product service is running!", userId: req.userId });
});

app.use("/users", authAdminMiddleware, userRoute);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err, "<---errorInServer");

  // Handle Clerk API errors specifically
  if (err.clerkError) {
    return res.status(err.status || 422).json({
      message: "Validation failed",
      errors: err.errors || [{ message: err.message }],
      clerkTraceId: err.clerkTraceId,
    });
  }

  // Generic error handling
  return res.status(err.status || 500).json({
    message: err.message || "Internal Server Error!",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

const start = async () => {
  try {
    await producer.connect();

    app.listen(PORT, () => {
      console.log(`Auth service is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Auth service failed to start:", error);
    process.exit(1);
  }
};

start();
