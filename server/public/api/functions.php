<?php

if(!function_exists('handleError')){
    function handleError($error) {
        http_response_code(500);
        $output = [
            'success' => false,
            'error' => $error->getMessage()
        ];
        $json_output = json_encode($output);
        print($json_output);
    };
}

function startUp() {
    header('Content-type:application/json');
}
?>
