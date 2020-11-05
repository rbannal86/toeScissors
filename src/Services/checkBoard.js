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

  checkUserWin: (board, userMove) => {
    let victory = true;
    let stopCheck = false;
    //check diagonals
    if (userMove % 6 === 0) {
      let tileList = [0, 6, 12, 18, 24];
      tileList.forEach((tile) => {
        if (
          (!board[tile].outcome && board[tile].userMove === "none") ||
          board[tile].outcome === "ai wins"
        ) {
          console.log(tile, "user has not won this tile");
          victory = false;
        } else console.log(tile, "user holds this tile");
      });
      if (victory === true) stopCheck = true;
    }
    if (userMove % 4 === 0 && !stopCheck) {
      let tileList = [4, 8, 12, 16, 20];
      tileList.forEach((tile) => {
        if (
          (!board[tile].outcome && board[tile].userMove === "none") ||
          board[tile].outcome === "ai wins"
        ) {
          console.log(tile, "user has not won this tile");
          victory = false;
        } else console.log(tile, "user holds this tile");
      });
      if (victory === true) stopCheck = true;
    }

    return victory;
  },
};

export default checkBoard;
