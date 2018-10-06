import React, { Component } from 'react';
import './App.scss';
import { BrowserRouter, Route } from "react-router-dom";
import Homepage from "./Homepage/Homepage";
import Details from "./Details/Details";
import Favorites from "./Favorites/Favorites";
import Header from "./Core/Header/Header";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Header/>
          <Route exact path="/" component={Homepage} />
          <Route path="/details/:id" component={Details} />
          <Route path="/favorites" component={Favorites} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
