import express from "express";
import {
  registerController,
  loginController,
  testController,
} from "../controller/authController.js";
import { requireSignIn } from "../middleWares/authMiddleware.js";

//Router Objects
const router = express.Router();

//Routing
//REGESTER || METHOD POST
router.post("/register", registerController);

//LOGIN || METHOD POST
router.post("/login", loginController);

//test route
router.get("/test",requireSignIn, testController);

export default router;
