import React, { Component } from 'react';
import './BeerCard.scss';
import {withRouter} from "react-router";

class BeerCard extends Component {
  constructor(props) {
    super(props);
    this.navigate = this.navigate.bind(this);
  }
  navigate() {
    this.props.history.push(`/details/${this.props.beer.id}`);
  }
  render() {
    return (
      <div className='beer-card' onClick={this.navigate}>
        <div className='beer-card__name'>{this.props.beer.name}</div>
        <div className='beer-card__abv'>{this.props.beer.abv}%</div>
        <div className='beer-card__star'>
          {this.props.starred ? <i className="material-icons">star</i> : <i className="material-icons">star_border</i>}
        </div>
      </div>
    );
  }
}

export default withRouter(BeerCard);
