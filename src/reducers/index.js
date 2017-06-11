import { combineReducers } from 'redux';
import fuelSavings from './fuelSavingsReducer';
import fileData from './FileDataReducer';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  fuelSavings,
  fileData,
  routing: routerReducer
});

export default rootReducer;
