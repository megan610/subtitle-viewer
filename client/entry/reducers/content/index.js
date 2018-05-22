import _ from 'lodash';
import {reducerUtil} from 'app/common/utils';
import INITIALSTATE from '../../initialState';

const updateContent = (state, action) => {
    const {data} = action.payload;
    return data.content || [];
};

export default reducerUtil(INITIALSTATE.content, {
    UPDATE_PARSED_DATA_SUCCESS: updateContent
});
