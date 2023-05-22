import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoutes.js";
import cors from "cors";

//Congigure ENV
dotenv.config();

//Databse Config
connectDB();

//REST OBJECT

const app = express();

//// Middle wares //
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoute);

//REST API
app.get("/", (req, res) => {
  res.send({
    message: "Welcome to Ecommerce App Using MERN STACK",
  });
});

//PORT
const PORT = process.env.PORT || 9000;

//Run Listen
app.listen(PORT, () => {
  console.log(
    `Ecommerce Server Running On ${process.env.DEV_MODE} Mode On Port ${PORT}`
      .yellow
  );
});
