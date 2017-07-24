import axios from 'axios';
import _ from 'lodash';

export const GET_FIXTURES_REQUESTED = 'fixture/GET_FIXTURES_REQUESTED';
export const GET_FIXTURES_SUCCESS = 'fixture/GET_FIXTURES_SUCCESS';
export const GET_FIXTURE_SUCCESS = 'fixture/GET_FIXTURE_SUCCESS';

const initialState = {
    fixtures: [],
    isFetching: false
};

export default (state = initialState, action) => {
    switch (action.type) {
    case GET_FIXTURES_SUCCESS: {
        const newState =Object.assign({}, state);
        newState.fixtures = _.keyBy(action.fixtures, '_id');
        newState.isFetching = false;
        return newState;
    }   
    case GET_FIXTURES_REQUESTED: {
        const newState = Object.assign({}, state);
        newState.isFetching = true;
        return newState;
    }
    case GET_FIXTURE_SUCCESS: {
        const newState = Object.assign({}, state);
        newState.fixtures[action.fixture._id] = action.fixture;
        return newState;
    }
    default:
        return state;
    }
};

export const getAllFixtures = () => {
    return (dispatch) => {
        dispatch({
            type: GET_FIXTURES_REQUESTED
        });

        axios.get('/api/fixtures/all')
        .then((response) => {
            dispatch({
                type: GET_FIXTURES_SUCCESS,
                fixtures: response.data.fixtures
            });
        });
    };
};
export const getUpcomingFixtures = () => {
    return (dispatch) => {
        dispatch({
            type: GET_FIXTURES_REQUESTED
        });

        axios.get('/api/fixtures/upcoming')
        .then((response) => {
            dispatch({
                type: GET_FIXTURES_SUCCESS,
                fixtures: response.data.fixtures
            });
        });
    };
};

export const fixturesSelector = state => {
    return Object.values(state.fixtures.fixtures);
};
export const getIsFetching = state => {
    return state.selectedFixture.isFetching;
};