const checkBoard = {
  //Determines the outcome of a rock paper scissors round
  compareMoves: (userMove, aiMove) => {
    if (userMove === aiMove) return "tie";
    else if (userMove === 0 && aiMove === 2) return "user wins";
    else if (userMove === 1 && aiMove === 0) return "user wins";
    else if (userMove === 2 && aiMove === 1) return "user wins";
    else return "ai wins";
  },

  //Diagonal check for victory
  checkDiagonalLeftToRight(board, playerMove, boardOwner) {
    let tileArray = [0, 6, 12, 18, 24];
    let outcome = true;
    tileArray.forEach((tile) => {
      if (board[tile][playerMove] === "none") outcome = false;
      if (board[tile].outcome === boardOwner) outcome = false;
      if (board[tile].outcome === "tie") outcome = false;
    });
    return outcome;
  },

  //Diagonal check for victory
  checkDiagonalRightToLeft(board, playerMove, boardOwner) {
    let tileArray = [4, 8, 12, 16, 20];
    let outcome = true;
    tileArray.forEach((tile) => {
      if (board[tile][playerMove] === "none") outcome = false;
      if (board[tile].outcome === boardOwner) outcome = false;
      if (board[tile].outcome === "tie") outcome = false;
    });
    return outcome;
  },

  //Horizontal check for victory, recursive
  checkHorizontal(board, move, playerMove, boardOwner) {
    let outcomeList = [];
    let moveList = [];
    for (let i = 0; i < 5; i++) {
      outcomeList.push(board[move + i].outcome);
      moveList.push(board[move + i][playerMove]);
    }

    if (!moveList.includes("none"))
      if (!outcomeList.includes(boardOwner) && !outcomeList.includes("tie"))
        return true;

    if (move + 5 <= 24)
      return this.checkHorizontal(board, move + 5, playerMove, boardOwner);
    else return false;
  },

  //Vertical check for victory, recursive
  checkVertical(board, move, playerMove, boardOwner) {
    let outcomeList = [];
    let moveList = [];
    for (let i = 0; i < 5; i++) {
      outcomeList.push(board[move + i * 5].outcome);
      moveList.push(board[move + i * 5][playerMove]);
    }

    if (!moveList.includes("none"))
      if (!outcomeList.includes(boardOwner) && !outcomeList.includes("tie"))
        return true;

    if (move + 1 <= 4)
      return this.checkVertical(board, move + 1, playerMove, boardOwner);
    else return false;
  },

  //Checks for ties, sends back an array of tiles that need to have a tie settled
  checkForTies(board) {
    const moveSet = ["rock", "paper", "scissors"];
    let tieArray = [];
    board.forEach((tile, index) => {
      if (tile.userMove !== "none" && tile.aiMove !== "none" && !tile.outcome) {
        tile.index = index;
        tieArray.push(tile);
      }
    });

    let resultsArray = [];
    tieArray.forEach((tile) => {
      let outcome = this.compareMoves(
        moveSet.indexOf(tile.userMove),
        tile.aiMove
      );
      tile.outcome = outcome;
      resultsArray.push(tile);
    });

    return resultsArray;
  },
};

export default checkBoard;
