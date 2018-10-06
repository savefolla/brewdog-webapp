import React, { Component } from 'react';
import {Link} from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div>
        <Link to="/">Tutte le birre</Link>
        <Link to="/details">Una birra random</Link>
        <Link to="/favorites">Preferiti</Link>
      </div>
    );
  }
}

export default Header;
