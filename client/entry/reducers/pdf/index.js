import _ from 'lodash';
import {reducerUtil} from 'app/common/utils';
import INITIALSTATE from '../../initialState';

const updateHtmlData = (state, action) => {
    const htmlData = action.payload;
    return {
        ...state,
        htmlData
    };
};

export default reducerUtil(INITIALSTATE.pdf, {
    UPDATE_MARKDOWN_HTML_DATA: updateHtmlData
});
