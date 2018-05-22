import actionTypes from 'app/actionTypes';

export const onUploadChanged = info => dispatch => {
    const {file, fileList} = info;
    const {status, name, response} = file;
    if (status !== 'uploading') {
        console.log(file, fileList);
    }
    if (status === 'done') {
        dispatch({
            type: actionTypes.UPDATE_PARSED_DATA_SUCCESS,
            payload: {
                fileName: name,
                data: response.data
            }
        });
    }
    else if (status === 'error') {
        dispatch({
            type: actionTypes.UPDATE_PARSED_DATA_FAILURE,
            payload: {
                fileName: name
            }
        });
    }
};

export const onUpdateHtmlData = data => dispatch => {
    dispatch({
        type: actionTypes.UPDATE_MARKDOWN_HTML_DATA,
        payload: data
    });
};

export const onGeneratePdf = () => (dispatch, getState) => {
    const htmlData = getState().entry.pdf.htmlData;
};
