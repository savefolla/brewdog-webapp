import React, { Component } from 'react';
import Request from "request";
import LoadingSpinner from "../Shared/LoadingSpinner/LoadingSpinner";

import './Details.scss';

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beer: {},
      busy: true
    };
    this.getBeer();
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
        busy: false
      });
      this.props.history.push(`${beer.id}`);
    });
  }
  render() {
    return (
      <div className='details'>
        {this.state.busy ? <LoadingSpinner/> : <>
          <div className='details__top'></div>
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
