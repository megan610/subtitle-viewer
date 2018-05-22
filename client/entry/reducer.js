import {combineReducers} from 'redux';
import {content, pdf} from './reducers';

export default combineReducers({
    content,
    pdf
});
