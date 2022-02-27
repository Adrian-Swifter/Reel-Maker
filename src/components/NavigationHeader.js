import { Link, useLocation } from "react-router-dom";

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
                  <li className="list__item">
                    <Link to="/">
                      {user ? (
                        <div>
                          <span
                            style={{
                              fontSize: "0.7rem",
                              textTransform: "lowercase",
                            }}
                          >
                            {user.email}
                          </span>
                          <button onClick={logout}>Sign Out</button>
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
