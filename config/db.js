import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Connected to MongoDB DataBase ${conn.connection.host}`.bgGreen.white
    );
  } catch (error) {
    console.log(`error in  mongoDB ${error}`.bgRed.white);
  }
};

export default connectDB;
