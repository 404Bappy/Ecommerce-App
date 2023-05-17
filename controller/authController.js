import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

//===============>> REGISTER LOGIN <<==================<<

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    //Validation//
    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }

    //Check User
    const existingUser = await userModel.findOne({ email });
    //Existing User//
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register Please Login With Your Account",
      });
    }
    //Register User
    const hashedPassword = await hashPassword(password);
    //Save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();
    res.status(201).send({
      success: true,
      message: "User Register Successfully Done ",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

//==================>> POST LOGIN <<===================<<

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid Email or Password",
      });
    }
    //Check User
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User is Not Registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      req.send(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    //Token Create
    const token = await JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

//====================>>Forgot-Password Controller <<=====================<<
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({
        message: "Email is Required",
      });
    }
    if (!answer) {
      res.status(400).send({
        message: "answer is Required",
      });
    }
    if (!newPassword) {
      res.status(400).send({
        message: "newPassword is Required",
      });
    }

    //Check
    const user = await userModel.findOne({ email, answer });
    //Validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email or Password",
      });
    }
    const hashed = await hashedPassword(newPassword);
    await userModel.findByIdAndUpdate(user.id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something Went Wrong",
      error,
    });
  }
};

//====================>>test Controller (ADMIN) <<=====================<<
export const testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};
