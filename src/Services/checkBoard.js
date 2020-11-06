const checkBoard = {
  afterConfirm: (userTile, aiTile) => {
    if (userTile === aiTile) return true;
    else return false;
  },

  compareMoves: (userMove, aiMove) => {
    console.log(userMove);
    console.log(aiMove);
    if (userMove === aiMove) return "tie";
    else if (userMove === 0 && aiMove === 2) return "user wins";
    else if (userMove === 1 && aiMove === 0) return "user wins";
    else if (userMove === 2 && aiMove === 1) return "user wins";
    else return "ai wins";
  },

  checkDiagonalLeftToRight(board, move, playerMove, boardOwner) {
    if (board[move]?.outcome !== boardOwner)
      if (board[move][playerMove] === "none") return false;
      else if (move + 6 > 24) return true;
      else
        return this.checkDiagonalLeftToRight(
          board,
          move + 6,
          playerMove,
          boardOwner
        );
  },

  checkDiagonalRightToLeft(board, move, playerMove, boardOwner) {
    if (board[move]?.outcome !== boardOwner)
      if (board[move][playerMove] === "none") return false;
      else if (move + 6 > 24) return true;
      else
        return this.checkDiagonalRightToLeft(
          board,
          move + 6,
          playerMove,
          boardOwner
        );
  },

  checkHorizontal(board, move, playerMove, boardOwner) {
    let outcomeList = [];
    let moveList = [];
    for (let i = 0; i < 5; i++) {
      outcomeList.push(board[move + i].outcome);
      moveList.push(board[move + i][playerMove]);
    }

    if (!moveList.includes("none"))
      if (!outcomeList.includes(boardOwner)) return true;

    if (move + 5 <= 24)
      return this.checkHorizontal(board, move + 5, playerMove, boardOwner);
    else return false;
  },

  checkVertical(board, move, playerMove, boardOwner) {
    let outcomeList = [];
    let moveList = [];
    for (let i = 0; i < 5; i++) {
      outcomeList.push(board[move + i * 5].outcome);
      moveList.push(board[move + i * 5][playerMove]);
    }

    if (!moveList.includes("none"))
      if (!outcomeList.includes(boardOwner)) return true;

    if (move + 1 <= 4)
      return this.checkVertical(board, move + 1, playerMove, boardOwner);
    else return false;
  },

  // checkWinner: (board) => {
  //   let tileList;
  //   let userWins = true;
  //   let aiWins = true;
  //   //check diagonals
  //   tileList = [0, 6, 12, 18, 24];
  //   tileList.forEach((tile) => {
  //     if (board[tile].outcome !== "user wins")
  //       if (board[tile].userMove === "none") userWins = false;
  //     if (board[tile].outcome !== "ai wins")
  //       if (board[tile].aiMove === "none") aiWins = false;
  //   });
  //   if (userWins) return "user wins";
  //   if (aiWins) return "ai wins";

  //   userWins = true;
  //   aiWins = true;
  //   tileList = [4, 8, 12, 16, 20];

  //   tileList.forEach((tile) => {
  //     if (board[tile].outcome !== "user wins")
  //       if (board[tile].userMove === "none") userWins = false;
  //     if (board[tile].outcome !== "ai wins")
  //       if (board[tile].aiMove === "none") aiWins = false;
  //   });
  //   if (userWins) return "user wins";
  //   if (aiWins) return "ai wins";

  //   //check horizontal
  //   userWins = true;
  //   aiWins = true;
  //   tileList = [0, 5, 10, 15, 20];

  //   tileList.forEach((tile) => {

  //     if (
  //       (board[tile].userMove ||
  //         board[tile + 1].userMove ||
  //         board[tile + 2].userMove ||
  //         board[tile + 3].userMove ||
  //         board[tile + 4].userMove) === "none"
  //     )
  //       if (board[tile].userMove === "none") userWins = false;
  //     if (board[tile].outcome !== "ai wins")
  //       if (board[tile].aiMove === "none") aiWins = false;
  //   });
  //   if (userWins) return "user wins";
  //   if (aiWins) return "ai wins";
  //   //check vertical

  //   return false;
  // },

  // checkUserWin: (board, userMove) => {
  //   if (userMove !== " ") {
  //     let victory = true;
  //     let stopCheck = false;
  //     //check diagonals
  //     if (userMove % 6 === 0) {
  //       let tileList = [0, 6, 12, 18, 24];
  //       tileList.forEach((tile) => {
  //         if (
  //           (!board[tile].outcome && board[tile].userMove === "none") ||
  //           board[tile].outcome === "ai wins"
  //         )
  //           victory = false;
  //       });
  //       if (victory === true) stopCheck = true;
  //     }
  //     if (userMove % 4 === 0 && !stopCheck) {
  //       let tileList = [4, 8, 12, 16, 20];
  //       tileList.forEach((tile) => {
  //         if (
  //           (!board[tile].outcome && board[tile].userMove === "none") ||
  //           board[tile].outcome === "ai wins"
  //         )
  //           victory = false;
  //       });
  //       if (victory === true) stopCheck = true;
  //     }
  //     if (!stopCheck) victory = true;
  //     //check horizontal and vertical
  //     if (!stopCheck) {
  //       let horizontalList = [];
  //       let verticalList = [userMove];

  //       //create a vertical check list
  //       let i = userMove;
  //       while (i - 5 >= 0) {
  //         i = i - 5;
  //         verticalList.push(i);
  //       }
  //       i = userMove;
  //       while (i + 5 <= 24) {
  //         i = i + 5;
  //         verticalList.push(i);
  //       }

  //       //create a horizontal checklist
  //       let moveLocation =
  //         userMove - (userMove / 5 - Math.floor(userMove / 5)).toFixed(1) * 5;
  //       for (let j = 0; j < 5; j++) {
  //         horizontalList.push(moveLocation + j);
  //       }

  //       //check vertical
  //       verticalList.forEach((tile) => {
  //         if (
  //           (!board[tile].outcome && board[tile].userMove === "none") ||
  //           board[tile].outcome === "ai wins"
  //         )
  //           victory = false;
  //       });
  //       console.log(victory);
  //       if (victory === true) stopCheck = true;
  //       if (!stopCheck) victory = true;

  //       if (!stopCheck) {
  //         horizontalList.forEach((tile) => {
  //           if (
  //             (!board[tile].outcome && board[tile].userMove === "none") ||
  //             board[tile].outcome === "ai wins"
  //           )
  //             victory = false;
  //         });
  //       }
  //     }

  //     return victory;
  //   }
  // },

  checkAiWin: (board, aiMove) => {
    if (aiMove !== " ") {
      let victory = true;
      let stopCheck = false;
      //check diagonals
      if (aiMove % 6 === 0) {
        let tileList = [0, 6, 12, 18, 24];
        tileList.forEach((tile) => {
          if (
            (!board[tile].outcome && board[tile].aiMove === "none") ||
            board[tile].outcome === "user wins"
          )
            victory = false;
        });
        if (victory === true) {
          stopCheck = true;
          console.log("ai diagonal win");
        }
      }
      if (aiMove % 4 === 0 && !stopCheck) {
        let tileList = [4, 8, 12, 16, 20];
        tileList.forEach((tile) => {
          if (
            (!board[tile].outcome && board[tile].aiMove === "none") ||
            board[tile].outcome === "user wins"
          )
            victory = false;
        });
        if (victory === true) {
          stopCheck = true;
          console.log("ai diagonal win");
        }
      }
      if (!stopCheck) victory = true;
      //check horizontal and vertical
      if (!stopCheck) {
        let horizontalList = [];
        let verticalList = [aiMove];

        console.log(aiMove);

        //create a vertical check list
        let i = aiMove;
        while (i - 5 >= 0) {
          i = i - 5;
          verticalList.push(i);
        }
        i = aiMove;
        while (i + 5 <= 24) {
          i = i + 5;
          verticalList.push(i);
        }

        //create a horizontal checklist
        let moveLocation =
          aiMove - (aiMove / 5 - Math.floor(aiMove / 5)).toFixed(1) * 5;
        for (let j = 0; j < 5; j++) {
          horizontalList.push(moveLocation + j);
        }

        //check vertical
        verticalList.forEach((tile) => {
          if (
            (!board[tile].outcome && board[tile].aiMove === "none") ||
            board[tile].outcome === "ai wins"
          )
            victory = false;
        });
        if (victory === true) {
          stopCheck = true;
          console.log("ai vertical win");
        }
        if (!stopCheck) victory = true;

        if (!stopCheck) {
          horizontalList.forEach((tile) => {
            if (
              (!board[tile].outcome && board[tile].aiMove === "none") ||
              board[tile].outcome === "ai wins"
            )
              victory = false;
          });
        }
      }
      return victory;
    }
  },
};

export default checkBoard;
