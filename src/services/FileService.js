import $ from 'jQuery'

const FileService = {
  saveFile(dispatch, name, contents) {
    var Success = false;
    $.ajax({
      type: "POST",
      method: "POST",
      crossDomain: true,
      url: 'http://localhost:8000/src/utils/Files.php',
      dataType: 'JSON',
      data: {functionname: 'add', arguments: [name, contents]},

      success: function (obj, textstatus) {
        console.log(obj);
        console.log(textstatus);
        if( !('error' in obj) ) {
            return textstatus;
        }
        else {
            return 'error';
        }
      },
      error: function(obj) {
        // create variable error
        console.log('Error saving file.');
      }

    });
  },

  getSourceCode(dispatch, url) {
    var Success = false;
    var results = null;
    var curDirLen = 5;
    var dirUrl = url ? "http://localhost:8000" + url.substring(curDirLen, url.length) : 'http://localhost:8000/src/utils/readSourceCode.php';
    var tempUrl = url ? url : '../../src/routes.js';
    var getSource = $.ajax({
      type: "POST",
      method: "POST",
      crossDomain: true,
      url: 'http://localhost:8000/src/utils/readSourceCode.php',
      dataType: 'text',
      data: {url: tempUrl},

      success: function (obj, textstatus) {
        results = obj;
      },
      error: function(obj) {
        // create variable error
        results = obj;
      }

    });
    return $.when(getSource);
  },

  getFileDirectories(dispatch) {
    var Success = false;
    var results = null;
    var getFileDirs = $.ajax({
      type: "GET",
      method: "GET",
      crossDomain: true,
      url: 'http://localhost:8000/src/utils/renderFiles.php',
      dataType: 'JSON',

      success: function (obj, textstatus) {
        results = obj;
      },
      error: function(obj) {
        // create variable error
        results = obj;
      }

    });
    return $.when(getFileDirs);
  }
}

export default FileService;
