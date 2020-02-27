<?php
$baseURL = "https://api.yelp.com/v3/businesses/";

header('Content-Type: application/json');
$params = '';
$id = $_GET['id'];
$proxyURL = $baseURL . $id . '/reviews';

foreach ($_GET as $key => $value) {
    if ($key !== 'id') {
        $params .= ("&$key=" . urlencode($value));
    }
}

$headers = apache_request_headers();

$curl = curl_init();
$headerParams = ['Authorization:Bearer _l5FHh7iIt2b-IZHeQEvb3L8pmRoIy2pE40et_6aEdVdk8_aDYhvj7ql2RGIW1PDOfOBSDoeRW5pdSzRzKGbSybMdC3wNVY0o-bA0TRfRSO2A9P6lWW1gfRwBNhAXXYx'];

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
