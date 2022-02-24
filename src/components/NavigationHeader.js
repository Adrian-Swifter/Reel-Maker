import { Link, useLocation } from "react-router-dom";

export default function NavigationHeader() {
  const location = useLocation();

  return (
    <div style={location.songs ? { display: "block" } : { display: "none" }}>
      <header className="main__header">
        <div className="logo__container">
          <Link to="/" className="logo">
            <h1>Reel Maker</h1>
          </Link>
        </div>
        <div className="navigation">
          <nav>
            <ul className="manin__menu_ul">
              <li className="list__item">
                <Link to="/tracks">Tracks</Link>
              </li>
              <li className="list__item">
                <Link to="/tracking">Tracking</Link>
              </li>
              <li className="list__item">
                <Link to="/maker">Maker</Link>
              </li>
              <li className="list__item">
                <Link to="/reels">Reels</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
}
