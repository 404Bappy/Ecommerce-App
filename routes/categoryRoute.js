import express from "express";

import {
  categoryController,
  getallCategoryController,
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

export default router;
