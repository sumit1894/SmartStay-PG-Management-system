import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB connected successfully"))
.catch(err => console.log("Connection error:", err));


// export const conn=async()=>{
//     try {
//         await mongoose.connect(`${process.env.MONGO_URL}`)
//         console.log("Connected to DB")
//     } catch (error) {
//         console.log(error); 
//     }
// }

// conn();