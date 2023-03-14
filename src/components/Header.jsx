import { Link } from "react-router-dom";
import "./header.css";

function Header() {
  return (
    <div className="header">
      <Link to="/watch">
        <button className="btn">StopWatch</button>
      </Link>
      <Link to="timer">
        <button className="btn">Timer</button>
      </Link>
    </div>
  );
}

export default Header;
