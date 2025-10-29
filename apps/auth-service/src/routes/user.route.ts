import { Router } from "express";
import { producer } from "../utils/kafka";
import clerkClient from "../utils/clerk";

const router: Router = Router();

router.get("/", async (req, res) => {
  const users = await clerkClient.users.getUserList();

  console.log({ clerkClient, users: clerkClient.users }, "<---userRoute");

  res.status(200).json(users);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const user = await clerkClient.users.getUser(id);

  res.status(200).json(user);
});

router.post("/", async (req, res) => {
  type CreateParams = Parameters<typeof clerkClient.users.createUser>[0];

  const newUser: CreateParams = req.body;

  const user = await clerkClient.users.createUser(newUser);

  producer.send("user.created", {
    value: {
      username: user.username,
      email: user.emailAddresses[0]?.emailAddress,
    },
  });

  console.log({ newUser, user }, "<---userRoute");

  res.status(200).json({
    message: "User created successfully!",
    data: user,
  });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const user = await clerkClient.users.deleteUser(id);

  res.status(200).json({
    message: "User deleted successfully!",
    data: user,
  });
});

export default router;
