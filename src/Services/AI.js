const AI = {
  //random movement
  aiMove() {
    console.log("random ai movement");
    return {
      tile: Math.floor(Math.random() * 25),
      move: Math.floor(Math.random() * 3),
    };
  },

  checkRows(board, rowArray = [0, 1, 2, 3, 4]) {
    let nextArray = [];
    let emptyIndex = [];
    let aiBlocks = false;
    rowArray.forEach((tile, index) => {
      if (board[tile]?.outcome === "ai wins") aiBlocks = true;
      else if (board[tile].aiMove === "none" && board[tile].userMove !== "none")
        emptyIndex.push(tile);
      else if (board[tile].outcome === "user wins") emptyIndex.push(null);
      nextArray[index] = tile + 5;
    });
    if (aiBlocks === true) {
      if (Math.max(nextArray) >= 25) return false;
      else return this.checkColumns(board, nextArray);
    } else if (emptyIndex.length >= 3 && emptyIndex.length < 5) {
      emptyIndex = emptyIndex.filter(
        (item) => item || item?.toString() === "0"
      );
      let index = Math.floor(Math.random() * emptyIndex.length);
      return emptyIndex[index];
    } else if (Math.max(nextArray) < 25) {
      return this.checkRows(board, nextArray);
    } else return false;
  },

  checkColumns(board, columnArray = [0, 5, 10, 15, 20]) {
    let nextArray = [];
    let emptyIndex = [];
    let aiBlocks = false;
    columnArray.forEach((tile, index) => {
      if (board[tile]?.outcome === "ai wins") aiBlocks = true;
      else if (board[tile].aiMove === "none" && board[tile].userMove !== "none")
        emptyIndex.push(tile);
      else if (
        board[tile].outcome === "user wins" ||
        board[tile].aiMove !== "none"
      )
        emptyIndex.push(null);
      nextArray[index] = tile + 1;
    });
    if (aiBlocks === true) {
      if (Math.max(nextArray) >= 25) return false;
      else return this.checkColumns(board, nextArray);
    } else if (emptyIndex.length >= 3 && emptyIndex.length <= 5) {
      emptyIndex = emptyIndex.filter(
        (item) => item || item?.toString() === "0"
      );
      let index = Math.floor(Math.random() * emptyIndex.length);
      return emptyIndex[index];
    } else if (Math.max(nextArray) < 25)
      return this.checkColumns(board, nextArray);
    else return false;
  },

  checkDiagonals(board, diagonalArray = [0, 6, 12, 18, 24], final = false) {
    let nextArray = [4, 8, 12, 16, 20];
    let emptyIndex = [];
    let aiBlocks = false;
    diagonalArray.forEach((tile) => {
      if (board[tile].outcome === "ai wins") aiBlocks = true;
      else if (board[tile].aiMove === "none" && board[tile].userMove !== "none")
        emptyIndex.push(tile);
      else if (
        board[tile].outcome === "user wins" ||
        board[tile].aiMove !== "none"
      )
        emptyIndex.push(null);
    });
    if (aiBlocks === true) {
      if (!final) return this.checkDiagonals(board, nextArray, true);
      else return false;
    } else if (emptyIndex.length >= 3 && emptyIndex.length <= 5) {
      emptyIndex = emptyIndex.filter(
        (item) => item || item?.toString() === "0"
      );
      let index = Math.floor(Math.random() * emptyIndex.length);

      return emptyIndex[index];
    } else if (!final) return this.checkDiagonals(board, nextArray, true);
    else return false;
  },

  //plays defensively by blocking user streaks when available
  //or goes back to random movement
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

  aiMoveMedium(board, initialMove, difficulty = "medium") {
    if (initialMove === " ") return this.aiMove();
    let tile = this.checkForBlocks(board);
    if (tile || tile?.toString() === "0") {
      return { tile: tile, move: Math.floor(Math.random() * 3) };
    } else if (difficulty === "hard") {
      return null;
    } else return this.aiMove();
  },

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

  aiHardChooseMove(board) {
    let possibleMoves = [];
    possibleMoves.push(this.aiHardScanRows(board)[4]);
    possibleMoves.push(this.aiHardScanColumns(board)[4]);
    possibleMoves.push(this.aiHardScanDiagonal(board, [0, 6, 12, 18, 24]));
    possibleMoves.push(this.aiHardScanDiagonal(board, [4, 8, 12, 16, 20]));
    possibleMoves = possibleMoves.filter((tile) => !tile.userBlock);
    possibleMoves = possibleMoves.sort((a, b) => (a.score > b.score ? 1 : -1));
    let newMoveSet = possibleMoves.pop().newMoveArray;
    if (newMoveSet.length > 0)
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
    let move = Math.floor(Math.random() * 3);

    if (lastMove === " ") {
      let cornerMoves = [0, 4, 20, 24];
      let cornerIndex = Math.floor(Math.random() * 4);
      return { tile: cornerMoves[cornerIndex], move: move };
    }
    if (lastMove !== " ") {
      let move = this.aiMoveMedium(board, "hard");
      if (!move) move = this.aiHardChooseMove(board);
      if (move) return move;
      else return this.aiMove();
    }
  },

  aiTie: () => {
    return Math.floor(Math.random() * 3);
  },
};
export default AI;
