import keypress from 'keypress';
import Game from "./engine/game.js";

keypress(process.stdin);


/**
 * The code in this file is used to run your game in the console. Use it
 * to help develop your game engine.
 *
 */

  //    board: [8,  8,  16,  0,
//  2,  4,  4,  2,
//  0,  0,  2,  0,
//   0,  0,  2, 8]

// [0,  0,  0,  0,
//     0,  0,  4,  0,
//      0,  2,  8,  0,
//       2,  2,  0, 16]

// [0,  16,  8,  0,
//     0,  0,  16,  0,
//     4,  4,  2,  4,
//     2,  16,  2, 4]

// [16,  16,  16,  16,
//     0,  0,  0,  8,
//     4,  0,  0,  2,
//     0,  0,  4, 0]

// [0,  16,  8,  0,
//     0,  0,  16,  0,
//     4,  4,  2,  4,
//     2,  16,  2, 4]


let game = new Game(4);
//console.log(game.board);
game.loadGame({
    board: [1024,  1024,  4,  2,
            256,  8,  16,  8,
            0,  2,  4,  8,
            8,  4,  16, 32],
    won: false,
    score: 0,
    over: false
});
//let gameState = game.getGameState();
//console.log(gameState)
console.log(game.toString());

game.onMove(gameState => {
    console.log(game.toString());
});

game.onWin(gameState => {
    console.log('You won with a gameState of...', gameState)
});

game.onLose(gameState => {
    console.log('You lost! :(', gameState)
    console.log(`Your score was ${gameState.score}`);
});

process.stdin.on('keypress', function (ch, key) {
    switch (key.name) {
        case 'right':
            game.move('right');
            break;
        case 'left':
            game.move('left');

            break;
        case 'down':
            game.move('down');

            break;
        case 'up':
            game.move('up');
            break;
    }
    if (key && key.ctrl && key.name == 'c') {
        process.stdin.pause();
    }
});


process.stdin.setRawMode(true);
process.stdin.resume();

