import express from "express";
import {signUpController, signInController} from "../controllers/userController.js";
import { getProducts } from "../controllers/productController.js";

const router = express.Router();

router.post("/signup", signUpController);
router.post("/signin", signInController);
router.get("/product", getProducts);

export default router;
