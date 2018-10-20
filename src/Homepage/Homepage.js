import React, {Component} from 'react';
import BeerCard from "../shared/BeerCard/BeerCard";
import "./Homepage.scss";
import Request from 'request';
import LoadingSpinner from "../shared/LoadingSpinner/LoadingSpinner";
import BeerCounter from "../shared/BeerCounter/BeerCounter";
import {DebounceInput} from 'react-debounce-input';
import InfiniteScroll from 'react-infinite-scroller';

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beers: [],
      query: {
        name: '',
        from: '',
        to: '',
        page: 1,
        per_page: 25
      },
      hasMore: true,
      busy: true,
      appendingBeers: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.fetchBeers = this.fetchBeers.bind(this);
    this.loadMoreBeers = this.loadMoreBeers.bind(this);
  }

  componentDidMount() {
    this.fetchBeers(this.state.query);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState(state => {
      let query = state.query;
      query.page = 1;
      query[name] = value;
      this.fetchBeers(query);
      return {query, busy: true, appendingBeers: false}
    });
  }

  fetchBeers(query, append = false) {
    // per_page max = 80, however we don't know how many beers there are in total
    Request(`https://api.punkapi.com/v2/beers?${this.composeQuery(query)}`, (error, response, body) => {
      if (error) return;
      this.setState(state => ({
        beers: append ? [...state.beers, ...JSON.parse(body)] : JSON.parse(body),
        busy: false,
        hasMore: JSON.parse(body).length === state.query.per_page, // either i am on the last page or there are more
        appendingBeers: false
      }));
    });
  }

  loadMoreBeers(page) {
    this.setState(state => {
      let query = state.query;
      query.page = page;
      this.fetchBeers(query, true);
      return {query, hasMore: false, appendingBeers: true}
    });
  }

  composeQuery(query) {
    let queryString = `page=${query.page}&per_page=${query.per_page}&`;
    if (query.name) queryString = queryString.concat(`beer_name=${query.name}&`);
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
              <DebounceInput debounceTimeout={300} name='name'
                             placeholder='Filtra per nome o abbinamento'
                             onChange={this.handleChange}/>
            </div>
            <div className='homepage__filters__container__alcohol'>
              <div>Gradazione alcolica (da - a)</div>
              <div>
                <DebounceInput debounceTimeout={300} name='from' placeholder='Da' onChange={this.handleChange}/>
                <span className='homepage__filters__container__alcohol__space'></span>
                <DebounceInput debounceTimeout={300} name='to' placeholder='A' onChange={this.handleChange}/>
              </div>
            </div>
          </div>
        </div>
        {this.state.busy ? <LoadingSpinner/> : <div className='homepage__table'>
          <div className='homepage__table__header'>
            <div className='homepage__table__header__total'><BeerCounter value={this.state.beers.length}/></div>
            {/*<div className='homepage__table__header__paginator'>
              <div className='homepage__table__header__paginator__page homepage__table__header__paginator__page--selected'>1</div>
              <div className='homepage__table__header__paginator__page'>2</div>
              <div className='homepage__table__header__paginator__page'>3</div>
            </div>*/}
          </div>
          <div className='homepage__table__list'>
            <InfiniteScroll
              pageStart={1}
              loadMore={this.loadMoreBeers}
              hasMore={this.state.hasMore}
              threshold={500}>
              {this.state.beers.map(beer => <BeerCard key={beer.id} beer={beer}/>)}
            </InfiniteScroll>
            {this.state.appendingBeers && <LoadingSpinner/>}
          </div>
        </div>}
      </div>
    );
  }
}

export default Homepage;
