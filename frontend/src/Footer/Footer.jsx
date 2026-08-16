import "./footer.css"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-brand">
          <h2>AI Floor Plan Analyzer</h2>
          <p>
            AI-powered insights to help you understand and improve
            your house floor plan.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>

          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#how-to-use">How to Use</a>
          <a href="#upload">Analyze Floor Plan</a>
        </div>

      </div>

      <div className="footer-warning">
        ⚠️ AI-generated results may not always be accurate.
        Please consult a qualified professional before making
        construction or structural decisions.
      </div>

      <div className="footer-bottom">
        <p>© 2026 AI Floor Plan Analyzer. All rights reserved.</p>
      </div>
    </footer>
  );
}