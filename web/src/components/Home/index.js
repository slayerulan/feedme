import React, { Component } from 'react';
import FixtureListItem from '../../components/FixtureListItem'

import './style.css';

class Home extends Component {
  componentWillMount () {
    this.refresh = setInterval(() => {
      this.props.getFixtures();
    }, 1000);
    this.props.getFixtures();
  }
  componentWillUnmount(){
    clearInterval(this.refresh);
  }
  render() {
    const { fixtures, isFetching, title } = this.props;
    return (
      <div className="page">
        <h2 className="banner">{title} {renderLoadingIcon(isFetching)}</h2>
        {renderFixturesList(fixtures, isFetching)}
      </div>
    );
  }
}
const renderLoadingIcon = (isFetching) => {
  if (isFetching)
    return <span>...</span>
  return <span></span>
}

const renderFixturesList = (fixtures, isFetching)  =>{

  if (!fixtures || fixtures.length === 0)
    return <p> No Fixtures </p>;

  const fixtureList = fixtures.map((fixture) => {
    return <FixtureListItem key={fixture.eventId} {...fixture} />;
  });

  return (
    <table className="events_table">
      <thead>
        <tr>
          <th className="start" colSpan="2" scope="col">Start</th>
          <th scope="col">Sport</th>
          <th scope="col">League</th>
          <th scope="col" colSpan="2">Event</th>
        </tr>
      </thead>
      <tbody>
        {fixtureList}
      </tbody>
    </table>
  );
};

export default Home;