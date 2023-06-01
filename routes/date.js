import express from "express";
import { getDates, getTest } from "../controllers/date.js";


const router = express.Router();

// router.post("/signin", signin);
// router.post("/signup", signup);
// router.get("/current", getCurrent);
router.get('/', getDates)
router.get("/test", getTest);

export default router;
