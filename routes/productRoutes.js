import express from "express";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  updateProductController,
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
router.post(
  "/update-product",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//============>>GET Products <<===============//
router.get("/get-product", getProductController);

//Single Product//
router.get("/get-product/:slug", getSingleProductController);

//GET Photo//
router.get("/product-photo/:pid", productPhotoController);

//Delete Product//

router.delete("/product/:pid", deleteProductController);

export default router;
