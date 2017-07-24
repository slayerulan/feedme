import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../../components/Home';
import { getUpcomingFixtures, fixturesSelector, getIsFetching } from '../../modules/fixtures';

const mapStateToProps = (state) => ({
    fixtures: fixturesSelector(state),
    isFetching: getIsFetching(state),
    title: 'Forthcoming Events'
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getFixtures: getUpcomingFixtures
}, dispatch);

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Home);