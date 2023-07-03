const boxs = document.querySelectorAll('.box');
const statusTxt = document.querySelector('#status');
const btnRestart = document.querySelector('#restart');

let o = "<img src='./image/o.png'>";
let x = "<img src='./image/x.png'>";

const win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = x;
let running = false
let Player = "X";
init();
function init() {
    boxs.forEach(box => box.addEventListener('click', boxClick));

    btnRestart.addEventListener('click', restartGame);
    statusTxt.textContent = `${Player} Your Turn`;
    running = true;
}

function boxClick() {
    const index = this.dataset.index;
    if (options[index] != "" || !running) {


        return;
    }
    updateBox(this, index);
    checkWinner();
}
function updateBox(box, index) {
    options[index] = Player;
    box.innerHTML = currentPlayer;
}
function changePlayer() {
    Player = (Player == 'X') ? "0" : "X";
    currentPlayer = (currentPlayer == x) ? o : x;
    statusTxt.textContent = `${Player} Your Turn`;

}
function checkWinner() {
    let isWon = false;
    for (let i = 0; i < win.length; i++) {
        const condition = win[i];
        const box1 = options[condition[0]];
        const box2 = options[condition[1]];
        const box3 = options[condition[2]];
        if (box1 == "" || box2 == "" || box3 == "") {
            continue;
        }
        if (box1 == box2 && box2 == box3) {
            isWon = true;
            boxs[condition[0]].classList.add('win');
            boxs[condition[1]].classList.add('win');
            boxs[condition[2]].classList.add('win');

        }
    }
    if (isWon) {
        statusTxt.textContent = `${Player} Won`;
        running = false;
    } else if (!options.includes("")) {
        statusTxt.textContent = `Game Draw`;
        running = false;
    } else {
        changePlayer();
    }
}
function restartGame() {


    options = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = x;
    Player = "X";
    running = true;
    statusTxt.textContent = `${Player} Your Turn`;

    boxs.forEach(box => {
        box.innerHTML = "";
        box.classList.remove('win');
    });
}