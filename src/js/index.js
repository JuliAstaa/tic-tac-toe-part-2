const squares = document.querySelectorAll(".square");
const gameInfo = document.getElementById("gameInfo");
const restart = document.getElementById("restart");

const winCondition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let option = ["", "", "", "", "", "", "", "", ""];
let play = false;
let currPlayer = "X";
gameInfo.innerHTML = `${currPlayer}' turn`;

restart.addEventListener("click", () => {
  play = true;
  option = ["", "", "", "", "", "", "", "", ""];
  squares.forEach((square) => {
    square.innerHTML = "";
    square.classList.remove("winner");
  });
  currPlayer = "X";
  gameInfo.innerHTML = `${currPlayer}' turn`;
});

const changePlayer = () => {
  gameInfo.innerText = `${currPlayer}'s turn`;
  currPlayer = currPlayer == "X" ? "O" : "X";
};

const checkWin = () => {
  let roundWon = false;

  for (let i = 0; i < winCondition.length; i++) {
    let opt = winCondition[i];
    const squareA = option[opt[0]];
    const squareB = option[opt[1]];
    const squareC = option[opt[2]];
    console.log(option);
    option.map((op, index) => console.log(option[index] == option[opt[1]]));

    if (squareA == "" || squareB == "" || squareC == "") continue;
    if (squareA == squareB && squareB == squareC) {
      roundWon = true;
      opt.forEach((index) => squares[index].classList.add("winner"));
    }
  }

  if (roundWon) {
    play = false;
    gameInfo.innerHTML = `${currPlayer}'s win`;
  } else if (!option.includes("")) {
    play = false;
    gameInfo.innerHTML = `Draw`;
  } else {
    changePlayer();
  }
};

const updateOption = (index) => {
  option[index] = currPlayer;
};

const updateSquare = (square) => {
  square.addEventListener("click", () => {
    if (square.innerHTML != "" || !play) return;

    if (option[square.id] != 0) return;

    square.innerHTML = currPlayer;

    updateOption(square.id);
    checkWin();
  });
};

const playTheGame = () => {
  squares.forEach((square, index) => {
    updateSquare(square);
  });
  play = true;
};

playTheGame();
