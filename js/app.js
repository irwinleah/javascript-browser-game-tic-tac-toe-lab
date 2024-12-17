//1) Define the required variables used to track the state of the game.

//2) Store cached element references.

//3) Upon loading, the game state should be initialized, and a function should 
//   be called to render this game state.

//4) The state of the game should be rendered to the user.

//5) Define the required constants.

//6) Handle a player clicking a square with a `handleClick` function.

//7) Create Reset functionality.


/*-------------------------------- Constants --------------------------------*/
const messageEl = document.querySelector('#message')
    console.log(messageEl)
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
]
/*---------------------------- Variables (state) ----------------------------*/
let board; 
let turn; // = whose turn it is;
let winner;// = if anyone has won yet;
let tie; // = represent if the game has ended in a tie;


/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr')
    console.log(squareEls)
const messageElement = document.getElementById('message')
init()
/*-------------------------------- Functions --------------------------------*/
function init(){ //initial values
    board = [
        '', '', '', 
        '', '', '', 
        '', '', ''
    ];

    turn = 'X';
    winner = false;
    tie = false
    render()
    // console.log(render())
}
function render(){
    updateBoard();
    updateMessage();
}

function updateBoard(){

    for (let i = 0; i < board.length; i++){
        let square = squareEls[i];
        let value = board[i];
        square.innerText = value;

        square.classList.remove('X', 'O', 'empty');
        if (value === 'X') {
            square.classList.add('x');
        } else if (value === 'O') {
            square.classList.add('o');
        } else {
            square.classList.add('empty');
        }
    }
}
function updateMessage(){

    if(!winner && !tie) {
        messageElement.textContent = `${turn}'s turn!`;
    } else if (!winner && tie) {
        messageElement.textContent = "It's a tie!";
    } else {
        messageElement.textContent = `${turn} wins! Congratulation!`
    }
}

function handleClick(event) {
    const squareIndex = event.target.id
    if (event.target.innerText !== ''){
        return // full stop, allows you to not add on top
    } 
    if (winner === true){
        return //board is no longer applicable
    }
    placePiece(squareIndex)
    checkForWinner()
    checkForTie()
    switchPlayerTurn()
    render()
    console.log(squareIndex)
}

function placePiece(index) {
    board[index] = turn
    console.log(board)
}

function checkForWinner(){
    winningCombos.forEach(combo => {
       if (board[combo[0]] !== '' && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) {
        winner = true }
        console.log(winner)
    }) 
}
function checkForTie(){
    if (winner === true) return
    if (board.includes('')) return
    tie = true
}
function switchPlayerTurn(){
    if (winner === true) return
    if (winner === false) {
        if (turn === 'X'){
            turn = 'O'
        } else {
            turn = 'X'
        }
    }
}
/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach(square => {
    square.addEventListener('click', handleClick)

})