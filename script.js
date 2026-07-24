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

  const placeMarker = (row, col, player) => {
    if (squares[row][col].getValue() === 0) {
      squares[row][col].addMarker(player);
    }
  };

  const printBoard = () => {
    const boardWithCellValues = squares.map((row) =>
      row.map((cell) => cell.getValue()),
    );
    console.log(boardWithCellValues);
  };

  return { getBoard, placeMarker, printBoard };
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

    // Switch player turn
    switchPlayerTurn();
    printNewRound();
  };

  printNewRound();

  return {
    playRound,
    getActivePlayer,
  };
}

const game = GameController();
