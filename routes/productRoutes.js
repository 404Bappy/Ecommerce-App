import express from "express";
import {
  createProductController,
  getProductController,
} from "../controller/productController.js";
import { isAdmin, requireSignIn } from "../middleWares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

//Routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//============>>GET Products <<===============//
router.get("/get-product", getProductController);

export default router;
