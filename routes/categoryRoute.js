import express from "express";

import {
  categoryController,
  deleteCategoryController,
  getallCategoryController,
  singleCategoryController,
  updateCategoryController,
} from "../controller/categoryController.js";
import { isAdmin, requireSignIn } from "../middleWares/authMiddleware.js";

const router = express.Router();

//Routes
//==============>> Create Category <<============//
router.post("/create-category", requireSignIn, isAdmin, categoryController);

//===============>> Upate Category <<==============//
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

//==============>> Get All Category <<==================//
router.get("/getall-category", getallCategoryController);

//===============>> Single Category << ==================//
router.get("/single-category/:slug", singleCategoryController);

///==================>> Delete Category <<< =================//
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);
export default router;
