import { Router } from "express";
import Controller from "../controllers/category.controller";

const router: Router = Router();

router.get("/", Controller.getCategories);

export default router;
