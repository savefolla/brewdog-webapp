import React, { Component } from 'react';
import Request from "request";

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
        busy: false
      });
      this.getBeer();
    }
  }
  getBeer() {
    Request(`https://api.punkapi.com/v2/beers/${this.props.match.params.id}`, (error, response, body) => {
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
      <div>{this.state.beer.name}</div>
    );
  }
}

export default Details;
