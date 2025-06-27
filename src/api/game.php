<?php
header('Content-Type: application/json');

$response = ["status" => "ok", "message" => "Game API ready"];
echo json_encode($response);
