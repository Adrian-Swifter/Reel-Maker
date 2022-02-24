import "./App.css";
import NavigationHeader from "./components/NavigationHeader";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Maker from "./components/routes/Maker";
import Reels from "./components/routes/Reels";
import Tracking from "./components/routes/Tracking";
import Tracks from "./components/routes/Tracks";
import Reel from "./components/Reel";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div className="App">
      <Router>
        <NavigationHeader />
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
          <Route path="/reel">
            <Reel />
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
