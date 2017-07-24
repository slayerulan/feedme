import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getFixture, fixtureSelector, getIsFetching } from '../../modules/selectedFixture';

import Fixture from '../../components/Fixture';

const mapStateToProps = (state) => {
    const fixture = fixtureSelector(state);
    const isFetching = getIsFetching(state);
    return {
        fixture,
        isFetching
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({
    getFixture
}, dispatch);

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Fixture);