import * as ActionTypes from '../constants/actionTypes';
import objectAssign from 'object-assign';
import initialState from './initialState';

export default function fileDataReducer(state = initialState.fileData, action) {
  const getInitialState = () => {
    return {
      currentFile: '',
      fileDirectories: '',
      editSettings: false,
      mustSave: false
    };
  };
  let newState;

  switch (action.type) {
    case ActionTypes.GET_SOURCE_CODE:
      newState = objectAssign({}, state);
      newState.currentFile = action.response;
      return newState;

    case ActionTypes.GET_FILE_DIRECTORIES:
      newState = objectAssign({}, state);
      newState.fileDirectories = action.response;
      return newState;

    case ActionTypes.TOGGLE_EDIT_MODE:
      newState = objectAssign({}, state);
      newState.editSettings = action.response;
      return newState;

    case ActionTypes.TOGGLE_MUST_SAVE:
      newState = objectAssign({}, state);
      newState.mustSave = action.response;
      return newState;

    case ActionTypes.SAVE_FILE:
      newState = objectAssigm({}, state);
      newState.mustSave = false;
      return newState;
    
    default:
      return state;
  }
}
