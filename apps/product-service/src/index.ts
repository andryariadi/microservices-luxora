import express, { Request, Response } from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import productRouter from "./routes/product.route.js";
import categoryRouter from "./routes/category.route.js";
import { authUserMiddleware } from "./middleware/authMiddleware.js";

const app = express();
const PORT = process.env.PORT || 8000;
app.use(
  cors({
    origin: ["http://localhost:3002", "http://localhost:3003"],
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

app.use("/products", productRouter);
app.use("/categories", categoryRouter);

app.use((err: any, req: Request, res: Response, next: Function) => {
  console.log(err, "<---errorInServer");

  return res.status(err.status || 500).json({ message: err.message || "Internal Server Error!" });
});

app.listen(PORT, () => {
  console.log(`Product service is running on port ${PORT}`);
});
