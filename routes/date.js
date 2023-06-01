import express from "express";
import { getDates, getTest, orderTable } from "../controllers/date.js";

const router = express.Router();

// router.post("/signin", signin);
// router.post("/signup", signup);
// router.get("/current", getCurrent);
router.get("/", getDates);
router.get("/test", getTest);
router.post("/order", orderTable);

export default router;
