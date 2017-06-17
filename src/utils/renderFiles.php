<?php
  // $dir = '../';
  // $files1 = scandir($dir);
  // $files2 = scandir($dir, 1);

  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: POST');
  header('Access-Control-Max-Age: 1000');
  header('HTTP/1.1 200 OK');

  function SearchDirectory($dir, $root) {
    $fileArray = array();

    foreach (glob("$dir/*") as $fileName) {
      if (is_dir($fileName) && strpos($fileName, 'node_modules') === false) {
        $children = SearchDirectory($fileName, false);
      }
        $dataNodeArray = array(
          'name' => end(explode("/", $fileName)),
          'isDir' => is_dir($fileName),
          'location' => $fileName,
          'children' => $children
        );

        $fileArray[] = $dataNodeArray;
    }
    return $fileArray;
  }

  echo json_encode(SearchDirectory('../..', true));
?>
