import React, { Component } from 'react';
import Outcome from '../Outcome';

import './style.css';

class Market extends Component {
    render() {
        const { name, outcomes } = this.props;
        const outcomeList = renderOutcomes(outcomes);
        return (<div className="market_section">
            <h3 className="section-head">{name}</h3>
            {outcomeList}
        </div>);
    }
}

const renderOutcomes = (outcomes) => {
  if (!outcomes || outcomes.length === 0) {
    return <p>Nothing yet. Come back soon.</p>;
  }
  return outcomes.map((outcome) => {
    return <Outcome key={outcome.outcomeId} {...outcome} />;
  });
}

export default Market;