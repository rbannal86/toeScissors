import React, { useEffect, useState } from "react";
import "../Board/Board.css";
import Button from "../Button/Button.js";
import Submit from "../Submit/Submit.js";
import Result from "../Result/Result.js";

function Board() {
  const [fresh, setFresh] = useState(true);
  const [board, setBoard] = useState([]);
  const [currentSelect, setCurrentSelect] = useState({ id: null, item: 0 });
  const [feedback, setFeedback] = useState("");
  const [boardStatus, setBoardStatus] = useState([
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ]);
  const [gameOver, setGameOver] = useState();

  let items = ["rock", "paper", "scissors"];

  //Sets board array of objects upon first render
  useEffect(() => {
    if (fresh) {
      let newBoard = [];
      for (let i = 0; i < 25; i++) {
        newBoard.push({
          id: i,
          userMove: null,
          aiMove: null,
          aiItem: null,
          owner: null,
          contested: false,
        });
      }
      setBoard(newBoard);
      setFresh(false);
    }
  }, [fresh]);

  useEffect(() => {
    setFeedback("");
  }, [currentSelect]);

  //handle click on tile, cycles through rock, paper, scissors
  const handleClick = (button) => {
    let nextItem;
    if (currentSelect.id === null) {
      nextItem = 0;
    } else if (currentSelect.id !== button) {
      nextItem = 0;
    } else if (currentSelect.item === 2) {
      nextItem = 0;
    } else {
      nextItem = currentSelect.item + 1;
    }
    setCurrentSelect({ id: button, item: nextItem });
  };

  //handles move input
  const handleSubmit = () => {
    if (board[currentSelect.id].userMove !== null) {
      setFeedback("You have already selected a move for this tile.");
    } else {
      let updatedButton = {
        ...board[currentSelect.id],
        userMove: items[currentSelect.item],
        userMoveNumber: currentSelect.item,
        contested: true,
      };
      let updatedBoard = board;
      updatedBoard[currentSelect.id] = updatedButton;
      let result = checkBoard();
      if (!result) {
        setCurrentSelect({ id: null, item: 0 });
        setBoard(updatedBoard);
      }
    }
  };

  const checkBoard = () => {
    let column = currentSelect.id % 5;
    let row = Math.floor((currentSelect.id / 25) * 5);
    let updatedStatus = boardStatus;

    updatedStatus[row][column] = 1;

    for (let i = 0; i < 5; i++) {
      //check row-match
      if (
        updatedStatus[i][0] === 1 &&
        updatedStatus[i][1] === 1 &&
        updatedStatus[i][2] === 1 &&
        updatedStatus[i][3] === 1 &&
        updatedStatus[i][4] === 1
      ) {
        setGameOver("user");
        return true;
      }
      //check column-match
      if (
        updatedStatus[0][i] === 1 &&
        updatedStatus[1][i] === 1 &&
        updatedStatus[2][i] === 1 &&
        updatedStatus[3][i] === 1 &&
        updatedStatus[4][i] === 1
      ) {
        setGameOver("user");
        return true;
      }
    }
    if (
      updatedStatus[0][0] === 1 &&
      updatedStatus[1][1] === 1 &&
      updatedStatus[2][2] === 1 &&
      updatedStatus[3][3] === 1 &&
      updatedStatus[4][4] === 1
    ) {
      setGameOver("user");
      return true;
    }
    if (
      updatedStatus[0][4] === 1 &&
      updatedStatus[1][3] === 1 &&
      updatedStatus[2][2] === 1 &&
      updatedStatus[3][1] === 1 &&
      updatedStatus[4][0] === 1
    ) {
      setGameOver("user");
      return true;
    }
    setBoardStatus(updatedStatus);
    return false;
  };

  //resets state
  const handleReset = () => {
    setFresh(true);
    setBoard([]);
    setCurrentSelect([]);
    setFeedback("");
    setBoardStatus([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
    setGameOver();
  };

  const renderBoard = () => {
    return board.map((button) => {
      return (
        <Button
          currentSelect={currentSelect}
          button={button}
          key={button.id}
          handleClick={handleClick}
        />
      );
    });
  };

  return fresh ? (
    <></>
  ) : gameOver ? (
    <Result winner={gameOver} handleReset={handleReset} />
  ) : (
    <div className="game_main">
      <div className="game_board">{renderBoard()}</div>
      <Submit handleSubmit={handleSubmit} handleReset={handleReset} />
      <div className="game_feedback">{feedback}</div>
    </div>
  );
}

export default Board;
