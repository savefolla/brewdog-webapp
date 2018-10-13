import React, { Component } from 'react';
import BeerCard from "../Shared/BeerCard/BeerCard";
import "./Homepage.scss";
import Request from 'request';
import LoadingSpinner from "../Shared/LoadingSpinner/LoadingSpinner";
import BeerCounter from "../Shared/BeerCounter/BeerCounter";

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beers: [],
      busy: true
    };
  }
  componentDidMount() {
    Request('https://api.punkapi.com/v2/beers', (error, response, body) => {
      if (error) return;
      this.setState({
        beers: JSON.parse(body),
        busy: false
      });
    });
  }
  render() {
    return (
      <div className='homepage'>
        <div className='homepage__filters'></div>
        {this.state.busy ? <LoadingSpinner /> : <div className='homepage__table'>
          <div className='homepage__table__header'>
            <div className='homepage__table__header__total'><BeerCounter value={this.state.beers.length}/></div>
            {/*<div className='homepage__table__header__paginator'>
              <div className='homepage__table__header__paginator__page homepage__table__header__paginator__page--selected'>1</div>
              <div className='homepage__table__header__paginator__page'>2</div>
              <div className='homepage__table__header__paginator__page'>3</div>
            </div>*/}
          </div>
          <div className='homepage__table__list'>
            {this.state.beers.map(beer => <BeerCard key={beer.id} beer={beer}/>)}
          </div>
        </div>}
      </div>
    );
  }
}

export default Homepage;
