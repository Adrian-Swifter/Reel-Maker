import { useState } from "react";
import "./App.css";
import NavigationHeader from "./components/navigation/NavigationHeader";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Maker from "./components/routes/Maker";
import Reels from "./components/routes/Reels";
import Tracking from "./components/routes/Tracking";
import Tracks from "./components/routes/Tracks";
import Reel from "./components/reel/Reel";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import { auth } from "./firebase/firebase_storage";

function App() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({});

  auth.onAuthStateChanged((currentUser) => {
    setUser(currentUser);
  });

  const login = async (e) => {
    e.preventDefault();
    try {
      const user = await auth.signInWithEmailAndPassword(
        loginEmail,
        loginPassword
      );
      console.log(user);
      setLoginEmail("");
      setLoginPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => await auth.signOut();

  return (
    <div className="App">
      <Router>
        <NavigationHeader user={user} logout={logout} />
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/tracks">
            <Tracks user={user} />
          </Route>
          <Route path="/maker">
            <Maker user={user} />
          </Route>
          <Route path="/reels">
            <Reels user={user} />
          </Route>
          <Route path="/tracking">
            <Tracking user={user} />
          </Route>
          <Route path="/reel">
            <Reel />
          </Route>
          <Route path="/">
            <Login
              setLoginEmail={setLoginEmail}
              loginPassword={loginPassword}
              user={user}
              setLoginPassword={setLoginPassword}
              loginEmail={loginEmail}
              login={login}
              logout={logout}
            />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
