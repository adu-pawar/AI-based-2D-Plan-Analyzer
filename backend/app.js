import express from "express";
import cors from "cors";
import multer from "multer";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import reloadWebsite from "./relode"
dotenv.config();

const url = `https://ai-based-2d-plan-analyzer.onrender.com`;
const interval = 100000;

const app = express();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});
const model = process.env.MODEL || "gemini-3.6-flash" ;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const upload = multer({
  storage: multer.memoryStorage(), // Store in RAM (good if you don't want to save the file)
});



const analyzeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: {
    error: "Too many analysis requests. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.get("/",(req,res)=>{
  res.status(200).send("server is Running")
})

setInterval(reloadWebsite, interval);

app.post("/api/check", upload.single("file"),analyzeLimiter, async (req, res) => {

  try {
    const pdfBuffer = req.file.buffer;

    const response = await ai.models.generateContent({
      model: model,
      contents: [
  {
    text: `
You are an experienced architect, civil engineer, interior designer, and Vastu consultant.

Analyze the uploaded residential floor plan PDF.

Return ONLY valid JSON.
Do NOT use Markdown.
Do NOT wrap the response in \`\`\`json.
Do NOT add any explanation outside the JSON.

Use this exact format:

{
  "overallScore": 0,
  "summary": "",
  "roomArrangement": "",
  "spaceUtilization": "",
  "lighting": "",
  "ventilation": "",
  "safety": "",
  "vastu": {
    "rating": "",
    "analysis": ""
  },
  "strengths": [
    ""
  ],
  "issues": [
    {
      "title": "",
      "description": "",
      "priority": "High"
    }
  ],
  "improvements": [
    {
      "title": "",
      "description": "",
      "benefit": ""
    }
  ]
}

Rules:
- overallScore must be between 0 and 100.
- Give practical and professional suggestions.
- Mention room dimensions if visible.
- Mention ventilation and natural lighting.
- Mention privacy and circulation.
- Mention safety issues.
- Mention basic Vastu observations only if they can be determined.
- If something cannot be determined, write "Not clearly visible".
- Never invent information.
`,
  },
  {
    inlineData: {
      mimeType: "application/pdf",
      data: pdfBuffer.toString("base64"),
    },
  },
],
    });
const text = response.text;

// Sometimes Gemini returns JSON inside ```json ... ```
const clean = text.replace(/```json|```/g, "").trim();

const result = JSON.parse(clean);

res.json(result);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(8000, () => {
  console.log("Server started");
});