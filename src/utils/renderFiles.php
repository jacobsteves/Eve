<?php
  // $dir = '../';
  // $files1 = scandir($dir);
  // $files2 = scandir($dir, 1);

  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: POST');
  header('Access-Control-Max-Age: 1000');
  header('HTTP/1.1 200 OK');

  $fileArray = array();

  function SearchDirectory($dir) {
    global $fileArray;
    foreach (glob("$dir/*") as $fileName) {
        array_push($fileArray, $fileName);
        if (is_dir($fileName) && strpos($fileName, 'node_modules') === false) {
          SearchDirectory($fileName);
        }
    }
  }

  SearchDirectory('../..');

  // $len = count($fileArray);
  // for($i = 0; $i < $len; $i++) {
  //   echo $fileArray[$i];
  //   echo "<br>";
  // }

  echo json_encode($fileArray);
?>
