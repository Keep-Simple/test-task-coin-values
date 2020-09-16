import {combineReducers} from 'redux';
import listReducer from './listReducer/index';
import itemReducer from './itemReducer/index';

export default combineReducers({
    itemsList: listReducer,
    selectedItem: itemReducer
});
