import $ from 'jQuery'

const FileService = {
  saveFile(dispatch, name, contents) {
    $.ajax({
      type: "POST",
      method: "POST",
      crossDomain: true,
      url: 'http://localhost:8000/src/utils/Files.php',
      dataType: 'JSON',
      data: {functionname: 'add', arguments: [name, contents]},

      success: function (obj, textstatus) {
        if( !('error' in obj) ) {
            console.log('ya');
            console.log(obj);
        }
        else {
            console.log('no');
        }
      }
    });
  }
}

export default FileService;
