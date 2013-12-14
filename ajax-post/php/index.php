<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

function reportError($msg) {
    http_response_code(400);
    $resp['error'] = $msg;
    echo json_encode($resp);
    exit();
}

if (strtolower($_SERVER['REQUEST_METHOD']) != 'post')  
    reportError('Request method must be POST!');

$postedData = json_decode(file_get_contents('php://input'));
if (NULL == $postedData)
    reportError('No data posted, or unable to decode it as JSON');
if (NULL == $postedData->first)
    reportError('No "first" property included in posted object!');
if (NULL == $postedData->last)
    reportError('No "last" property included in posted object!');

$resp['message'] = "Hello $postedData->first $postedData->last!";
echo json_encode($resp);
?>
