//BUG READ THE DIRECTIONS AGAIN BRO
var moveCounter = 0;
var divCellArray = new Array(9);
var gameBoardArray;
var canPlayGame = false;

function mousePressed(mouseEvent) {

    if(canPlayGame){
        var clientX = mouseEvent.clientX;
        var clientY = mouseEvent.clientY;
        var id = validCell(clientX, clientY);

        if (checkValidMove(id, "x")) {
            document.getElementById("div" + id).innerText = "X";
            document.getElementById("div" + id).setAttribute("value", "x");
            moveCounter++;
            playGame();
        }
    }
}

function buttonPlayGame() {

    //randomly picking who goes first player or AI
    if (Math.floor(Math.random() * 2) === 1) {//check
        document.getElementById("results").innerText = "AI Turn!";
        crazySmartAI(gameBoardArray); //AI move
    } else
        document.getElementById("results").innerText = "Your Turn!";

    document.getElementById("playGame").disabled = true;
    document.getElementById("playGame").hidden = true;
    canPlayGame = true;
}

function validCell(clientX, clientY) {
    //console.log("cX: " + clientX + " cY:" + clientY);
    for (var i = 0; i < 9; i++) {
        var myElement = divCellArray[i];
        var position = myElement.getBoundingClientRect();
        var topPosition = position.top;
        var bottomPosition = position.bottom;
        var leftPosition = position.left;
        var rightPosition = position.right;
        if (clientY > topPosition && clientY <= bottomPosition && clientX >= leftPosition && clientX <= rightPosition)
            return i//console.log("HERE " + i);
    }
    return 999;//if value not found for some reason
}

function buttonPlayAgain() {
    location.reload()
}

function playGame() {
    if (!gameResults(gameBoardArray, "x")) {//making a move is user didnt win
        crazySmartAI(gameBoardArray);//make ai move
        gameResults(gameBoardArray, "o")//checking if AI has won
    }
}

function load() {
    window.alert("Directions: Tic-tac-toe is a game where two opponent alternate marking spaces in a 3×3 grid," +
        " with X's, and O's. The first player who places three of their marks in a row vertical," +
        " horizontal, or diagonal win the game.");

    loadGameCells();

    gameBoardArray = [
        ["na", "na", "na"],
        ["na", "na", "na"],
        ["na", "na", "na"]
    ];
}

function loadGameCells() {
    for (var i = 0; i < 9; ++i)
        divCellArray[i] = document.getElementById("div" + i);
}

function gameResults(gameBoard, player) {
    var results = false;

    if (gameBoard[0][0] === player && gameBoard[1][1] === player && gameBoard[2][2] === player)// \ check
        results = true;
    if (gameBoard[0][2] === player && gameBoard[1][1] === player && gameBoard[2][0] === player)// / check
        results = true;

    if (results === false) {
        for (var r = 0; r < 3; ++r) {
            //horizontal check
            if (gameBoard[r][0] === player && gameBoard[r][1] === player && gameBoard[r][2] === player)
                results = true;
            //vertical check
            if (gameBoard[0][r] === player && gameBoard[1][r] === player && gameBoard[2][r] === player)
                results = true;
        }
    }

    if (results === true) {
        if (player === "x")
            gameOver("Human Wins");
        else if (player === "o")
            gameOver("AI Wins");
        return results;
    }

    if (moveCounter === 9)
        gameOver("Game is a Draw");

    console.log(gameBoardArray);
    return results;
}

function playAgain() {
    document.getElementById("playAgain").disabled = false;
    document.getElementById("playAgain").hidden = false;

}

function gameOver(results) {
    console.log("gameover");
    document.getElementById("results").innerText = results;
    playAgain();
    canPlayGame = false;

}

function crazySmartAI(gameBoard) {
    var freeSpaceCounter = 0;
    var openSpacesArrayList = [];
    for (var r = 0; r < 3; ++r) {
        for (var c = 0; c < 3; ++c) {
            if (gameBoard[r][c] === "na") {
                openSpacesArrayList.push(freeSpaceCounter);
            }
            freeSpaceCounter++;
        }
    }

    //checking if any moves are left
    if (openSpacesArrayList.length != 0) {
        var aiMove = Math.floor(Math.random() * openSpacesArrayList.length);

        //place random move
        var id = openSpacesArrayList[aiMove];

        if (checkValidMove(id, "o")) {
            document.getElementById("div" + id).innerText = "O";
            document.getElementById("div" + id).setAttribute("value", "o");
            moveCounter++;
        }
    }
}

function checkValidMove(id, player) {
    var indices = document.getElementById("div" + id).innerHTML.valueOf();
    if (indices != "X" && indices != "O") {
        var row = indices.charAt(2);
        var cols = indices.charAt(4);
        gameBoardArray[row][cols] = player;
        return true;
        //console.log(indices + " r" + row + " c"+ cols);
    }
    return false;
}

window.addEventListener("load", load);
