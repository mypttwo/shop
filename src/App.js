import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Admin from "./containers/admin";
import Home from "./containers/home";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/admin">
            <Admin></Admin>
          </Route>

          <Route path="/">
            <Home></Home>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
