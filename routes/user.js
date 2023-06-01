import express from "express";

import { signin, signup, getCurrent, getTest } from "../controllers/user.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/current", getCurrent);
router.get("/test", getTest);

export default router;
