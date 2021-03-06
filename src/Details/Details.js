import React, { Component } from 'react';
import Request from "request";
import LoadingSpinner from "../shared/LoadingSpinner/LoadingSpinner";

import './Details.scss';
import {onBeerStarClick} from "../shared/helpers/helpers";

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beer: {},
      starred: false,
      busy: true
    };
    this.getBeer();
    this.onStarClick = this.onStarClick.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id && this.props.match.params.id === 'random') {
      this.setState({
        beer: {},
        busy: true
      });
      this.getBeer();
    }
  }
  getBeer() {
    Request(`https://api.punkapi.com/v2/beers/${this.props.match.params.id}`, (error, response, body) => {
      if (error) return;
      const beer = JSON.parse(body)[0];
      this.setState({
        beer,
        starred: localStorage.getItem('favoriteBeersIds') && localStorage.getItem('favoriteBeersIds').includes(beer.id),
        busy: false
      });
      this.props.history.push(`${beer.id}`);
    });
  }
  onStarClick() {
    onBeerStarClick(this.state.beer.id);
    this.setState(state => ({
      starred: !state.starred
    }));
  }
  render() {
    return (
      <div className='details'>
        {this.state.busy ? <LoadingSpinner/> : <>
          <div className='details__top'>
            <div className='details__top__name'>
              <div className='details__top__name__container'>
                <div className='details__top__name__title'>
                  <div className='details__top__name__title__star' onClick={this.onStarClick}>
                    {this.state.starred ? <i className="material-icons">star</i> : <i className="material-icons">star_border</i>}
                  </div>
                  {this.state.beer.name}
                  </div>
                <div className='details__top__name__tagline'>{this.state.beer.tagline}</div>
              </div>
            </div>
            <div className='details__top__description'>
              <div className='details__top__description__container'>{this.state.beer.description}</div>
            </div>
            <div className='details__top__image'>
              <div className='details__top__image__container'>
                <div className='details__top__image__container__circle'>
                  <img alt='' src={this.state.beer.image_url} />
                </div>
              </div>
            </div>
          </div>
          <div className='details__center'>
            <div className='details__center__container'>
              {this.state.beer.abv && <div>ABV: {this.state.beer.abv}%</div>}
              {this.state.beer.srm && <div>SRM: {this.state.beer.srm}</div>}
              {this.state.beer.ebc && <div>EBC: {this.state.beer.ebc}</div>}
              {this.state.beer.ph && <div>PH: {this.state.beer.ph}</div>}
            </div>
          </div>
          <div className='details__bottom'>
            <div className='details__bottom__header'>Abbinamenti</div>
            <div className='details__bottom__foods'>
              {this.state.beer.food_pairing && this.state.beer.food_pairing.map(food => <div key={food} className='details__bottom__foods__food'>"{food}"</div>)}
            </div>
          </div>
        </>}
      </div>
    );
  }
}

export default Details;
