import express from "express";
import {
  registerController,
  loginController,
  testController,
} from "../controller/authController.js";
import { isAdmin, requireSignIn } from "../middleWares/authMiddleware.js";

//Router Objects
const router = express.Router();

//Routing
//REGESTER || METHOD POST
router.post("/register", registerController);

//LOGIN || METHOD POST
router.post("/login", loginController);

//test route
router.get("/test", requireSignIn, isAdmin, testController);

//Protected Route
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
