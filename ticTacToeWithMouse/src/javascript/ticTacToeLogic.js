var moveCounter = 0; //total moves made
var divCellArray = new Array(9); //array of div elements
var gameBoardArray; //2d array representing the game board with moves from the AI and player
var canPlayGame = false; //used to disable mouse clicks when the game hasn't started

function mousePressed(mouseEvent) {

    if (canPlayGame) { //only make a move if the game has started
        var clientX = mouseEvent.clientX;// mouses x
        var clientY = mouseEvent.clientY;// mouses y
        var id = validCell(clientX, clientY);//checking if the mouse click is in a div, returns div id

        if (checkValidMove(id, "x")) {//checking to see if x can be placed in the div
            document.getElementById("div" + id).innerText = "X";
            document.getElementById("div" + id).setAttribute("value", "x");
            moveCounter++;
            playGame();
        }
    }
}

/**
 * Onclick for the play game button, also randomly picks who goes first
 */
function buttonPlayGame() {

    //randomly picking who goes first player or AI
    if (Math.floor(Math.random() * 2) === 1) {//check
        document.getElementById("results").innerText = "AI Turn!";
        crazySmartAI(gameBoardArray); //AI move
    } else
        document.getElementById("results").innerText = "Your Turn!";

    document.getElementById("results").hidden = false;

    document.getElementById("playGame").disabled = true;
    document.getElementById("playGame").hidden = true;
    canPlayGame = true;
}

/**
 * Function used to play the game
 */
function playGame() {
    if (!gameResults(gameBoardArray, "x")) {//checking to see if the user has won
        crazySmartAI(gameBoardArray);//AI making a move
        gameResults(gameBoardArray, "o")//checking to see if the AI has won
    }
}

/**
 * Function finds all open spaces and randomly places a O representing the AI.
 * @param gameBoard 2d array representing the game board
 */
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

/**
 * Function only used when game is over, displays results, disables all game buttons, and calls the playAgain()
 * @param player string representing the player, either AI ("o") or player ("x")
 */
function gameOver(results) {
    console.log("gameover");
    document.getElementById("results").innerText = results;
    playAgain();
    canPlayGame = false;

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
 * funciton checks to see if the move being made is valid(not overwriting another previous move)
 * @param id int representing the div id
 * @param player string representing the player, either AI ("o") or player ("x")
 * @returns {boolean} true if the move is valid, else false
 */
function checkValidMove(id, player) {
    var indices = document.getElementById("div" + id).innerHTML.valueOf();
    if (indices != "X" && indices != "O") {
        var row = indices.charAt(2);
        var cols = indices.charAt(4);
        gameBoardArray[row][cols] = player;
        return true;
    }
    return false;
}

/**
 * Function finds are returns which cell the mouse click was, based of the mouse position
 * and the position of all the divs
 * @param clientX mouses clients x coordinates
 * @param clientY mouses clients y coordinates
 * @returns {number} id of the div the mouse clicked or 999 if no div was clicked
 */
function validCell(clientX, clientY) {
    for (var i = 0; i < 9; i++) {
        var myElement = divCellArray[i];
        var position = myElement.getBoundingClientRect();//object position representing a single div
        var topPosition = position.top;
        var bottomPosition = position.bottom;
        var leftPosition = position.left;
        var rightPosition = position.right;
        if (clientY > topPosition && clientY <= bottomPosition && clientX >= leftPosition && clientX <= rightPosition)
            return i
    }
    return 999;//if value not found for some reason
}

/**
 * Function is called as soon as the page loads.Function displays a pops up with directions, loads the 9 game divs
 * elements into the divCellArray for global use, and also loads up a empty game board into the global variable
 * gameBoardArray.
 */
function load() {
    window.alert("Directions: Tic-tac-toe is a game where two opponent alternate marking spaces in a 3×3 grid," +
        " with X's, and O's. The first player who places three of their marks in a row vertical," +
        " horizontal, or diagonal win the game.");

    loadGameCells();//loading the div elements into a array

    gameBoardArray = [
        ["na", "na", "na"],
        ["na", "na", "na"],
        ["na", "na", "na"]
    ];
}

/**
 * Function loads all up all the game div elements into a global array divCellArray
 */
function loadGameCells() {
    for (var i = 0; i < 9; ++i)
        divCellArray[i] = document.getElementById("div" + i);
}

window.addEventListener("load", load);
