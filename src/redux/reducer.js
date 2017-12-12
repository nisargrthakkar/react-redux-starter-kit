import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import HomeStateReducer from '../modules/home/HomeState';

export default combineReducers({
    router: routerReducer,
    home: HomeStateReducer
});
