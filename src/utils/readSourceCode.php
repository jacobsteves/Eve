<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Max-Age: 1000');

$f = file_get_contents("http://localhost:3000/index.js");
echo $f;
?>
