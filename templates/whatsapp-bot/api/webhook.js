import dotenv from "dotenv";
import twilio from "twilio";
import { userPhones } from "../config/user-phones.js";
import { buildGithubEventMessage } from "../services/github-event-message.js";

dotenv.config();

export default async function handler(req, res) {
  try {
    const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
    const event = req.headers["x-github-event"];
    const eventMessage = buildGithubEventMessage(event, req.body);

    if (!eventMessage?.user || !eventMessage?.messageText) {
      return res.status(200).json({ message: "Event ignored" });
    }

    const { user, messageText } = eventMessage;
    const phone = userPhones[user];

    if (!phone) {
      return res.status(200).json({ message: "No phone mapping" });
    }

    const message = await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_FROM || "whatsapp:+14155238886",
      to: `whatsapp:${phone}`,
      body: messageText,
    });

    console.log("WhatsApp sent:", message.sid);
    res.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(500).json({ error: "Failed to send WhatsApp" });
  }
}
