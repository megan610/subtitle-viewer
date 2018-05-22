import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from './action';
import Main from './Main';

const mapStateToProps = state => {
    return {
        ...state.preview,
        htmlData: state.entry.pdf.htmlData
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
