import React, { Component } from 'react';
import {NavLink} from "react-router-dom";
import "./Header.scss";
import {withRouter} from "react-router";

class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="header__links">
          {this.props.location.pathname === '/' ? <div className="header__links__logo">Brewdog</div> : <NavLink exact={true} to="/">Tutte le birre</NavLink>}
          <NavLink exact={true} to="/details/random">Una birra random</NavLink>
          <NavLink to="/favorites">Preferiti</NavLink>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);