var moveCounter = 0; //total moves made

/**
 * Onclick for the 9 game buttons
 * @param int representing the buttons id
 */
function buttonPressed(id) {
    document.getElementById("btn" + id).innerText = "X";
    document.getElementById("btn" + id).setAttribute("value", "x");
    document.getElementById("btn" + id).disabled = true;
    moveCounter++;
    playGame();
}

/**
 * Onclick for the play game button, also randomly picks who goes first
 */
function buttonPlayGame() {
    //game starts with buttons disabled, enabling them after game starts
    disableAllButtons(false);

    //randomly picking who goes first player or AI
    if (Math.floor(Math.random() * 2) === 1) {
        document.getElementById("results").innerText = "AI Made A Move!";
        crazySmartAI(getGameBoard()); //AI move
    } else
        document.getElementById("results").innerText = "Your Turn!";

    document.getElementById("results").hidden = false;
    document.getElementById("playGame").disabled = true;
    document.getElementById("playGame").hidden = true;
}

/**
 * Function used to play the game
 */
function playGame() {
    if (!gameResults(getGameBoard(), "x")) {//checking to see if the user has won
        crazySmartAI(getGameBoard());//AI making a move
        gameResults(getGameBoard(), "o")//checking to see if the AI has won
    }
}

/**
 * Function finds all open spaces and randomly places a O representing the AI.
 * @param gameBoard 2d array representing the game board
 */
function crazySmartAI(gameBoard) {
    var freeSpaceCounter = 0;//number of open spaces on the board
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

        //placing random move
        var id = openSpacesArrayList[aiMove];
        document.getElementById("btn" + id).innerText = "O";
        document.getElementById("btn" + id).setAttribute("value", "o");
        document.getElementById("btn" + id).disabled = true;
        moveCounter++;
    }
}

/**
 * Function creates a 3 by 3 grid (2d array). Based off the html 9 game buttons, function
 * places user and computer moves into the array and returns it.
 * @returns {string[][]} representing the gameboard in array form
 */
function getGameBoard() {
    var gameBoardArray = [
        ["na", "na", "na"],
        ["na", "na", "na"],
        ["na", "na", "na"]
    ];

    var buttonCounter = 0;
    for (var r = 0; r < 3; ++r) {//finding the button values for the 2d return array
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

/**
 * Function checks to see if anyone has won or if the game was a draw.
 * @param gameBoard 2d representing the game board
 * @param player string representing player, x or o
 * @returns {boolean} true if the game end else false
 */
function gameResults(gameBoard, player) {
    var results = false;

    if (gameBoard[0][0] === player && gameBoard[1][1] === player && gameBoard[2][2] === player)// \ check
        results = true;
    if (gameBoard[0][2] === player && gameBoard[1][1] === player && gameBoard[2][0] === player)// / check
        results = true;

    if (results === false) {
        for (var r = 0; r < 3; ++r) {
            //horizontal check for all rows
            if (gameBoard[r][0] === player && gameBoard[r][1] === player && gameBoard[r][2] === player)
                results = true;
            //vertical check for all rows
            if (gameBoard[0][r] === player && gameBoard[1][r] === player && gameBoard[2][r] === player)
                results = true;
        }
    }

    if (results === true) {
        if (player === "x")
            gameOver("Human Wins");//calling gameOver function
        else if (player === "o")
            gameOver("AI Wins");
        return results;
    }

    if (moveCounter === 9)
        gameOver("Game is a Draw");
    return results;
}

/**
 * Function only used when game is over, displays results, disables all game buttons, and calls the playAgain()
 * @param player string representing the player, either AI ("o") or player ("x")
 */
function gameOver(player) {
    document.getElementById("results").innerText = player;
    disableAllButtons(true);
    playAgain();
}

/**
 * Function is used for the play again sequence. Displays and enables the play again button
 */
function playAgain() {
    document.getElementById("playAgain").disabled = false;
    document.getElementById("playAgain").hidden = false;
}

/**
 * Onclick for the play gain button, reloads the page
 */
function buttonPlayAgain() {
    location.reload()
}

/**
 * Function used to disable or enable the 9 game buttons
 * @param disable boolean, true to disable and false to enable
 */
function disableAllButtons(disable) {
    for (var i = 0; i < 9; ++i)
        document.getElementById("btn" + i).disabled = disable;
}

/**
 * Function is called as soon as the page loads, displays a pops up with directions
 */
function load() {
    window.alert("Directions: Tic-tac-toe is a game where two opponent alternate marking spaces in a 3×3 grid," +
        " with X's, and O's. The first player who places three of their marks in a row vertical," +
        " horizontal, or diagonal win the game.");
}

window.addEventListener("load", load);