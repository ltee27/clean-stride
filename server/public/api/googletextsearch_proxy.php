<?php

header('Content-Type: application/json');
$params = '';
$proxyURL = "https://maps.googleapis.com/maps/api/place/textsearch/json";

foreach ($_GET as $key => $value) {
    $params .= ("&$key=" . urlencode($value));
}

$headers = apache_request_headers();

$curl = curl_init();
$headerParams = ['Authorization:Bearer AIzaSyCC4k-zZUEeozf7452tXNKmHntB33napHg'];

curl_setopt_array($curl, array(
    CURLOPT_URL => "$proxyURL?$params",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_SSL_VERIFYHOST => 0,
    CURLOPT_SSL_VERIFYPEER => 0,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET",
    CURLOPT_HTTPHEADER => $headerParams
));

$response = curl_exec($curl);
$err = curl_error($curl);
echo $err;
echo $response;
