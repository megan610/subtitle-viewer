import _ from 'lodash';
import keymirror from 'keymirror';
import {combinActionTypes} from 'app/common/utils';
import entryActionTypes from 'app/entry/actionTypes';

const actionTypeList = [entryActionTypes];

export default keymirror(combinActionTypes(actionTypeList));
