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

  // Board states:
  // 0 -> a player can place a token (game state NOT finished)
  // 1 -> a player has successfully placed a token (game state UNKNOWN)
  // 2 -> a player has won the game (game state finished)
  // 3 -> neither player has won the game (game state finished)
  // 4 -> a player has unsuccessfully placed a token in a square they already occupy
  // 5 -> a player has unsuccessfully placed a token in a square their opponent already occupies

  let boardState = 0;

  const getBoardState = () => boardState;
  const changeBoardState = (state) => (boardState = state);

  const placeMarker = (row, col, player) => {
    squares[row][col].addMarker(player);
    // let targetSquare = squares[row][col].getValue();
    // if (targetSquare === 0) {
    //   squares[row][col].addMarker(player);
    //   boardState = 1;
    // }
    // if (targetSquare === player) {
    //   boardState = 4;
    //   // console.log("You already placed a token there, try again!");
    // }
    // if (targetSquare != 0 && targetSquare != player) {
    //   boardState = 5;
    //   // console.log("Your opponent already took that square, try again!");
    // }
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

  const playRound = (row, col) => {
    // Drop a token for the current player
    // console.og(`Placing ${getActivePlayer().name}'s marker on board...`);
    board.placeMarker(row, col, getActivePlayer().marker);

    /*  This is where we would check for a winner and handle that logic,
          such as a win message. */
    board.checkBoard(getActivePlayer().marker);

    // Switch player turn
    if (board.getBoardState() === 1) {
      switchPlayerTurn();
      board.changeBoardState(0);
    }
  };

  return {
    playRound,
    getActivePlayer,
  };
}

const game = GameController();

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

  const DOMboard = document.querySelector("#game-board");

  const messageBoard = document.querySelector("#game-results");

  DOMboard.addEventListener("click", () => {
    if (board.getBoardState() === 0) {
      messageBoard.textContent = "Place a token.";
    }
    if (board.getBoardState() === 1) {
      messageBoard.textContent = `Player ${game.getActivePlayer().marker}'s turn.`;
    }
    if (board.getBoardState() === 2) {
      messageBoard.textContent = `Player ${game.getActivePlayer().marker} won!`;
    }
    if (board.getBoardState() === 3) {
      messageBoard.textContent = "Draw!";
    }
    if (board.getBoardState() === 4) {
      messageBoard.textContent = "Your opponent already placed a token here.";
    }
    if (board.getBoardState() === 5) {
      messageBoard.textContent = "You already placed a token here.";
    }
  });

  cell00.addEventListener("click", () => {
    if (cell00.textContent === "") {
      cell00.textContent = game.getActivePlayer().marker;
      game.playRound(0, 0);
      board.changeBoardState(1);
    } else if (cell00.textContent === game.getActivePlayer().marker) {
      board.changeBoardState(4);
    } else {
      board.changeBoardState(5);
    }
  });
  cell01.addEventListener("click", () => {
    if (cell01.textContent === "") {
      cell01.textContent = game.getActivePlayer().marker;
      game.playRound(0, 1);
      board.changeBoardState(1);
    } else if (cell01.textContent === game.getActivePlayer().marker) {
      board.changeBoardState(4);
    } else {
      board.changeBoardState(5);
    }
  });
  cell02.addEventListener("click", () => {
    if (cell02.textContent === "") {
      cell02.textContent = game.getActivePlayer().marker;
      game.playRound(0, 2);
      board.changeBoardState(1);
    } else if (cell02.textContent === game.getActivePlayer().marker) {
      board.changeBoardState(4);
    } else {
      board.changeBoardState(5);
    }
  });
  cell10.addEventListener("click", () => {
    if (cell10.textContent === "") {
      cell10.textContent = game.getActivePlayer().marker;
      game.playRound(1, 0);
      board.changeBoardState(1);
    } else if (cell10.textContent === game.getActivePlayer().marker) {
      board.changeBoardState(4);
    } else {
      board.changeBoardState(5);
    }
  });
  cell11.addEventListener("click", () => {
    if (cell11.textContent === "") {
      cell11.textContent = game.getActivePlayer().marker;
      game.playRound(1, 1);
      board.changeBoardState(1);
    } else if (cell11.textContent === game.getActivePlayer().marker) {
      board.changeBoardState(4);
    } else {
      board.changeBoardState(5);
    }
  });
  cell12.addEventListener("click", () => {
    if (cell12.textContent === "") {
      cell12.textContent = game.getActivePlayer().marker;
      game.playRound(1, 2);
      board.changeBoardState(1);
    } else if (cell12.textContent === game.getActivePlayer().marker) {
      board.changeBoardState(4);
    } else {
      board.changeBoardState(5);
    }
  });
  cell20.addEventListener("click", () => {
    if (cell20.textContent === "") {
      cell20.textContent = game.getActivePlayer().marker;
      game.playRound(2, 0);
      board.changeBoardState(1);
    } else if (cell20.textContent === game.getActivePlayer().marker) {
      board.changeBoardState(4);
    } else {
      board.changeBoardState(5);
    }
  });
  cell21.addEventListener("click", () => {
    if (cell21.textContent === "") {
      cell21.textContent = game.getActivePlayer().marker;
      game.playRound(2, 1);
      board.changeBoardState(1);
    } else if (cell21.textContent === game.getActivePlayer().marker) {
      board.changeBoardState(4);
    } else {
      board.changeBoardState(5);
    }
  });
  cell22.addEventListener("click", () => {
    if (cell22.textContent === "") {
      cell22.textContent = game.getActivePlayer().marker;
      game.playRound(2, 2);
      board.changeBoardState(1);
    } else if (cell22.textContent === game.getActivePlayer().marker) {
      board.changeBoardState(4);
    } else {
      board.changeBoardState(5);
    }
  });
}

const board = gameBoard();
const displayController = DisplayController();
