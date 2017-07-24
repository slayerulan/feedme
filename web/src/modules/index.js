import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import fixtures from './fixtures';
import selectedFixture from './selectedFixture';

export default combineReducers({
    routing: routerReducer,
    fixtures,
    selectedFixture
});