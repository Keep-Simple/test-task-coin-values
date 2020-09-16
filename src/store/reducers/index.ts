import {combineReducers} from 'redux';
import listReducer from './listReducer/index';
import itemReducer from './itemReducer/index';

export default combineReducers({
    itemsList: listReducer,
    selectedItem: itemReducer,
    isLoading: (state = false, action) => {
        switch (action.type) {
            case "trigger":
                return true;
            case "fulfill":
                return false;
            default:
                return state
        }
    }
});
