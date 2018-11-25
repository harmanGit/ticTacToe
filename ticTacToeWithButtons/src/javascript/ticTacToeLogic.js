function start() {
    document.getElementById("enterButton").onclick = function () {
        playGame()
    };
}

function buttonPressed(id) {
    document.getElementById("btn" + id).innerText = "X";
    document.getElementById("btn" + id).setAttribute("value", "x");
    document.getElementById("btn" + id).disabled = true;
    playGame();

}

function playGame() {
    //setting up game board
    var gameBoard = setupBoard();
    //checking to see if the user has won;
    var isGameOver = gameResults(gameBoard, "x");

    if (isGameOver != "No Winner :(") {
        document.getElementById("results").innerText = isGameOver;
        disableAllButtons();
    }
    //make ai move
    //check if ai has one
}


function setupBoard() {
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

function disableAllButtons()
{
    for (var i = 0; i < 9; ++i)
        document.getElementById("btn" + i).disabled = true;
}

function gameResults(gameBoard, player) { //BUG: TESTED

    var results = "No Winner :(";
    var drawCounter = 0;

    if (gameBoard[0][0] === player && gameBoard[1][1] === player && gameBoard[2][2] === player)// \ check
        results = "won";
    if (gameBoard[2][2] === player && gameBoard[1][1] === player && gameBoard[0][0] === player)// / check
        results = "won";

    if (results === "No Winner :(") {
        mainLoop:
            for (var r = 0; r < 3; ++r) {
                //horizontal check
                    if (gameBoard[r][0] === player && gameBoard[r][1] === player && gameBoard[r][2] === player)
                    {
                        results = "won";
                        break mainLoop;
                    }
                //vertical check
                    if (gameBoard[0][r] === player && gameBoard[1][r] === player && gameBoard[2][r] === player)
                    {
                        results = "won";
                        break mainLoop;
                    }
                    drawCounter++;
            }
    }

    if (drawCounter == 9)
        return "Game is a Draw";

    if (results === "won") {
        if (player === "x")
            return "Human Wins";
        else if (player === "o")
            return "AI Wins";
    }
    return results;
}


function crazySmartAI(openSpotsArray) //BUG: COMPLETE THIS
{
    var openSpacesArray;
    for (var r = 0; r < 3; ++r) {
        for (var c = 0; c < 3; ++c) {
            if (gameBoard[r][c] === "-") {
                openSpacesArray.key = r;
                openSpacesArray[r] = c; //BUG: better data structure. You need to store open positions or something 
            }
        }
    }

    var aiMove = Math.floor(Math.random() * openSpacesArray.size);

    //place random move

    document.getElementById("enterButton").disabled = true;
    document.getElementById("displayOutput").innerHTML = "You Win";
}

//Use a random generator to determine whether the machine or the human
//   starts to play the game first. For example, the machine starts to play first
//   when the number is 0 and the human starts to play when the number is 1.

//BUG READ THE DIRECTIONS AGAIN BRO