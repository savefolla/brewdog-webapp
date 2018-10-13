import React, { Component } from 'react';
import BeerCard from "../Shared/BeerCard/BeerCard";
import "./Favorites.scss";
import Request from "request";
import BeerCounter from "../Shared/BeerCounter/BeerCounter";
import LoadingSpinner from "../Shared/LoadingSpinner/LoadingSpinner";

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteBeers: [],
      busy: true
    };
    this.onStarChange = this.onStarChange.bind(this);
  }
  componentDidMount() {
    Request(`https://api.punkapi.com/v2/beers?ids=${JSON.parse(localStorage.getItem('favoriteBeersIds')).join('|')}`, (error, response, body) => {
      if (error) return;
      this.setState({
        favoriteBeers: JSON.parse(body),
        busy: false
      });
    });
  }
  onStarChange(id) {
    this.setState(state => ({
      favoriteBeers: state.favoriteBeers.filter(beer => beer.id !== id)
    }))
  }
  render() {
    return (
      <div className="favorites">
        {this.state.busy ? <LoadingSpinner/> : <>
          <div className="favorites__total"><BeerCounter value={this.state.favoriteBeers.length}/></div>
          <div className="favorites__list">
            {this.state.favoriteBeers.map(beer => <BeerCard key={beer.id} onStarChange={this.onStarChange} beer={beer}/>)}
          </div>
        </>}
      </div>
    );
  }
}

export default Favorites;
