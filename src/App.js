import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Homepage from "./homepage/Homepage";
import Details from "./details/details";
import Favorites from "./favorites/Favorites";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/details">Details</Link>
            </li>
            <li>
              <Link to="/favorites">Favorites</Link>
            </li>
          </ul>

          <hr />

          <Route exact path="/" component={Homepage} />
          <Route path="/details" component={Details} />
          <Route path="/favorites" component={Favorites} />
        </div>
      </Router>
    );
  }
}

export default App;
