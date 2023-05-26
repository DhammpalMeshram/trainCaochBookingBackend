import express from "express";
import {signUpController, signInController} from "../controllers/userController.js";
import { getAllProducts, getProductById } from "../controllers/productController.js";

const router = express.Router();

router.post("/signup", signUpController);
router.post("/signin", signInController);
router.get("/product", getAllProducts);
router.get('/product/:id', getProductById)

export default router;
