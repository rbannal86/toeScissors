import React, { useEffect, useState } from "react";
import "../Board/Board.css";
import Button from "../Button/Button.js";
import Submit from "../Submit/Submit.js";
import Result from "../Result/Result.js";
import Tie from "../Tie/Tie.js";
import aiLogicEasy from "../../Services/ai_logic_easy";

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
  const [handleTie, setHandleTie] = useState(false);

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
      let aiMove = aiLogicEasy.makeMove(board);

      let updatedAiButton = {
        ...board[aiMove.aiMove],
        aiMove: aiMove.aiChoice,
        contested: true,
      };

      let updatedButton = {
        ...board[currentSelect.id],
        userMove: items[currentSelect.item],
        userMoveNumber: currentSelect.item,
        contested: true,
      };

      let result;

      if (aiMove.aiMove === currentSelect.id) {
        console.log(aiMove.aiChoice);
        result = aiLogicEasy.compareMove(currentSelect.item, aiMove.aiChoice);
        console.log(result);
        if (result === "user") updatedButton.owner = "user";
        else if (result === "ai") updatedButton.owner = "ai";
        else if (result === "tie") {
          setFeedback("You and your opponent selected the same tile!");
          setHandleTie(true);
        }
      }

      if (result !== "tie") {
        let updatedBoard = board;
        updatedBoard[currentSelect.id] = updatedButton;
        let result = checkBoard(currentSelect.id, 1);
        if (!result) {
          setCurrentSelect({ id: null, item: 0 });
          setBoard(updatedBoard);
        }
        result = checkBoard(aiMove.aiMove, 2);
        if (!result) {
          setCurrentSelect({ id: null, item: 0 });
          setBoard(updatedBoard);
        }
      }
    }
  };

  //check board for a win and updates the results board
  const checkBoard = (location, user) => {
    let column = location % 5;
    let row = Math.floor((location / 25) * 5);
    let updatedStatus = boardStatus;

    updatedStatus[row][column] = user;

    for (let i = 0; i < 5; i++) {
      //check row-match
      if (
        updatedStatus[i][0] === user &&
        updatedStatus[i][1] === user &&
        updatedStatus[i][2] === user &&
        updatedStatus[i][3] === user &&
        updatedStatus[i][4] === user
      ) {
        setGameOver(user);
        return true;
      }
      //check column-match
      if (
        updatedStatus[0][i] === user &&
        updatedStatus[1][i] === user &&
        updatedStatus[2][i] === user &&
        updatedStatus[3][i] === user &&
        updatedStatus[4][i] === user
      ) {
        setGameOver(user);
        return true;
      }
    }
    if (
      updatedStatus[0][0] === user &&
      updatedStatus[1][1] === user &&
      updatedStatus[2][2] === user &&
      updatedStatus[3][3] === user &&
      updatedStatus[4][4] === user
    ) {
      setGameOver(user);
      return true;
    }
    if (
      updatedStatus[0][4] === user &&
      updatedStatus[1][3] === user &&
      updatedStatus[2][2] === user &&
      updatedStatus[3][1] === user &&
      updatedStatus[4][0] === user
    ) {
      setGameOver(user);
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

  //YOU ARE HERE WORKING ON WHAT HAPPENS WHEN THE AI AND THE USER CHOOSE
  //THE SAME TILE -- CURRENTLY YOU NEED TO UPDATE THE BOARD APPROPRIATELY
  const handleTieSubmission = (userMove) => {
    let aiMove = aiLogicEasy.makeMove(board);
    let results = aiLogicEasy.compareMove(userMove, aiMove);

    console.log(results);
    if (results !== "tie") {
      setHandleTie(false);
      if (results === "user") {
        setFeedback("You won!");
      }
    }
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
      {handleTie ? (
        <></>
      ) : (
        <Submit handleSubmit={handleSubmit} handleReset={handleReset} />
      )}
      <div className="game_feedback">{feedback}</div>
      {handleTie ? <Tie handleSubmit={handleTieSubmission} /> : <></>}
    </div>
  );
}

export default Board;
