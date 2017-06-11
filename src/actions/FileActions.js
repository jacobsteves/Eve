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
