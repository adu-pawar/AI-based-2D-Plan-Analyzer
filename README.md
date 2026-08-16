# CEP222 - Floor Plan Analysis

A simple two-part web application that analyzes residential floor plan PDFs using Google GenAI (Gemini) and returns a structured JSON analysis (architectural, safety, ventilation, Vastu, and improvement suggestions).

The project contains:
- backend/ — Express server that accepts a PDF and calls the Google GenAI API to analyze the plan
- frontend/ — React + Vite frontend for uploading PDFs and displaying results

Key features
- Upload a residential floor-plan PDF and receive a professional-style analysis in JSON
- Uses @google/genai library to call Gemini models
- Rate-limited analysis route (3 requests per 15 minutes) to help avoid abuse
- Response is returned as strict JSON (backend strips markdown fences and parses JSON)

Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- A Google generative AI API key with access to the chosen Gemini model

Environment variables
Create a .env file at the repository root (or otherwise provide env vars to the process):

GEMINI_API_KEY=your_google_genai_api_key
MODEL=gemini-3.6-flash  # optional, defaults to gemini-3.6-flash

Installation
1. Install root dependencies (backend):

   npm install

2. Install frontend dependencies and build/dev tools (optional if only running backend):

   cd frontend
   npm install

Running the app

1) Start the backend server (starts with nodemon and listens on port 8000):

   npm start

This runs: nodemon ./backend/app.js — the server listens on http://localhost:8000

2) Start the frontend (optional, for development):

   cd frontend
   npm run dev

By default Vite will serve the frontend on http://localhost:5173 (or the port Vite prints). The frontend should call the backend at /api/check — if running frontend on a different origin, ensure CORS is allowed (backend already enables CORS).

API
POST /api/check
- Content type: multipart/form-data
- Form field: file (the PDF file to analyze)

Example using curl:

   curl -X POST "http://localhost:8000/api/check" -F "file=@/path/to/floorplan.pdf" -H "Accept: application/json"

Response
The backend returns strict JSON in the exact format requested to the GenAI model. Example structure:

{
  "overallScore": 0,
  "summary": "",
  "roomArrangement": "",
  "spaceUtilization": "",
  "lighting": "",
  "ventilation": "",
  "safety": "",
  "vastu": { "rating": "", "analysis": "" },
  "strengths": [ "" ],
  "issues": [ { "title": "", "description": "", "priority": "High" } ],
  "improvements": [ { "title": "", "description": "", "benefit": "" } ]
}

Notes and limitations
- The backend sends the PDF to Google GenAI as inline base64 data. The GenAI model may not be able to "read" detailed text or exact dimensions depending on the image quality of the PDF.
- The prompt requests the model to return JSON only and to avoid any explanation or Markdown fences. The backend also strips common Markdown fences before parsing.
- If the model returns non-JSON or the JSON is malformed, the backend will return a 500 error. Check server logs for the raw response.
- Rate limiting is applied to the /api/check route: max 3 requests per 15 minutes per IP.

Security
- Do not commit your GEMINI_API_KEY or any secrets to version control.
- Store secrets in .env or a secure secret manager in production.

Development notes
- Backend entrypoint: backend/app.js
- Frontend entrypoint: frontend/src/main.jsx
- The root package.json has a "start" script that runs the backend with nodemon.

Contributing
- Open issues for bugs or feature requests.
- Pull requests should include a short description and any steps to reproduce or verify changes.

License
- ISC (as specified in package.json)

Contact
- For questions about the implementation, read the source in backend/app.js and frontend/src/ for the UI components.