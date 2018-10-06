import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import Homepage from "./homepage/Homepage";
import Details from "./details/details";
import Favorites from "./favorites/Favorites";
import Header from "./core/header/header";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
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
