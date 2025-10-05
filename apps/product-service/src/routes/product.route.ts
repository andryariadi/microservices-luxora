import { Router } from "express";
import Controller from "../controllers/product.controller";

const router: Router = Router();

router.post("/", Controller.createProduct);

export default router;
