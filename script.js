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

const DOMboard = document.querySelector("#game-board");

function DisplayController() {
  const cell00 = document.querySelector("#cell00");
  const cell01 = document.querySelector("#cell01");
  const cell02 = document.querySelector("#cell02");
  const cell10 = document.querySelector("#cell10");
  const cell11 = document.querySelector("#cell11");
  const cell12 = document.querySelector("#cell12");
  const cell20 = document.querySelector("#cell20");
  const cell21 = document.querySelector("#cell21");
  const cell22 = document.querySelector("#cell22");

  cell00.addEventListener("click", () => {
    cell00.textContent = game.getActivePlayer().marker;
    game.playRound(0, 0);
  });
  cell01.addEventListener("click", () => {
    cell01.textContent = game.getActivePlayer().marker;
    game.playRound(0, 1);
  });
  cell02.addEventListener("click", () => {
    cell02.textContent = game.getActivePlayer().marker;
    game.playRound(0, 2);
  });
  cell10.addEventListener("click", () => {
    cell10.textContent = game.getActivePlayer().marker;
    game.playRound(1, 0);
  });
  cell11.addEventListener("click", () => {
    cell11.textContent = game.getActivePlayer().marker;
    game.playRound(1, 1);
  });
  cell12.addEventListener("click", () => {
    cell12.textContent = game.getActivePlayer().marker;
    game.playRound(1, 2);
  });
  cell20.addEventListener("click", () => {
    cell20.textContent = game.getActivePlayer().marker;
    game.playRound(2, 0);
  });
  cell21.addEventListener("click", () => {
    cell21.textContent = game.getActivePlayer().marker;
    game.playRound(2, 1);
  });
  cell22.addEventListener("click", () => {
    cell22.textContent = game.getActivePlayer().marker;
    game.playRound(2, 2);
  });
}

const displayController = DisplayController();
