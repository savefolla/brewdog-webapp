import React, { Component } from 'react';
import './BeerCard.scss';
import {withRouter} from "react-router";

class BeerCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starred: JSON.parse(localStorage.getItem('favoriteBeersIds')).indexOf(this.props.beer.id) !== -1
    };
    this.navigate = this.navigate.bind(this);
    this.onStarClick = this.onStarClick.bind(this);
  }
  navigate() {
    this.props.history.push(`/details/${this.props.beer.id}`);
  }
  onStarClick(event) {
    let favoriteBeersIds = JSON.parse(localStorage.getItem('favoriteBeersIds'));
    if (favoriteBeersIds) {
      const index = favoriteBeersIds.indexOf(this.props.beer.id);
      if (index === -1) favoriteBeersIds.push(this.props.beer.id);
      else favoriteBeersIds.splice(index, 1);
      localStorage.setItem('favoriteBeersIds', JSON.stringify(favoriteBeersIds));
    } else {
      localStorage.setItem('favoriteBeersIds', JSON.stringify([this.props.beer.id]));
    }
    this.setState(state => ({
      starred: !state.starred
    }));
    if (this.props.onStarChange) this.props.onStarChange(this.props.beer.id);
    event.stopPropagation();
  }
  render() {
    return (
      <div className='beer-card' onClick={this.navigate}>
        <div className='beer-card__name'>{this.props.beer.name}</div>
        <div className='beer-card__abv'>{this.props.beer.abv}%</div>
        <div className='beer-card__star' onClick={this.onStarClick}>
          {this.state.starred ? <i className="material-icons">star</i> : <i className="material-icons">star_border</i>}
        </div>
      </div>
    );
  }
}

export default withRouter(BeerCard);
