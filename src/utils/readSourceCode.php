<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Max-Age: 1000');

$url = "../../src/routes.js";

if( isset($_POST['url']) ) {
  $url = $_POST['url'];
}

$f = file_get_contents("$url");
echo $f;
?>
