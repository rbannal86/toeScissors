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
};

export default checkBoard;
