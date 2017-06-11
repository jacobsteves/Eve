import jQuery from 'jQuery'

const FileService = {
  saveFile(dispatch, name, contents) {
    jQuery.ajax({
      type: "POST",
      url: 'http://localhost:3000/utils/Files.php',
      dataType: 'json',
      data: {functionname: 'add', arguments: [name, contents]},

      success: function (obj, textstatus) {
        if( !('error' in obj) ) {
            console.log('ya');
            yourVariable = obj.result;
        }
        else {
            console.log('no');
        }
      }
    });
  }
}

export default FileService;
