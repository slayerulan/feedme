import React from 'react';
import { Route, Link } from 'react-router-dom';
import Home from '../home';
import All from '../all';
import Fixture from '../fixture';
import Footer from '../../components/Footer';

import './style.css';

const App = () => (
  <div className="app">
    <div className="app-header">
      <Link to="/"><img src='//st1.skybet.com/static/bet/img/skybet-main-logo-desktop.png' className="app-header__logo" alt="logo" /></Link>
      <div className="account-bar__right">
        <Link to="/">Upcoming Events</Link>
        <Link to="/all">All Events</Link>
      </div>
    </div>
    <div className="page-wrapper">
      <Route exact path="/" component={Home} />
      <Route exact path="/all" component={All} />
      <Route exact path="/fixture/:id" component={Fixture} />
    </div>
    <Footer/>
  </div>
);

export default App;