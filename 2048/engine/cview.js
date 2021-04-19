import Game from "./game.js";


const $root1 = $('#root1');
const $root2 = $('#root2');
const $root3 = $('#root3');
const $root4 = $('#root4');
const $scorebox = $('#score');
let game = new Game(4);
//$root.append(`<h1>${game.getGameState().board}</h1>`);
$scorebox.append(`<h1 id = "currScore">Score: ${game.getGameState().score}</h1>`)

for (let i = 0; i < 4; i++) {
    $root1.append(`<div id = ${i}><div class="box"><h1 style='color:blue'>${game.getGameState().board[i]}</h1></div></div>`);
}

for (let i = 4; i < 8; i++) {
    $root2.append(`<div id = ${i}><div class="box"><h1 style='color:blue'>${game.getGameState().board[i]}</h1></div></div>`);
}

for (let i = 8; i < 12; i++) {
    $root3.append(`<div id = ${i}><div class="box"><h1 style='color:blue'>${game.getGameState().board[i]}</h1></div></div>`);
}

for (let i = 12; i < 16; i++) {
    $root4.append(`<div id = ${i}><div class="box"><h1 style='color:blue'>${game.getGameState().board[i]}</h1></div></div>`);
}

game.onMove(gameState => {

    for (let i = 0; i < 16; i++) {

        let currVal = game.getGameState().board[i]
       
        $(`#${i}`).replaceWith(`<div id = ${i}>
                                    <div class="box">
                                        <h1 style="color:blue">${game.getGameState().board[i]}</h1>
                                    </div>
                                </div>`)
    }
    $(`#currScore`).replaceWith(`<h1 id ="currScore">Score: ${game.getGameState().score}</h1>`)


});


game.onWin(gameState => {

    $scorebox.append(`<h1 id = "wonState">You Won!</h1>`)

});
game.onLose(gameState => {

    $(`#hasLost`).replaceWith(`<div id="hasLost"><h1>Oh no! Game Over! Try Again!</h1></div>`)

});
$(".button").on("click",  function (event) {
    game.setupNewGame();
    for (let i = 0; i < 16; i++) {
        $(`#${i}`).replaceWith(`<div id = ${i}><div class="box"><h1 style="color:blue">${game.getGameState().board[i]}</h1></div></div>`)
    }
    $(`#currScore`).replaceWith(`<h1 id ="currScore">Score: ${game.getGameState().score}</h1>`)
    $(`#hasLost`).replaceWith(`<div id="hasLost"><h1>Keep Going! You Got This!</h1></div>`)

});

document.addEventListener('keydown', function (event) {
    if (event.code == 'ArrowDown') {
        game.move('right');
    }
    if (event.code == 'ArrowUp') {
        game.move('left');
    }
    if (event.code == 'ArrowRight') {
        game.move('down');
    }

    if (event.code == 'ArrowLeft') {
        game.move('up');
    }

    if (event.code == 'KeyR') {
        game.setupNewGame();
    }



});

