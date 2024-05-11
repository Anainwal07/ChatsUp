import express from "express" ; 
import { singupUser , loginUser , logoutUser } from "../contollers/authControllers.js";

//using hte Router functionality
const router = express.Router() ; 


router.post("/login" , loginUser)  ; //calls when user will try to login 

router.post("/signup", singupUser) ; //calls when user will try to signup 

router.post("/logout", logoutUser) ; //calls when user will logout 



//exporting the router so that it can be imported from server.js
export default router ; 