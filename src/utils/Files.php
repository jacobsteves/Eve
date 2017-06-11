<?php

  $arrayResult = array();

  if( !isset($_POST['functionname']) ) {
    $arrayResult['error'] = 'No function name!';
  }

    if( !isset($_POST['arguments']) ) {
      $arrayResult['error'] = 'No function arguments!';
    }

    if( !isset($arrayResult['error']) ) {

      switch($_POST['functionname']) {
        case 'add':
          if( !is_array($_POST['arguments']) || (count($_POST['arguments']) < 2) ) {
            $arrayResult['error'] = 'Error in arguments!';
          }
          else {
            $fileName = $_POST['arguments'][0];
            $contents = $_POST['arguments'][1];
            file_put_contents($fileName, $contents, FILE_APPEND | LOCK_EX);
            $arrayResult['result'] = add(floatval($_POST['arguments'][0]), floatval($_POST['arguments'][1]));
          }
          break;

        default:
          $arrayResult['error'] = 'Not found function '.$_POST['functionname'].'!';
          break;
        }

    }

    echo json_encode($arrayResult);

?>
