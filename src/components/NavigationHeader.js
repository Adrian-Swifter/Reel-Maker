import logo from "../assets/logo.png";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Maker from "./routes/Maker";
import Reels from "./routes/Reels";
import Tracking from "./routes/Tracking";
import Tracks from "./routes/Tracks";

export default function NavigationHeader() {
  return (
    <div>
      <Router>
        <header className="main__header">
          <div className="logo__container">
            <Link to="/" className="logo">
              <img src={logo} alt="Reel Maker Logo" />
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

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/tracks">
            <Tracks />
          </Route>
          <Route path="/maker">
            <Maker />
          </Route>
          <Route path="/reels">
            <Reels />
          </Route>
          <Route path="/tracking">
            <Tracking />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
