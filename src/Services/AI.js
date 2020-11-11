const AI = {
  //Generates a random tile and move for the AI
  aiMove() {
    return {
      tile: Math.floor(Math.random() * 25),
      move: Math.floor(Math.random() * 3),
    };
  },

  //plays defensively by blocking user streaks when available
  //or goes back to random movement
  //Checks each row, column, and diagonal for a streak of three unblocked user moves or more,
  //then chooses one of those tiles for the next move. If an ai-owned tile exists in that
  //batch of tiles, automatically skips over it.
  checkForBlocks(board) {
    //check rows
    for (let i = 0; i <= 20; i = i + 5) {
      let rowCheck = board.slice(i, i + 5);
      let userOwned = [];
      let userMoves = [];
      let aiMoves = [];
      let emptyTiles = [];
      let aiBlocks = false;
      rowCheck.forEach((tile, index) => {
        if (tile.outcome === "ai wins") aiBlocks = true;
        if (tile.outcome === "user wins") userOwned.push(index + i);
        if (tile.userMove !== "none" && tile.outcome === null)
          userMoves.push(index + i);
        if (tile.aiMove !== "none" && tile.outcome === null)
          aiMoves.push(index + i);
        if (
          tile.aiMove === "none" &&
          tile.userMove === "none" &&
          tile.outcome === null
        )
          emptyTiles.push(index + i);
      });
      let availableMoves = userMoves.concat(emptyTiles);
      if (
        userOwned.length + userMoves.length >= 3 &&
        !aiBlocks &&
        availableMoves.length > 0
      ) {
        let index = Math.floor(Math.random() * availableMoves.length);
        return availableMoves[index];
      }
    }
    for (let i = 0; i < 5; i++) {
      let columnCheck = [
        board[i],
        board[i + 5],
        board[i + 10],
        board[i + 15],
        board[i + 20],
      ];
      let userOwned = [];
      let userMoves = [];
      let aiMoves = [];
      let emptyTiles = [];
      let aiBlocks = false;
      columnCheck.forEach((tile, index) => {
        if (tile.outcome === "ai wins") aiBlocks = true;
        if (tile.outcome === "user wins") userOwned.push(i + index * 5);
        if (tile.userMove !== "none" && tile.outcome === null)
          userMoves.push(i + index * 5);
        if (tile.aiMove !== "none" && tile.outcome === null)
          aiMoves.push(i + index * 5);
        if (
          tile.aiMove === "none" &&
          tile.userMove === "none" &&
          tile.outcome === null
        )
          emptyTiles.push(i + index * 5);
      });
      let availableMoves = userMoves.concat(emptyTiles);
      if (
        userOwned.length + userMoves.length >= 3 &&
        !aiBlocks &&
        availableMoves.length > 0
      ) {
        let index = Math.floor(Math.random() * availableMoves.length);
        return availableMoves[index];
      }
    }

    let finished = false;

    while (!finished) {
      let diagonalLtoRCheck = [
        board[0],
        board[6],
        board[12],
        board[18],
        board[24],
      ];
      let userOwned = [];
      let userMoves = [];
      let aiMoves = [];
      let emptyTiles = [];
      let aiBlocks = false;
      diagonalLtoRCheck.forEach((tile, index) => {
        if (tile.outcome === "ai wins") aiBlocks = true;
        if (tile.outcome === "user wins") userOwned.push(0 + 6 * index);
        if (tile.userMove !== "none" && tile.outcome === null)
          userMoves.push(0 + 6 * index);
        if (tile.aiMove !== "none" && tile.outcome === null)
          aiMoves.push(0 + 6 * index);
        if (
          tile.aiMove === "none" &&
          tile.userMove === "none" &&
          tile.outcome === null
        )
          emptyTiles.push(0 + 6 * index);
      });
      let availableMoves = userMoves.concat(emptyTiles);
      if (
        userOwned.length + userMoves.length >= 3 &&
        !aiBlocks &&
        availableMoves.length > 0
      ) {
        let index = Math.floor(Math.random() * availableMoves.length);
        return availableMoves[index];
      }
      finished = true;
    }

    let diagonalRtoLCheck = [
      board[4],
      board[8],
      board[12],
      board[16],
      board[20],
    ];
    let userOwned = [];
    let userMoves = [];
    let aiMoves = [];
    let emptyTiles = [];
    let aiBlocks = false;
    diagonalRtoLCheck.forEach((tile, index) => {
      if (tile.outcome === "ai wins") aiBlocks = true;
      if (tile.outcome === "user wins") userOwned.push(4 + 4 * index);
      if (tile.userMove !== "none" && tile.outcome === null)
        userMoves.push(4 + 4 * index);
      if (tile.aiMove !== "none" && tile.outcome === null)
        aiMoves.push(4 + 4 * index);
      if (
        tile.aiMove === "none" &&
        tile.userMove === "none" &&
        tile.outcome === null
      )
        emptyTiles.push(4 + 4 * index);
    });
    let availableMoves = userMoves.concat(emptyTiles);
    if (
      userOwned.length + userMoves.length >= 3 &&
      !aiBlocks &&
      availableMoves.length > 0
    ) {
      let index = Math.floor(Math.random() * availableMoves.length);
      return availableMoves[index];
    }
  },

  //Main controller for medium difficulty. Checks the outcome from the block checks to
  //determine if it's a valid move. If not, it calls the randomizer.
  aiMoveMedium(board, difficulty = "medium") {
    let tile = this.checkForBlocks(board);
    if ((tile || tile?.toString() === "0") && board[tile].aiMove === "none") {
      return { tile: tile, move: Math.floor(Math.random() * 3) };
    } else if (difficulty === "hard") {
      return null;
    } else return this.aiMove();
  },

  //Scans row for hard difficulty. Finds the highest-scoring row and sends it back to
  //the controller for a final processing.
  aiHardScanRows(board, rowArray = [0, 1, 2, 3, 4], resultsArray = []) {
    let newMoveArray = [...rowArray];
    let newRowArray = [];
    let score = 0;
    let userBlock = false;
    let resultsObject = { score, newMoveArray, userBlock };
    let newResultsArray = [...resultsArray];

    rowArray.forEach((tile, index) => {
      if (board[tile].outcome === "user wins") {
        newMoveArray = [];
        score = 0;
        userBlock = true;
      } else if (
        board[tile].outcome === "ai wins" ||
        board[tile].aiMove !== "none"
      ) {
        newMoveArray = newMoveArray.filter((move) => move !== tile);
        score = score + 1;
      } else if (board[tile].userMove !== "none") {
        score = score - 0.5;
      }

      newRowArray[index] = tile + 5;
    });
    resultsObject.score = score;
    resultsObject.newMoveArray = newMoveArray;
    resultsObject.userBlock = userBlock;
    newResultsArray.push(resultsObject);
    if (newRowArray[4] >= 25) {
      newResultsArray.sort((a, b) => (a.score > b.score ? 1 : -1));
      return newResultsArray;
    } else return this.aiHardScanRows(board, newRowArray, newResultsArray);
  },

  //Same as the previous function, but for columns.
  aiHardScanColumns(
    board,
    columnArray = [0, 5, 10, 15, 20],
    resultsArray = []
  ) {
    let newMoveArray = [...columnArray];
    let newColumnArray = [...columnArray];
    let score = 0;
    let userBlock = false;
    let resultsObject = { score, newMoveArray, userBlock };
    let newResultsArray = [...resultsArray];

    columnArray.forEach((tile, index) => {
      if (board[tile].outcome === "user wins") {
        newMoveArray = [];
        score = 0;
        userBlock = true;
      } else if (
        board[tile].outcome === "ai wins" ||
        board[tile].aiMove !== "none"
      ) {
        newMoveArray = newMoveArray.filter((move) => move !== tile);
        score = score + 1;
      } else if (board[tile].userMove !== "none") {
        score = score - 0.5;
      }

      newColumnArray[index] = newColumnArray[index] + 1;
    });

    resultsObject.score = score;
    resultsObject.newMoveArray = newMoveArray;
    resultsObject.userBlock = userBlock;
    newResultsArray.push(resultsObject);
    if (newColumnArray[4] === 25) {
      newResultsArray.sort((a, b) => (a.score > b.score ? 1 : -1));
      return newResultsArray;
    } else
      return this.aiHardScanColumns(board, newColumnArray, newResultsArray);
  },

  //Same as the previous, for diagonals
  aiHardScanDiagonal(board, diagonalArray) {
    let moveArray = [...diagonalArray];
    let score = 0;
    let userBlock = false;
    let resultsObject = { score, userBlock };

    diagonalArray.forEach((tile) => {
      if (board[tile].outcome === "user wins") {
        moveArray = [];
        score = 0;
        userBlock = true;
      } else if (
        board[tile].outcome === "ai wins" ||
        board[tile].aiMove !== "none"
      ) {
        moveArray = moveArray.filter((move) => move !== tile);
        score = score + 1;
      } else if (board[tile].userMove !== "none") {
        score = score - 0.5;
      }
    });

    resultsObject.score = score;
    resultsObject.newMoveArray = moveArray;
    resultsObject.userBlock = userBlock;
    return resultsObject;
  },

  //Takes the results from the last functions and finds the highest scoring, then randomly
  //chooses one of those tiles.
  aiHardChooseMove(board) {
    let possibleMoves = [];
    possibleMoves.push(this.aiHardScanRows(board)[4]);
    possibleMoves.push(this.aiHardScanColumns(board)[4]);
    possibleMoves.push(this.aiHardScanDiagonal(board, [0, 6, 12, 18, 24]));
    possibleMoves.push(this.aiHardScanDiagonal(board, [4, 8, 12, 16, 20]));
    possibleMoves = possibleMoves.filter((tile) => !tile.userBlock);
    possibleMoves = possibleMoves.sort((a, b) => (a.score > b.score ? 1 : -1));
    let newMoveSet = possibleMoves.pop()?.newMoveArray;
    if (newMoveSet?.length > 0)
      return {
        tile: newMoveSet[Math.floor(Math.random() * newMoveSet.length)],
        move: Math.floor(Math.random() * 3),
      };
    else return null;
  },

  //begin moving in a randomly selected direction
  //Check for a potential block first
  //if a player blocks, caluclate risk -- if the streak is 3 long with a block
  //on tile 4, calculate a score of 2.5 (1pt per tile, -.5 for block) > a new direction has a score of 2.
  //This means, if the ai has made a chain of three, they will contest the 4th,
  //but change directions on two or less blocks.
  //If a direction runs into a user-owned tile, abandons that direction.
  //If all directions are blocked by a user-owned tile, start randomizing.
  aiMoveHard(board, lastMove) {
    //randomly start off in a corner
    if (lastMove === " ") {
      let cornerMoves = [0, 4, 20, 24];
      let cornerIndex = Math.floor(Math.random() * 4);
      return {
        tile: cornerMoves[cornerIndex],
        move: Math.floor(Math.random() * 3),
      };
    }
    if (lastMove !== " ") {
      let move = this.aiMoveMedium(board, "hard");
      if (!move) move = this.aiHardChooseMove(board);
      if (move && board[move.tile]?.aiMove === "none") return move;
      else return this.aiMove();
    }
  },

  //Determines the move when the ai and user tie
  aiTie: () => {
    return Math.floor(Math.random() * 3);
  },
};
export default AI;
