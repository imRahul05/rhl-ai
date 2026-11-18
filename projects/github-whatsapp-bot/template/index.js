import "dotenv/config";
import express from "express";
import webhookHandler from "./api/webhook.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ status: "GitHub WhatsApp Bot is running" });
});

app.post("/api/webhook", async (req, res) => {
  await webhookHandler(req, res);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Webhook endpoint: http://localhost:${PORT}/api/webhook`);
});
