import { useState } from "react";
import axios from "axios";
import "./uplodeFile.css";
import Loader from "./Loader.jsx";

export default function UploadFile() {
  const [file, setFile] = useState(null);
  const [apiData, setApiData] = useState(null);
  const [loader, setLoader] = useState(false);
  const [err, setErr] = useState(null);

  const dataHandle = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setErr("Please select a PDF file first.");
      return;
    }

    setLoader(true);
    setApiData(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("https://ai-based-2d-plan-analyzer.onrender.com/api/check", formData);

      setApiData(res.data);
      setErr("");
    } catch (error) {
      console.log("ERROR:", error);

      if (error.response) {
        // Server responded with an error
        const status = error.response.status;

        if (status === 400) {
          setErr(
            error.response.data?.error ||
              "Invalid file. Please upload a valid PDF.",
          );
        } else if (status === 413) {
          setErr("File is too large. Please upload a smaller PDF.");
        } else if (status === 429) {
          setErr(
            error.response.data?.error ||
              "Too many requests. Please try again later.",
          );
        } else if (status === 500) {
          setErr(
            error.response.data?.error ||
              "AI analysis failed. Please try again later.",
          );
        } else {
          setErr(
            error.response.data?.error ||
              "Something went wrong. Please try again.",
          );
        }
      } else if (error.request) {
        // Request was sent but server didn't respond
        setErr(
          "Unable to connect to the server. Please check your connection.",
        );
      } else {
        // Something went wrong before request was sent
        setErr("Something went wrong. Please try again.");
      }
    } finally {
      setLoader(false);
    }
  };

  return (
    <div>
      {loader && <Loader/>}
      <div className="in">
        {/* ================= UPLOAD ================= */}

        <div className="upload-section">
          <section id="UplodeFile">
            <form onSubmit={handleSubmit}>
              <div className="file-upload">
                <label htmlFor="pdf-upload" className="file-upload-label">
                  <span className="upload-icon">📄</span>

                  <span className="upload-text">
                    {file ? file.name : "Upload your floor plan PDF"}
                  </span>

                  <span className="upload-hint">
                    Click to browse or drag and drop
                  </span>
                </label>

                <input
                  id="pdf-upload"
                  type="file"
                  onChange={dataHandle}
                  accept="application/pdf"
                />
              </div>

              {err && (
                <div className="mt-4 rounded-lg bg-red-50 border border-red-200 p-4 text-red-600">
                  <h3 className="font-semibold">Request Failed</h3>
                  <p>{err}</p>
                </div>
              )}

              {file && (
                <div className="preview-section">
                  <h2>Floor Plan Preview</h2>

                  <iframe
                    src={`${URL.createObjectURL(
                      file,
                    )}#toolbar=0&view=FitH&zoom=fit`}
                    title="Floor Plan Preview"
                  />
                </div>
              )}

              <button type="submit">Analyze Floor Plan</button>
              <br></br>
              <a className="space m-2" href="#howtouse">
                How To Use
              </a>
            </form>
          </section>
        </div>

        {apiData && (
          <div className="analysis-container">
            <div className="analysis-header">
              <h1>Floor Plan Analysis</h1>
              <p>AI-generated analysis of your uploaded floor plan.</p>
            </div>

            {/* ================= SCORE ================= */}

            <div className="score-card">
              <div className="score-circle">
                <span>{apiData.overallScore}</span>
                <small>/100</small>
              </div>

              <div className="score-content">
                <h2>Overall Score</h2>

                <p>{apiData.summary}</p>
              </div>
            </div>

            {/* ================= QUICK ANALYSIS ================= */}

            <div className="analysis-grid">
              <div className="info-card">
                <div className="card-icon">🏠</div>

                <h3>Room Arrangement</h3>

                <p>{apiData.roomArrangement}</p>
              </div>

              <div className="info-card">
                <div className="card-icon">📐</div>

                <h3>Space Utilization</h3>

                <p>{apiData.spaceUtilization}</p>
              </div>

              <div className="info-card">
                <div className="card-icon">☀️</div>

                <h3>Lighting</h3>

                <p>{apiData.lighting}</p>
              </div>

              <div className="info-card">
                <div className="card-icon">🌬️</div>

                <h3>Ventilation</h3>

                <p>{apiData.ventilation}</p>
              </div>

              <div className="info-card">
                <div className="card-icon">🛡️</div>

                <h3>Safety</h3>

                <p>{apiData.safety}</p>
              </div>
            </div>

            {/* ================= STRENGTHS ================= */}

            <section className="result-section">
              <div className="section-title">
                <span>✓</span>
                <h2>Strengths</h2>
              </div>

              <div className="strength-list">
                {apiData.strengths?.map((item, index) => (
                  <div className="strength-item" key={index}>
                    <span>✓</span>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ================= ISSUES ================= */}

            <section className="result-section">
              <div className="section-title">
                <span>⚠</span>
                <h2>Issues Found</h2>
              </div>

              <div className="issues-container">
                {apiData.issues?.map((item, index) => (
                  <div className="issue-card" key={index}>
                    <div className="issue-header">
                      <h3>{item.title}</h3>

                      {item.priority && (
                        <span
                          className={`priority ${item.priority.toLowerCase()}`}
                        >
                          {item.priority}
                        </span>
                      )}
                    </div>

                    <p>{item.description}</p>

                    {item.improvement && (
                      <div className="issue-improvement">
                        <strong>Recommended Improvement</strong>

                        <p>{item.improvement}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* ================= IMPROVEMENTS ================= */}

            <section className="result-section">
              <div className="section-title">
                <span>💡</span>
                <h2>Recommended Improvements</h2>
              </div>

              <div className="improvements-container">
                {apiData.improvements?.map((item, index) => (
                  <div className="improvement-card" key={index}>
                    <div className="improvement-number">{index + 1}</div>

                    <div>
                      <h3>{item.title}</h3>

                      <p>{item.description}</p>

                      {item.benefit && (
                        <div className="benefit">
                          <strong>Benefit:</strong> {item.benefit}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ================= VASTU ================= */}

            {apiData.vastu && (
              <section className="vastu-section">
                <div className="vastu-header">
                  <div>
                    <h2>Orientation According to Vastu Shastra</h2>

                    <p>Basic assessment</p>
                  </div>

                  <div
                    className={`vastu-rating ${apiData.vastu.rating?.toLowerCase()}`}
                  >
                    {apiData.vastu.rating}
                  </div>
                </div>

                <div className="vastu-content">
                  <p>{apiData.vastu.analysis}</p>
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
