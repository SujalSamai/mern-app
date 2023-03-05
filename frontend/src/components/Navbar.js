import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Work it Out</h1>
        </Link>
      </div>
    </header>
  );
}
