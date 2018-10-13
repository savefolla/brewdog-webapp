import React, { Component } from 'react';
import {NavLink} from "react-router-dom";
import "./Header.scss";
import {withRouter} from "react-router";

import logo from '../../assets/images/585e65d4cb11b227491c3409.png';
import beerIcon from '../../assets/images/icons8-lattina-di-birra-50.png';
import diceIcon from '../../assets/images/icons8-dado-32.png';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="header__links header__links--desktop">
          {this.props.location.pathname === '/' ? <div className="header__links__logo">Brewdog</div> : <NavLink exact={true} to="/">Tutte le birre</NavLink>}
          <NavLink exact={true} to="/details/random">Una birra random</NavLink>
          <NavLink to="/favorites">Preferiti</NavLink>
        </div>
        <div className="header__links header__links--mobile">
          {this.props.location.pathname === '/' ? <div className="header__links__logo"><img alt='' src={logo}/></div> : <NavLink exact={true} to="/"><img alt='' src={beerIcon}/></NavLink>}
          <NavLink exact={true} to="/details/random"><img alt='' src={diceIcon}/></NavLink>
          <NavLink to="/favorites"><i className="material-icons">star</i></NavLink>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
