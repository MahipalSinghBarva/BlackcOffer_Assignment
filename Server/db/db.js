import mongoose from "mongoose";
import dotenv from "dotenv"

const DBConnect = mongoose.connect("mongodb+srv://mahipalsingh450:lAgWez7tX5bOblUB@cluster0.kxrndfn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
export default DBConnect