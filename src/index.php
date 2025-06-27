<!DOCTYPE html>
<html lang="de">

<head>
    <meta charset="UTF-8">
    <title>Reaktionsspiel</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body class="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
    <div class="text-center">
        <h1 class="mb-4">Reaktionsspiel</h1>
        <button id="startButton" class="btn btn-primary btn-lg">Spiel starten</button>
        <div id="gameArea" class="mt-5 d-none">
            <p id="infoText" class="fs-4">Bereit machen...</p>
            <button id="clickButton" class="btn btn-success btn-lg d-none">KLICK MICH!</button>
        </div>
        <div id="resultArea" class="mt-4 d-none">
            <h3>Ergebnisse</h3>
            <ul id="resultsList" class="list-group mb-3"></ul>
            <p><strong>Durchschnitt:</strong> <span id="avgTime">-</span> ms</p>
            <button id="restartButton" class="btn btn-primary mt-3">Nochmal spielen</button>
        </div>
    </div>
    <script src="assets/js/script.js"></script>
</body>

</html>