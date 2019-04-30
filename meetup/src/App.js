import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Groups from "./views/groups";
import Show from "./views/show";
import New from "./views/new";
import Edit from "./views/edit";
import Upload from "./views/upload";

import "./App.css";

function App() {
  return (
    <div className="container">
      <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className="nav-link">Upload</Link>
              </li>
              <li className="nav-item">
                <Link to="/groups" className="nav-link">Groups</Link>
              </li>
            </ul>
          </div>
        </nav>

        <Switch>
          <Route path="/" exact component={Upload} />
          <Route path="/groups" exact component={Groups} />
          <Route path="/groups/new" exact component={New} />
          <Route path="/groups/:id" exact component={Show} />
          <Route path="/groups/:id/edit" exact component={Edit} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
