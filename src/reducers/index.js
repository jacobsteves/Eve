import { combineReducers } from 'redux';
import fileData from './FileDataReducer';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  fileData,
  routing: routerReducer
});

export default rootReducer;
