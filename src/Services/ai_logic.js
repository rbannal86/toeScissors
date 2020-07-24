const aiLogic = {
  makeMove(board) {
    // let aiMove = Math.floor(Math.random() * 25);
    let aiMove = 0;
    let aiChoice = Math.floor(Math.random() * 3);
    let outcome = {};
    if (board[aiMove].aiMove !== " ") return this.makeMove(board);
    if (board[aiMove].contested === true && board[aiMove].userMove !== " ") {
      outcome.message = this.compareMoves(
        board[aiMove].userMoveNumber,
        aiChoice
      );
    } else {
      outcome = { message: "move made", id: aiMove, selection: aiChoice };
    }
    return outcome;
  },

  compareMoves(userMove, aiMove) {
    console.log(userMove);
    console.log(aiMove);
    if (userMove === aiMove) return "tie";
    if (userMove + 1 === aiMove) return "ai";
    else return "user";
  },
};

/* 
0,0 rock, rock
0,1 rock, paper
0,2 rock, scissor
1,0 paper, rock
1,1 paper, paper
1,2 paper, scissor
*/

export default aiLogic;
