//BUG READ THE DIRECTIONS AGAIN BRO
var moveCounter = 0;

function buttonPressed(id) {
    document.getElementById("btn" + id).innerText = "X";
    document.getElementById("btn" + id).setAttribute("value", "x");
    document.getElementById("btn" + id).disabled = true;
    moveCounter++;
    playGame();
}

function buttonPlayGame() {
    disableAllButtons(false);

    //randomly picking who goes first player or AI
    if (Math.floor(Math.random() * 2) === 1) {
        document.getElementById("results").innerText = "AI Turn!";
        crazySmartAI(getGameBoard()); //AI move
    } else
        document.getElementById("results").innerText = "Your Turn!";

    document.getElementById("playGame").disabled = true;
    document.getElementById("playGame").hidden = true;
}

function buttonPlayAgain() {
    location.reload()
}

function buttonLeaveGame() {
}//BUG

function disableAllButtons(disable) {
    for (var i = 0; i < 9; ++i)
        document.getElementById("btn" + i).disabled = disable;
}

function playGame() {
    if (!gameResults(getGameBoard(), "x")) {//making a move is user didnt win
        crazySmartAI(getGameBoard());//make ai move
        gameResults(getGameBoard(), "o")//checking if AI has won
    }
}

function playAgain() {
    document.getElementById("playAgain").disabled = false;
    document.getElementById("playAgain").hidden = false;
    document.getElementById("leaveGame").disabled = false;
    document.getElementById("leaveGame").hidden = false;
}

function getGameBoard() {
    var gameBoardArray = [
        ["na", "na", "na"],
        ["na", "na", "na"],
        ["na", "na", "na"]
    ];

    var buttonCounter = 0;
    for (var r = 0; r < 3; ++r) {
        for (var c = 0; c < 3; ++c) {

            var cellValue = document.getElementById("btn" + buttonCounter).value.toLowerCase();

            switch (cellValue) {
                case "x":
                    gameBoardArray[r][c] = "x";
                    break;
                case "o":
                    gameBoardArray[r][c] = "o";
                    break;
                default:
                    break;
            }
            buttonCounter++;
        }
    }
    return gameBoardArray;
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
    return results;
}

function gameOver(player) {
    document.getElementById("results").innerText = player;
    disableAllButtons(true);
    playAgain();
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
        document.getElementById("btn" + id).innerText = "O";
        document.getElementById("btn" + id).setAttribute("value", "o");
        document.getElementById("btn" + id).disabled = true;
        moveCounter++;
    }
}
