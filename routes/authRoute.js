import express from "express";
import {
  registerController,
  loginController,
} from "../controller/authController.js";

//Router Objects
const router = express.Router();

//Routing
//REGESTER || METHOD POST
router.post("/register", registerController);

//LOGIN || METHOD POST
router.post("/login", loginController);

export default router;
