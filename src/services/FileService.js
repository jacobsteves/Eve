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
  }
}

export default FileService;
