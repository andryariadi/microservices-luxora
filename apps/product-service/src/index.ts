import express, { Request, Response } from "express";
import cors from "cors";
import { clerkClient, clerkMiddleware, getAuth, requireAuth } from "@clerk/express";

const app = express();
const PORT = process.env.PORT || 8000;
app.use(
  cors({
    origin: ["http://localhost:3002", "http://localhost:3003"],
    credentials: true,
  })
);
app.use(clerkMiddleware());

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "Ok", uptime: process.uptime(), timestamp: Date.now() });
});

app.get("/clerk", requireAuth(), async (req: Request, res: Response) => {
  const auth = getAuth(req);

  // console.log({ auth });

  if (!auth.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = await clerkClient.users.getUser(auth.userId);

  // console.log({ user });

  res.status(200).json({ message: "Authenticated product service is running!" });
});

app.listen(PORT, () => {
  console.log(`Product service is running on port ${PORT}`);
});
