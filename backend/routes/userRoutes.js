import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebar } from "../contollers/userControllers.js";

const router = express.Router();

router.get("/", protectRoute , getUsersForSidebar);//calls automatically to get the users from DB , to reflect at the sidebar



//exporting the router so that it can be imported from server.js
export default router;