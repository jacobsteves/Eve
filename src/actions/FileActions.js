import * as types from '../constants/actionTypes';
import FileService from '../services/FileService';

export function saveFile(name, contents) {
  return dispatch =>
    new Promise((resolve, reject) => {
      FileService.saveFile(dispatch, name, contents).then((response) => {
        if (response.data) {
          dispatch({type: types.SAVE_FILE, response: response.data});
        } else {
          dispatch({type: types.SAVE_FILE_ERROR});
        }
        resolve(data);
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
