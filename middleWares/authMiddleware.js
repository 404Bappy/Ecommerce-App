import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//Protected Routes token base
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

//admin acceess

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user.id);

    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    // const user1 = await userModel.findById("645947c2654eaea419add41e");
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "hello There",
    });
  }
};
