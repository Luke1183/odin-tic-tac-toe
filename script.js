function gameBoard() {
  const rows = 3;
  const cols = 3;

  const squares = [];

  for (let i = 0; i < rows; i++) {
    squares[i] = [];
    for (let j = 0; j < cols; j++) {
      squares[i].push(Cell());
    }
  }

  const getBoard = () => squares;

  let boardState = 0;

  const getBoardState = () => boardState;
  const changeBoardState = (state) => (boardState = state);

  const placeMarker = (row, col, player) => {
    let targetSquare = squares[row][col].getValue();
    if (targetSquare === 0) {
      squares[row][col].addMarker(player);
      boardState = 1;
    }
    if (targetSquare === player) {
      console.log("You already placed a token there, try again!");
    }
    if (targetSquare != 0 && targetSquare != player) {
      console.log("Your opponent already took that square, try again!");
    }
  };

  const printBoard = () => {
    const boardWithCellValues = squares.map((row) =>
      row.map((cell) => cell.getValue()),
    );
    console.log(boardWithCellValues);
  };

  const checkBoard = (player) => {
    if (
      (squares[0][0].getValue() === player &&
        squares[0][1].getValue() === player &&
        squares[0][2].getValue() === player) ||
      (squares[1][0].getValue() === player &&
        squares[1][1].getValue() === player &&
        squares[1][2].getValue() === player) ||
      (squares[2][0].getValue() === player &&
        squares[2][1].getValue() === player &&
        squares[2][2].getValue() === player) ||
      (squares[0][0].getValue() === player &&
        squares[1][0].getValue() === player &&
        squares[2][0].getValue() === player) ||
      (squares[0][1].getValue() === player &&
        squares[1][1].getValue() === player &&
        squares[2][1].getValue() === player) ||
      (squares[0][2].getValue() === player &&
        squares[1][2].getValue() === player &&
        squares[2][2].getValue() === player) ||
      (squares[0][0].getValue() === player &&
        squares[1][1].getValue() === player &&
        squares[2][2].getValue() === player) ||
      (squares[0][2].getValue() === player &&
        squares[1][1].getValue() === player &&
        squares[2][0].getValue() === player)
    ) {
      boardState = 2;
    } else if (
      squares[0][0].getValue() != 0 &&
      squares[0][1].getValue() != 0 &&
      squares[0][2].getValue() != 0 &&
      squares[1][0].getValue() != 0 &&
      squares[1][1].getValue() != 0 &&
      squares[1][2].getValue() != 0 &&
      squares[2][0].getValue() != 0 &&
      squares[2][1].getValue() != 0 &&
      squares[2][2].getValue() != 0
    ) {
      boardState = 3;
    }
  };

  return {
    getBoard,
    placeMarker,
    printBoard,
    checkBoard,
    getBoardState,
    changeBoardState,
  };
}

function Cell() {
  let value = 0;

  const addMarker = (player) => {
    value = player;
  };

  const getValue = () => value;

  return {
    addMarker,
    getValue,
  };
}

function GameController(
  playerOneName = "Player One",
  playerTwoName = "Player Two",
) {
  const board = gameBoard();

  const players = [
    {
      name: playerOneName,
      marker: 1,
    },
    {
      name: playerTwoName,
      marker: 2,
    },
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const printCurrentRound = () => {
    board.printBoard();
    console.log(`Still ${getActivePlayer().name}'s turn.`);
  };

  const printGameFinishedWin = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name} won!`);
  };

  const printGameFinishedTie = () => {
    board.printBoard();
    console.log("Tie!");
  };

  const playRound = (row, col) => {
    // Drop a token for the current player
    console.log(`Placing ${getActivePlayer().name}'s marker on board...`);
    board.placeMarker(row, col, getActivePlayer().marker);

    /*  This is where we would check for a winner and handle that logic,
          such as a win message. */
    board.checkBoard(getActivePlayer().marker);

    // Switch player turn
    if (board.getBoardState() === 1) {
      switchPlayerTurn();
      printNewRound();
      board.changeBoardState(0);
    } else if (board.getBoardState() === 2) {
      printGameFinishedWin();
    } else if (board.getBoardState() === 3) {
      printGameFinishedTie();
    } else {
      printCurrentRound();
    }
  };

  printNewRound();

  return {
    playRound,
    getActivePlayer,
  };
}

const game = GameController();
