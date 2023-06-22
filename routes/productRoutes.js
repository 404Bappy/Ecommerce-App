import express from "express";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCountController,
  productFilterController,
  productListController,
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
router.put(
  "/update-product/:pid",
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

router.delete("/delete-product/:pid", deleteProductController);

//Filter Product//
router.post("/product-filter", productFilterController);

//Product Count//
router.get("/product-count", productCountController);

//Product Per Page//
router.get('/product-list/:page', productListController)

//Search Product//
router.get('/search',searchProductController)

export default router;
