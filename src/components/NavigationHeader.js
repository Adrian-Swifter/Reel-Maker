import logo from "../assets/logo.png";

export default function NavigationHeader() {
  return (
    <header className="main__header">
      <div className="logo__container">
        <a href="index.html" className="logo">
          <img src={logo} alt="Reel Maker Logo" />
        </a>
      </div>
      <div className="navigation">
        <nav>
          <ul className="manin__menu_ul">
            <li className="list__item">
              <a href="index.html">Tracks</a>
            </li>
            <li className="list__item">
              <a href="tracking.html">Tracking</a>
            </li>
            <li className="list__item">
              <a href="maker-1.html">Maker</a>
            </li>
            <li className="list__item">
              <a href="reels.html">Reels</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
