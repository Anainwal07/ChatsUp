import express from "express"; 
import authRoutes from "./routes/authRoutes.js" ;
import messageRoutes from "./routes/messageRoutes.js" ;
import connectToMongoDB from "./db/connectToMongoDb.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js"

const app = express() ; 

dotenv.config();  
const PORT = process.env.PORT || 5000 ; 

app.use(express.json()) ;//to parse the incoming requests with JSON payloads 
app.use(cookieParser()) ;

app.use("/api/auth" , authRoutes);
app.use("/api/messages" , messageRoutes) ; 
app.use("/api/users" , userRoutes) ;

app.listen(PORT, () => {
    connectToMongoDB() ; 
    console.log(`Server is running on port ${PORT}`) ; 
})