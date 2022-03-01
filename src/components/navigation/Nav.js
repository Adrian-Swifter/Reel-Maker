import { Link } from "react-router-dom";
import Button from "../Button";

export default function Nav({ user, logout }) {
  return (
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
        <li className="list__item">
          <Link to="/">
            {user ? (
              <div>
                <Button
                  buttonName="Logout"
                  buttonIcon="logout"
                  onClick={logout}
                />
              </div>
            ) : (
              "Login"
            )}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
