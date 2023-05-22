import express from "express";
import {
  createProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
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

//Single Product//
router.get("/get-product/:slug", getSingleProductController);

//GET Photo//
router.get("/product-photo/:pid", productPhotoController);

export default router;
