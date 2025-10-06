import { Router } from "express";
import Controller from "../controllers/product.controller";

const router: Router = Router();

router.get("/", Controller.getProducts);
router.get("/:id", Controller.getProduct);
router.post("/", Controller.createProduct);
router.patch("/:id", Controller.updateProduct);
router.delete("/:id", Controller.deleteProduct);

export default router;
