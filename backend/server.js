import express from "express"; 
import authRoutes from "./routes/auth.routes.js"
import connectToMongoDB from "./db/connectToMongoDb.js";
import dotenv from "dotenv";

const app = express() ; 

dotenv.config();  
const PORT = process.env.PORT || 5000 ; 

app.get("/" , (req,res) => {
    res.send("Hello World") ;
})

app.use("/api/auth" , authRoutes) ; 

app.listen(PORT, () => {
    connectToMongoDB() ; 
    console.log(`Server is running on port ${PORT}`) ; 
})