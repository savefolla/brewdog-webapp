import React, { Component } from 'react';
import BeerCard from "../Shared/BeerCard/BeerCard";
import "./Homepage.scss";

class Homepage extends Component {
  render() {
    return (
      <div className='homepage'>
        <div className='homepage__filters'></div>
        <div className='homepage__table'>
          <div className='homepage__table__header'>
            <div className='homepage__table__header__total'>23 birre</div>
            <div className='homepage__table__header__paginator'>
              <div className='homepage__table__header__paginator__page homepage__table__header__paginator__page--selected'>1</div>
              <div className='homepage__table__header__paginator__page'>2</div>
              <div className='homepage__table__header__paginator__page'>3</div>
            </div>
          </div>
          <div className='homepage__table__list'>
            <BeerCard starred={true} beer={{id: 1, name: 'Punk IPA 2007 - 2010', abv: 5.5}}/>
            <BeerCard starred={false} beer={{id: 2, name: 'Punk IPA 2007 - 2010', abv: 5.5}}/>
            <BeerCard starred={true} beer={{id: 3, name: 'Punk IPA 2007 - 2010', abv: 5.5}}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
