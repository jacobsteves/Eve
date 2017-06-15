<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Max-Age: 1000');

$f = file_get_contents("../../src/routes.js");
echo $f;
?>
