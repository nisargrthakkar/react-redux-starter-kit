import HomeView from './HomeView';            //eslint-disable-line
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    increment,
    decrement
} from './HomeState';

const mapStateToProps = state => ({
    count: state.home.count
});

const mapDispatchToProps = dispatch => bindActionCreators({
    increment,
    decrement
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeView);
