import React, { Component } from 'react';

class BeerCounter extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.value === 0 && 'Nessuna birra'}
        {this.props.value === 1 && 'Una birra'}
        {this.props.value > 1 && `${this.props.value} birre`}
      </React.Fragment>
    );
  }
}

export default BeerCounter;
