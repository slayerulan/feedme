import axios from 'axios';
import { createSelector } from 'reselect';

export const GET_FIXTURE_SUCCESS = 'fixture/GET_FIXTURE_SUCCESS';
export const GET_FIXTURE_REQUESTED = 'fixture/GET_FIXTURE_REQUESTED';

const initialState = {
    isFetching: false,
    id: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
    case GET_FIXTURE_SUCCESS:
        return  Object.assign(state, {
            id: action.fixture._id,
        });
    case GET_FIXTURE_REQUESTED:
        return Object.assign(state, {
            isFetching: true
        });
    default:
        return state;
    }
};

export const getFixture = (id) => {
    return (dispatch) => {
        dispatch({
            type: GET_FIXTURE_REQUESTED
        });

        axios.get(`/api/fixture/${id}`)
        .then((response) => {
            dispatch({
                type: GET_FIXTURE_SUCCESS,
                fixture: response.data.fixture
            });
        });
    };
};

const fixturesSelector = state => {
    return state.fixtures.fixtures;
};
const selectedFixtureSelector = state => {
    return state.selectedFixture.id;
};
export const fixtureSelector = createSelector(
    fixturesSelector,
    selectedFixtureSelector,
    (items, id) => items[id]
);
export const getIsFetching = state => {
    return state.selectedFixture.isFetching;
};
