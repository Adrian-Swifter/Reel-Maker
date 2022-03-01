import { Link, useLocation } from "react-router-dom";
import Nav from "./Nav";

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
              <Nav user={user} logout={logout} />
            </div>
          </header>
        </>
      )}
    </div>
  );
}
