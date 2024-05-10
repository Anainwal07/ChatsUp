import express from "express"; 
import authRoutes from "./routes/authRoutes.js"
import connectToMongoDB from "./db/connectToMongoDb.js";
import dotenv from "dotenv";

const app = express() ; 

dotenv.config();  
const PORT = process.env.PORT || 5000 ; 

app.use(express.json()) ;//to parse the incoming requests with JSON payloads 

app.use("/api/auth" , authRoutes);

// app.get("/" , (req,res) => {
//     res.send("Hello World") ;
// })

// app.use("/api/auth" , authRoutes) ; 

app.listen(PORT, () => {
    connectToMongoDB() ; 
    console.log(`Server is running on port ${PORT}`) ; 
})