import {combineReducers} from 'redux';
import cartReducer from './componets/productTag/reducers/index';

const rootReducer = combineReducers({
    cart: cartReducer, 
});

export default rootReducer;