<?php
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: POST');
  header('Access-Control-Max-Age: 1000');
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
            $directory = "../../files/";
            $fileName = $directory . $_POST['arguments'][0];
            $contents = $_POST['arguments'][1];
            file_put_contents($fileName, $contents, LOCK_EX);
            $results = array();
            array_push($results, $_POST['arguments'][0], $_POST['arguments'][1]);
            $arrayResult['result'] = $results;
          }
          break;

        default:
          $arrayResult['error'] = 'Not found function '.$_POST['functionname'].'!';
          break;
        }

    }

    header('HTTP/1.1 200 OK');
    echo json_encode($arrayResult);

?>
