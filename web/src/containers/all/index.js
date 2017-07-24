import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../../components/Home';
import { getAllFixtures, fixturesSelector, getIsFetching } from '../../modules/fixtures';

const mapStateToProps = (state) => ({
    fixtures: fixturesSelector(state),
    isFetching: getIsFetching(state),
    title: 'All Events'
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getFixtures: getAllFixtures
}, dispatch);

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Home);