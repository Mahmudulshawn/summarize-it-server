import express from "express";
import summarizeRoute from "./routes/summarize.js";
import rateLimit from "express-rate-limit";
import { PORT } from "./config/env.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/v1/summarize", summarizeRoute);

// limit the number of requests to the summarize endpoint
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests, please try again later.",
});
app.use(globalLimiter);

app.get("/", (req, res) => {
  res.send("HELLO WORLD");
});

app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
