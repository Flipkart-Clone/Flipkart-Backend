import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const Connection = async (url) => {
  try {
    await mongoose
      .connect(url, { useUnifiedTopology:true,useNewUrlParser: true })
      .then(console.log("success connection"));
  } catch (error) {
    console.log(error.message);
  }
};

export default Connection;
