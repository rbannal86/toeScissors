const aiLogicEasy = {
  makeMove(board) {
    // let aiMove = Math.floor(Math.random() * 25);
    let aiMove = 0;
    let aiChoice = Math.floor(Math.random() * 3);
    if (board[aiMove].aiMove === null)
      return { aiMove: aiMove, aiChoice: aiChoice };
    else {
      console.log("AI ALREADY MOVED HERE");
      return this.makeMove(board);
    }
  },

  compareMove(userMove, aiMove) {
    console.log("checking results");
    if (userMove === aiMove) return "tie";
    if (userMove + 1 === aiMove) return "ai";
    else return "user";
  },
};

export default aiLogicEasy;
