import React, { Component } from 'react';
import BeerCard from "../Shared/BeerCard/BeerCard";
import "./Favorites.scss";

class Favorites extends Component {
  render() {
    return (
      <div className="favorites">
        <div className="favorites__total">3 birre</div>
        <div className="favorites__list">
          <BeerCard starred={true} beer={{id: 1, name: 'Punk IPA 2007 - 2010', abv: 5.5}}/>
          <BeerCard starred={false} beer={{id: 2, name: 'Punk IPA 2007 - 2010', abv: 5.5}}/>
          <BeerCard starred={true} beer={{id: 3, name: 'Punk IPA 2007 - 2010', abv: 5.5}}/>
        </div>
      </div>
    );
  }
}

export default Favorites;
