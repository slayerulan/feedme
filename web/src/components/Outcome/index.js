import React, { Component } from 'react';

import './style.css';

class Outcome extends Component {
    render () {
        const { name, price } = this.props;
        return <div className="oc">
            <span className="oc-desc">{ formatName(name) }<b className="odds">{ price }</b></span>
        </div>;
    }
}
const formatName = (name) => {
    if (!name) return '';
    return name.replace(/\|/g, '');
}
export default Outcome;