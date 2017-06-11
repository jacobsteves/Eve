import * as ActionTypes from '../constants/actionTypes';
import objectAssign from 'object-assign';
import initialState from './initialState';

export default function fileDataReducer(state = initialState.fileData, action) {
  const getInitialState = () => {
    return {
      currentFile: ''
    };
  };
  let newState;

  switch (action.type) {
    case ActionTypes.GET_SOURCE_CODE:
      newState = objectAssign({}, state);
      newState.currentFile = action.response;
      return newState;

    default:
      return state;
  }
}
