function generateBoard() {
    var boardSize = document.getElementById("boardSize").value;
    var boardContainer = document.getElementById("boardContainer");
    boardContainer.innerHTML = ""; 
    var board = document.createElement("div");
    board.id = "board";
    board.style.gridTemplateColumns = "repeat(" + boardSize + ", 1fr)"; 
    var boardDimension = 400;
    
    // style
    var boardContainer = document.getElementById("boardContainer");
    var boardWrapper = document.createElement("div");
    boardWrapper.style.display = "flex";
    boardWrapper.style.justifyContent = "center";
    boardWrapper.style.alignItems = "center";
    boardContainer.appendChild(boardWrapper);
    boardWrapper.appendChild(board);
    board.style.maxWidth = "100%";
    board.style.maxHeight = "100%";
    var boardDimension = "80%"; 
    board.style.objectFit = "contain";
    
    if (!boardSize) {
        formB.style.width = "300px";
    } else if (boardSize == 3) {
        formB.style.width = "300px";
    } else if (boardSize == 4) {
        formB.style.width = "400px";
    } else if (boardSize == 5) {
        formB.style.width = "500px";
    } else if (boardSize == 6) {
        formB.style.width = "600px";
    } else if (boardSize == 7) {
        formB.style.width = "700px";
    } else if (boardSize == 8) {
        formB.style.width = "800px";
    } else if (boardSize == 9) {
        formB.style.width = "900px";
    }else if (boardSize == 10) {
        formB.style.width = "1000px";
    } 
    // style

    board.style.width = boardDimension + "px";
    board.style.height = boardDimension + "px";
    var squareSize = boardDimension / boardSize; 

    for (var i = 0; i < boardSize; i++) {
        for (var j = 0; j < boardSize; j++) {
            var square = document.createElement("div");
            square.className = "square";
            if ((i + j) % 2 === 0) {
                square.classList.add("white");
            } else {
                square.classList.add("black");
            }
            square.style.width = squareSize + "px";
            square.style.height = squareSize + "px"; 
            square.addEventListener('click', function() {
                document.getElementById("knightPosition").value = Array.from(board.children).indexOf(this) + 1;
                findMoves();
            });
            board.appendChild(square);
        }
        if (boardSize % 2 == 0) {
            var temp = (i + 1) % 2 === 0 ? true : false;
        }
    }
    boardContainer.appendChild(board);
}
function findMoves() {
    generateBoard();
    var piece = document.getElementById("piece").value;
    if (piece == "knight") {
        findKnightMoves();
    } else if (piece == "bishop") {
        findBishopMoves();
    }
}function findKnightMoves() {
    var boardSize = parseInt(document.getElementById("boardSize").value);
    var knightPosition = parseInt(document.getElementById("knightPosition").value);
    var resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "";

    if (isNaN(knightPosition) || knightPosition < 1 || knightPosition > boardSize * boardSize) {
        resultsContainer.textContent = "Некоректна позиція фігури.";
        return;
    }

    var row = Math.ceil(knightPosition / boardSize);
    var col = knightPosition % boardSize === 0 ? boardSize : knightPosition % boardSize;

    var moves = [
        [row - 2, col - 1], [row - 2, col + 1],
        [row - 1, col - 2], [row - 1, col + 2],
        [row + 1, col - 2], [row + 1, col + 2],
        [row + 2, col - 1], [row + 2, col + 1]
    ];

    var validMoves = moves.filter(move => move[0] >= 1 && move[0] <= boardSize && move[1] >= 1 && move[1] <= boardSize);
    
    var resultString = "Можливі ходи для позиції " + knightPosition + ": ";
    validMoves.sort((a, b) => {
        var posA = (a[0] - 1) * boardSize + a[1];
        var posB = (b[0] - 1) * boardSize + b[1];
        return Math.abs(knightPosition - posA) - Math.abs(knightPosition - posB);
    }).forEach((move, index) => {
        var position = (move[0] - 1) * boardSize + move[1];
        resultString += position + " ";
        setTimeout(function() {
            document.getElementById("board").children[position - 1].classList.add("moveHighlight");
        }, 100 * index); 
    });

    var knightImage = document.createElement('img');
    knightImage.src = 'pngwing.com (2).png';
    document.getElementById("board").children[knightPosition - 1].appendChild(knightImage);

    resultsContainer.textContent = resultString;
}

function findBishopMoves() {
    var boardSize = parseInt(document.getElementById("boardSize").value);
    var bishopPosition = parseInt(document.getElementById("knightPosition").value);
    var resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "";

    if (isNaN(bishopPosition) || bishopPosition < 1 || bishopPosition > boardSize * boardSize) {
        resultsContainer.textContent = "Некоректна позиція фігури.";
        return;
    }

    var row = Math.ceil(bishopPosition / boardSize);
    var col = bishopPosition % boardSize === 0 ? boardSize : bishopPosition % boardSize;

    var moves = [];

    for (var i = 1; i <= boardSize; i++) {
        for (var j = 1; j <= boardSize; j++) {
            if (Math.abs(i - row) == Math.abs(j - col)) {
                moves.push([i, j]);
            }
        }
    }

    var resultString = "Можливі ходи для позиції " + bishopPosition + ": ";
    moves.sort((a, b) => {
        var posA = (a[0] - 1) * boardSize + a[1];
        var posB = (b[0] - 1) * boardSize + b[1];
        return Math.abs(bishopPosition - posA) - Math.abs(bishopPosition - posB);
    }).forEach((move, index) => {
        var position = (move[0] - 1) * boardSize + move[1];
        resultString += position + " ";
        setTimeout(function() {
            document.getElementById("board").children[position - 1].classList.add("moveHighlight");
        }, 100 * index); 
    });

    var bishopImage = document.createElement('img');
    bishopImage.src = 'pngwing.com (1).png';
    document.getElementById("board").children[bishopPosition - 1].appendChild(bishopImage);

    resultsContainer.textContent = resultString;
}
