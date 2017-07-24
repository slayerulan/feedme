import React, { Component } from 'react';
import moment from 'moment';
import Market from '../Market';

import './style.css';

class Fixture extends Component {
  constructor(props) {
    super(props);
    const { id } = this.props.match.params;
    this.state = { id };
  }
  componentWillMount() {
    this.refresh = setTimeout(() => {
      this.props.getFixture(this.state.id);
    }, 1000);
    this.props.getFixture(this.state.id);
  }
  componentWillUnmount(){
    clearInterval(this.refresh);
  }
  render() {
    const { fixture } = this.props;
    if (!fixture) {
        return <p> Loading... </p>;
    }
  
    const markets = renderMarkets(fixture.markets)

    const { name, subCategory, startTime } = fixture;
    return (
      <div className="page">
        <div className="content-head">
          <h1>{formatName(name)}</h1>
          <h2 className="event-title sub-head">
              {subCategory} | {formatDate(startTime)} | {formatTime(startTime)}
          </h2>
          {markets}
      </div>
      </div>
    );
  }
};

const renderMarkets = (markets) => {
  if (!markets || markets.length.length === 0) {
    return <p>Nothing yet. Come back soon.</p>;
  }
  return markets.map((market) => {
    return <Market key={market.marketId} {...market} />;
  });
}
const formatName = (name) => {
  return name.replace(/\|/g, '');
}
const formatDate = (time) => {
  return moment(time).format('dddd Do MMMM YYYY');
}
const formatTime = (time) => {
  return moment(time).format('h:mm a');
}

export default Fixture;