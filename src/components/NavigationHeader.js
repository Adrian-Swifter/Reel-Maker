import { Link, useLocation } from "react-router-dom";
import Button from "./Button";

export default function NavigationHeader({ user, logout }) {
  const location = useLocation();

  return (
    <div
      style={
        location.pathname !== "/reel"
          ? { display: "block" }
          : { display: "none" }
      }
    >
      {user && (
        <>
          <header className="main__header">
            <div className="logo__container">
              <Link to="/" className="logo">
                <h1 style={{ margin: "0" }}>Reel Maker</h1>
                <p
                  style={{
                    margin: "0",
                    backgroundColor: "white",
                    color: "black",
                    padding: "2px",
                    borderRadius: "2px",
                  }}
                >
                  {user.email}
                </p>
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
            </div>
          </header>
        </>
      )}
    </div>
  );
}
