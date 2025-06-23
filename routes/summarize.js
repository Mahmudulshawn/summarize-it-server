import { Router } from "express";

import {SummarizeText} from "../controllers/summarizeController.js";

const summarizeRouter = Router();

summarizeRouter.post("/summarize", SummarizeText);

export default summarizeRouter;
