<?php
// $dir = '../';
// $files1 = scandir($dir);
// $files2 = scandir($dir, 1);

// print_r($files1);
// echo "<br>";
// print_r($files2);
function SearchDirectory($dir) {
  foreach (glob("$dir/*") as $filename) {
      echo "$filename size " . filesize($filename) . "<br>";
      if (is_dir($filename) && strpos($filename, 'node_modules') === false) {
        SearchDirectory($filename);
      }
  }
}

SearchDirectory('../..');
?>
