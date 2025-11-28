import express from "express";
import { summarizeText, chatWithAI } from "../controllers/aiController.js";

const router = express.Router();

router.post("/summarize", summarizeText);
router.post("/chat", chatWithAI);

export default router;
