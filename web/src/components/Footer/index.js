import React from 'react';
import './style.css';

export default class Footer extends React.Component {
    constructor (props) {
        super(props)

        setInterval(() => {
            this.setState({ time: getTime()});
        }, 500);
        this.state = { time: getTime() };
    }
    render () {
    return (
        <div id="footer">
            <div className="wrapper">
                <div className="col">
                    <img src="//st1.skybet.com/static/sportsbook/img/content/logos/sky-b-g-logo.gif" alt="Sky Betting and Gaming" id="sky-bg-logo" />
                </div>
                <div className="feedback__btn-holder">
                    <p id="copyright">© 2017 Bonne Terre Limited or its affiliated companies. The Sky trademarks are owned by the Sky Plc group of companies and are used under licence. All rights reserved.
                        <span id="site-clock">{this.state.time}</span>
                    </p>
                </div>
            </div>
        </div>);
    }
};

const getTime = () => {
    const now = new Date();
    return ("0" + now.getHours()).slice(-2)   + ":" + 
    ("0" + now.getMinutes()).slice(-2) + ":" + 
    ("0" + now.getSeconds()).slice(-2);
};