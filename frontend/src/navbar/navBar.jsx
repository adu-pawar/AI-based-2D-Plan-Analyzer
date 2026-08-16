import "./nav.css";
import logo from "../assets/nlogo.png";

export default function NavBar() {
  return (
    <nav className="nav">
      <h3 className="brand">
        <span className="logo-icon">
          <img src={logo} alt="Floor Plan Analyzer Logo" />
        </span>

        <span>Floor Plan Analyzer</span>
      </h3>

      <ul className="nav-links">
        <li>
          <a href="#Home">Home</a>
        </li>

        <li>
          <a href="#About">About</a>
        </li>

        <li>
          <a href="#howtouse">How to Use</a>
        </li>

        <li>
          <a id="navButton" href="#UplodeFile">
            Analyze Floor Plan
          </a>
        </li>
      </ul>
    </nav>
  );
}