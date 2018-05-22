import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from './action';
import Main from './Main';

const mapStateToProps = state => {
    return {
        ...state.entry
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
