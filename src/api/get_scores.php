<?php
header('Content-Type: application/json');

$file = '../scores.json';

if (!file_exists($file)) {
    echo json_encode([]);
    exit;
}

$scores = json_decode(file_get_contents($file), true);
if (!is_array($scores)) {
    echo json_encode([]);
    exit;
}

// Optional: Sortiere nach bestem Score aufsteigend
usort($scores, function($a, $b) {
    return $a['score'] - $b['score'];
});

// Zeige nur die Top 10
$scores = array_slice($scores, 0, 10);

echo json_encode($scores);
