/*
TO DO LIST
1. Implement GameState Object[] (COMPLETE!)
2. Convert Gamestate.board into 1D Array
3. Implement Game Constructor
4. Implement RNG for Tiles
5. Implement Movements and Events
6.  Implement Methods
7. Implement View/Controller
8. Implement HTML
9. Implement CSS
10. QA Bugtesting
 */
// function moveLeft(row, startInt, EndInt) {
//   let rowTotal = 0;
//   for (let i = startInt-1; i < EndInt; i++) {
//     rowTotal += gameState.board[i]
//   }
//   gameState.board[row] = rowTotal;
//   return EndInt
// }
//function rotateRight () {

//ROTATE RIGHT START
//}

export default class Game {


  constructor(size) {
    this.board = new Array(size * size);
    this.won = false;
    this.over = false;
    this.score = 0;
    this.size = size;

    this.board.fill(0);
    //this.board[num1] = val1;
    //this.board[num2] = val2;
    this.createNewTile();
    this.createNewTile();
    //console.log(this.board)
    //console.log(this.toString());
    this.callBacksMove = [];
    this.callBacksWin = [];
    this.callBacksLose = [];

  }

  // addListener (listener) {
  //   let idx = this.listeners.findIndex((l) => l == listener);
  //   if (idx == -1) {
  //     this.listeners.push(listener);
  //   }
  // }

  // updateListeners (event) {
  //   this.listeners.forEach((l) => l(event));
  // }

  createNewTile () {
    let index = Math.floor(Math.random() * ((this.size * this.size)));
    while (this.board[index] != 0) {
      index = Math.floor(Math.random() * ((this.size * this.size)));
    }

    let val = 2
    if (Math.floor(Math.random() * 10) == 9) {
      val = 4;
    }

    this.board[index] = val;

  }

  move (direction) {
    //console.log("\n")
    let hasMoved = false
    switch (direction) {
      case 'left':

        hasMoved = this.moveLeft()
        break;
      case 'right':
        this.rotateRight()
        this.rotateRight()
        hasMoved = this.moveLeft()
        this.rotateRight()
        this.rotateRight()
        break;
      case 'down':

        this.rotateRight()
        hasMoved = this.moveLeft()
        this.rotateRight()
        this.rotateRight()
        this.rotateRight()

        break;
      case 'up':

        this.rotateRight()
        this.rotateRight()
        this.rotateRight()

        hasMoved = this.moveLeft()

        this.rotateRight()

        break;
    }
    //console.log(hasMoved);
    if (hasMoved) {
      this.createNewTile();
    }



    for (let i = 0; i < this.board.length; i++) {
      if (this.board[i] == 2048) {
        this.won = true;
        for (let j = 0; j < this.callBacksWin.length; j++) {
          let currCallback = this.callBacksWin[j];
          currCallback(this.getGameState());
        }
      }
    }
    //console.log(gameState.board);
    //this.toString()
    this.isOver();
    //this.onMove();
    for (let j = 0; j < this.callBacksMove.length; j++) {
      let currCallback = this.callBacksMove[j];
      currCallback();
    }
  }

  isOver () {
    let checkBoard = this.board;
    for (let i = 0; i < checkBoard.length; i++) {
      if (checkBoard[i] == 0) {
        return;
      }
    }

    //console.log("no 0s")

    for (let i = 0; i < 3; i++) {
      let index = 0;
      let currRow = index + this.size;
      while (index < checkBoard.length) {
        currRow = index + this.size


        for (index; index < currRow; index++) {
          if (checkBoard[index] == checkBoard[index + 1] && (index + 1) < currRow) {
            //console.log("test")
            return;
          }
        }
      }

      let newBoard = []
      for (let k = 0; k < this.size; k++) {
        for (let j = 0; j < this.size; j++) {
          newBoard[k * this.size + j] = checkBoard[(this.size - j - 1) * this.size + k]
        }
      }

      checkBoard = newBoard
    }

    this.over = true;

    for (let j = 0; j < this.callBacksLose.length; j++) {
      let currCallback = this.callBacksLose[j];
      currCallback(this.getGameState());
    }
    //this.toString();
    //console.log("game is over");
  }

  rotateRight () {
    let newBoard = []
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        newBoard[i * this.size + j] = this.board[(this.size - j - 1) * this.size + i]
      }
    }

    this.board = newBoard
  }

  moveLeft () {
    //get row's values  
    let moved = false;
    //let lost = true;
    let index = 0;
    let currRow = index + this.size;
    while (index < this.board.length) {

      currRow = index + this.size
      // for (let j = currRow; j >= index; j--) {
      //   if (this.board[j] != this.board[j + 1] && this.board[j] == 0 && (j + 1) < currRow) {
      //     let placeHolderval = this.board[j]
      //     this.board[j] = this.board[j + 1]
      //     this.board[j + 1] = placeHolderval;
      //     moved = true;
      //     lost = false;
      //   }
      // }     

      // for (let j = index; j < currRow; j++) {
      //   let skip = false
      //   if ((j + 1) < currRow && this.board[j] != 0)
      //     skip = true;
      //   //console.log(skip)
      //   if (!skip) {
      //     let valAhead = this.board[j + 1]
      //     let currVal = this.board[j]
      //     this.board[j + 1] = currVal;
      //     this.board[j] = valAhead
      //   }
      // }
      for (let k = index; k < currRow; k++) {
        for (let j = index; j < currRow; j++) {
          if (this.board[j] == 0 && (j + 1) < currRow) {
            let placeHolderval = this.board[j]
            this.board[j] = this.board[j + 1]
            this.board[j + 1] = placeHolderval;
            moved = true;
            //lost = false;
          }
        }
      }
      let currIndex = index;

      for (index; index < currRow; index++) {
        //Next to Each Other
        // for (let k = 0; k < this.board.length; k++) {
        if (this.board[index] == this.board[index + 1] && this.board[index] != 0 && (index + 1) < currRow) {
          this.board[index] = (this.board[index] + this.board[index]);
          this.score += this.board[index];
          if (this.board[index + 2] != 0 && (index + 1) < currRow && (index + 2) < currRow) {
            this.board[index + 1] = this.board[index + 2]
            this.board[index + 2] = 0
          } else {
            this.board[index + 1] = 0;
          }
          moved = true;
          //lost = false;
        }
        //}

        for (let k = currIndex; k < currRow; k++) {
          for (let j = currIndex; j < currRow; j++) {
            if (this.board[j] == 0 && (j + 1) < currRow) {
              let placeHolderval = this.board[j]
              this.board[j] = this.board[j + 1]
              this.board[j + 1] = placeHolderval;
              moved = true;
              //lost = false;
            }
          }
        }



      }

      for (let k = currIndex; k < currRow; k++) {
        for (let j = currIndex; j < currRow; j++) {
          if (this.board[j] == 0 && (j + 1) < currRow) {
            let placeHolderval = this.board[j]
            this.board[j] = this.board[j + 1]
            this.board[j + 1] = placeHolderval;
            moved = true;
            //lost = false;
          }
        }
      }


      // for (currIndex; currIndex < currRow; currIndex++) {
      //   //Next to Each Other
      //   // for (let k = 0; k < this.board.length; k++) {
      //   if (this.board[currIndex] == this.board[currIndex + 1] && this.board[currIndex] != 0 && (currIndex + 1) < currRow) {
      //     this.board[currIndex] = (this.board[currIndex] + this.board[currIndex]);
      //     this.score += this.board[currIndex];
      //     if (this.board[currIndex + 2] != 0 && (currIndex + 1) < currRow && (currIndex + 2) < currRow) {
      //       this.board[currIndex + 1] = this.board[currIndex + 2]
      //       this.board[currIndex + 2] = 0
      //     } else {
      //       this.board[currIndex + 1] = 0;
      //     }
      //     moved = true;
      //     lost = false;
      //   }
      //   //}
      // }




    }

    // for (let i = 0; i < gameState.board.length; i++) {
    //   if (!gameState.board[i] == 0 && i <= 1 && gameState.board[index] != gameState.board[index+1] || gameState.board[index] != gameState.board[index-1]) {
    //     lost = true;
    //   }

    // }
    //console.log(lost);
    // if (lost) {
    //   this.over = true;
    // }
    return moved
  }

  onMove (callback) {
    this.callBacksMove.push(callback);
  }


  onWin (callback) {
    this.callBacksWin.push(callback);
  }

  onLose (callback) {
    this.callBacksLose.push(callback);
  }

  getGameState () {
    let gameState = {
    }

    gameState.board = this.board;
    gameState.score = this.score;
    gameState.won = this.won;
    gameState.over = this.over;
    return gameState
  }

  loadGame (saveData) {
    //let oldGame = gameState;
    //gameState = saveData
    this.board = saveData.board
    this.score = saveData.score
    this.won = saveData.won
    this.over = saveData.over
    this.size = Math.floor(Math.sqrt(saveData.board.length))

  }

  setupNewGame () {
    this.won = false;
    this.over = false;
    this.score = 0;
    this.board = new Array(this.size * this.size);


    let num1 = Math.floor(Math.random() * ((this.size * this.size) - 1));
    let num2 = Math.floor(Math.random() * ((this.size * this.size) - 1));

    let val1 = 2
    if (Math.floor(Math.random() * 10) == 9) {
      val1 = 4;
    }
    let val2 = 2
    if (Math.floor(Math.random() * 10) == 9) {
      val2 = 4;
    }

    while (num1 == num2) {
      num2 = Math.floor(Math.random() * ((this.size * this.size) - 1));
    }

    for (let i = 0; i < this.size * this.size; i++) {
      if (i == num1) {
        this.board[num1] = val1;
      } else if (i == num2) {
        this.board[num2] = val2;
      } else {
        this.board[i] = 0
      }
    }
    //console.log(this.board)
    //console.log(toString());
    this.listeners = [];
  }

  toString () {
    console.log("\n")

    let index = 0;
    let currRow = index + this.size
    while (index < this.board.length) {
      let rowVals = []
      currRow = index + this.size
      let i = 0
      for (index; index < currRow; index++) {
        rowVals[i] = this.board[index];
        i++;
      }
      console.log(rowVals);
    }

    // for (let i = 0; i < multiboard.length; i++) {
    // for (let k = 0; k < multiboard.length; k++) {
    // }

    // console.log(multiboard[i])

    //}

  }


}


Game.Event = {
  WIN: 0,
  MOVE: 1,
  LOSE: 2,
};