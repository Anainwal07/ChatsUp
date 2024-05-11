import express from "express";
import { getMessages, sendMessage } from "../contollers/messageControllers.js";
import protectRoute from "../middleware/protectRoute.js";


//using the router functionality of express
const router = express.Router();


//Integrated a middleware protectRoute for checking if the user is authorised to performing the listed actions 
router.get("/:id", protectRoute, getMessages);//calls when the user will get any messages from other users
router.post("/send/:id", protectRoute, sendMessage);//calls when the user will send any message to other user


////exporting the router so that it can be imported from server.js
export default router;