import "./HowToUse.css";

export default function HowToUse() {
  return (
    <section id="howtouse" className="howtouse">

      <div className="how-header">
        <h2>How to Use</h2>

        <p>
          Analyze your house floor plan in just a few simple steps.
        </p>
      </div>

      <div className="steps">

        <div className="step">
          <div className="step-number">1</div>

          <div>
            <h3>Upload Your Floor Plan</h3>

            <p>
              Select your house floor plan in PDF format and
              upload it to the analyzer.
            </p>
          </div>
        </div>


        <div className="step">
          <div className="step-number">2</div>

          <div>
            <h3>Preview Your Plan</h3>

            <p>
              Check the uploaded floor plan using the built-in
              PDF preview before starting the analysis.
            </p>
          </div>
        </div>


        <div className="step">
          <div className="step-number">3</div>

          <div>
            <h3>Start AI Analysis</h3>

            <p>
              Click the Analyze button and let the AI examine
              your floor plan.
            </p>
          </div>
        </div>


        <div className="step">
          <div className="step-number">4</div>

          <div>
            <h3>View Your Results</h3>

            <p>
              Get insights about layout, space utilization,
              lighting, ventilation, safety, improvements and
              basic Vastu considerations.
            </p>
          </div>
        </div>

      </div>


      <div className="how-warning">
        <h3>⚠️ Before You Upload</h3>

        <p>
          Make sure your floor plan is clear and readable.
          AI analysis may be inaccurate if the drawing is
          blurry, incomplete, or missing important dimensions.
        </p>
      </div>

    </section>
  );
}