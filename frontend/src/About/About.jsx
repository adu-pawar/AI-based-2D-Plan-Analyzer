import "./About.css"

export default function About(){
    return(
        <section id="About">
            <section id="about" className="about">
  <h2>About AI Floor Plan Analyzer</h2>

  <p>
    AI Floor Plan Analyzer is an AI-powered tool designed to help you
    understand and improve your house floor plans. It analyzes layout,
    space utilization, lighting, ventilation, safety, and basic Vastu
    considerations.
  </p>

  <div className="warning">
    <h3>⚠️ Important Disclaimer</h3>

    <p>
      AI-generated analysis may sometimes be inaccurate, incomplete,
      or based on an incorrect interpretation of the uploaded floor plan.
      This tool is intended for informational and preliminary guidance
      only and should not replace professional architectural or
      engineering advice.
    </p>

    <p>
      Please consult a qualified architect or structural engineer before
      making construction or major design decisions.
    </p>
  </div>
</section>
        </section>
    );
}