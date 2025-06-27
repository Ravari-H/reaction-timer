<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['name']) || !isset($data['score'])) {
    http_response_code(400);
    echo json_encode(['message' => 'Invalid input']);
    exit;
}

$name = htmlspecialchars($data['name']);
$score = intval($data['score']);
$entry = [
    'name' => $name,
    'score' => $score,
    'timestamp' => date('Y-m-d H:i:s')
];

$file = '../scores.json';
$scores = [];

if (file_exists($file)) {
    $scores = json_decode(file_get_contents($file), true);
    if (!is_array($scores)) {
        $scores = [];
    }
}

$scores[] = $entry;
file_put_contents($file, json_encode($scores, JSON_PRETTY_PRINT));

echo json_encode(['message' => 'Score saved']);
