import mongoose from "mongoose";


const connectionString = "mongodb://localhost:27017/ecommerce";

mongoose.connect(connectionString).then(() => console.log("Connected to MongoDB")).catch(err => console.log(err));


// dev
if (process.env.NODE_ENV === "development") {
  console.log("Connected to MongoDB");
}


export default mongoose;