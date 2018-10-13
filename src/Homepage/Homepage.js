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
      query: {
        name: '',
        from: '',
        to: ''
      },
      busy: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.fetchBeers = this.fetchBeers.bind(this);
  }
  componentDidMount() {
    this.fetchBeers(this.state.query);
  }
  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState(state => {
      let query = state.query;
      query[name] = value;
      this.fetchBeers(query);
      return { query, busy: true }
    });
  }
  fetchBeers(query) {
    // per_page max = 80, however we don't know how many beers there are in total
    Request(`https://api.punkapi.com/v2/beers?page=1&per_page=80&${this.composeQuery(query)}`, (error, response, body) => {
      if (error) return;
      this.setState({
        beers: JSON.parse(body),
        busy: false
      });
    });
  }
  composeQuery(query) {
    let queryString = '';
    if (query.name) queryString = queryString.concat(`beer_name=${query.name}&`);
    // if (query.name) queryString = queryString.concat(`beer_name=${query.name}|food=${query.name}&`);
    if (query.from) queryString = queryString.concat(`abv_gt=${query.from}&`);
    if (query.to) queryString = queryString.concat(`abv_lt=${query.to}`);
    return queryString;
  }
  render() {
    return (
      <div className='homepage'>
        <div className='homepage__filters'>
          <div className='homepage__filters__container'>
            <div className='homepage__filters__container__name'>
              <input name='name' placeholder='Filtra per nome o abbinamento' onChange={this.handleChange} />
            </div>
            <div className='homepage__filters__container__alcohol'>
              <div>Gradazione alcolica (da - a)</div>
              <div>
                <input name='from' placeholder='Da' onChange={this.handleChange} />
                <span className='homepage__filters__container__alcohol__space'></span>
                <input name='to' placeholder='A' onChange={this.handleChange} />
              </div>
            </div>
          </div>
        </div>
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
