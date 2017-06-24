import * as types from '../constants/actionTypes';
import FileService from '../services/FileService';

export function saveFile(name, contents) {
  // console.log(name);
  // console.log(contents);
  return dispatch =>
    new Promise((resolve, reject) => {
      FileService.saveFile(dispatch, name, contents).then((response) => {
        console.log(response);
        if (response) {
          dispatch({type: types.SAVE_FILE, response: response});
        } else {
          dispatch({type: types.SAVE_FILE_ERROR});
        }
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
}

export function getSourceCode(url) {
  return dispatch =>
    new Promise((resolve, reject) => {
      FileService.getSourceCode(dispatch, url).then((response) => {
        if (response) {
          dispatch({type: types.GET_SOURCE_CODE, response: response});
        } else {
          dispatch({type: types.GET_SOURCE_CODE_ERROR});
        }
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
}

export function getFileDirectories() {
  return dispatch =>
    new Promise((resolve, reject) => {
      FileService.getFileDirectories(dispatch).then((response) => {
        if (response) {
          dispatch({type: types.GET_FILE_DIRECTORIES, response: response});
        } else {
          dispatch({type: types.GET_FILE_DIRECTORIES_ERROR});
        }
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
}

export function toggleEditMode(response) {
  return { response, type: types.TOGGLE_EDIT_MODE };
}

export function toggleMustSave(response) {
  return { response, type: types.TOGGLE_MUST_SAVE };
}

export function toggleSideMenu(response) {
  return { response, type: types.TOGGLE_SIDE_MENU };
}
