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

  let placingSuccess = 0;

  const getPlacingSuccess = () => placingSuccess;
  const resetPlacingSuccess = () => (placingSuccess = 0);

  const placeMarker = (row, col, player) => {
    let targetSquare = squares[row][col].getValue();
    if (targetSquare === 0) {
      squares[row][col].addMarker(player);
      placingSuccess = 1;
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
    if (squares[0][0].getValue() === player) {
      console.log("checkBoard worked!");
    }
  };

  return {
    getBoard,
    placeMarker,
    printBoard,
    checkBoard,
    getPlacingSuccess,
    resetPlacingSuccess,
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

  const playRound = (row, col) => {
    // Drop a token for the current player
    console.log(`Placing ${getActivePlayer().name}'s marker on board...`);
    board.placeMarker(row, col, getActivePlayer().marker);

    /*  This is where we would check for a winner and handle that logic,
          such as a win message. */
    board.checkBoard(getActivePlayer().marker);

    // Switch player turn
    if (board.getPlacingSuccess() === 1) {
      switchPlayerTurn();
      printNewRound();
      board.resetPlacingSuccess();
    }
  };

  printNewRound();

  return {
    playRound,
    getActivePlayer,
  };
}

const game = GameController();
