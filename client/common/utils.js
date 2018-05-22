export const combinActionTypes = actionTypeList => {
    const actionTypeMap = {};
    for (const item of actionTypeList) {
        const keys = Object.keys(item);
        for (const key of keys) {
            if (actionTypeMap[key] !== undefined) {
                throw new Error(`${key} is repeated! please name actionType by module name`);
            }
            actionTypeMap[key] = null;
        }
    }
    return actionTypeMap;
};

export const reducerUtil = (initialState, handlers) => {
    return (state = initialState, action) => {
        if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
            return handlers[action.type](state, action);
        }
        return state;
    };
};
