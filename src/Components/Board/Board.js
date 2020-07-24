import React, { useState, useEffect } from "react";
import aiLogic from "../../Services/ai_logic";
import "./Board.css";

function Board() {
  const [currentSelect, setCurrentSelect] = useState({ id: null, item: 0 });
  const [board, setBoard] = useState([]);
  const [fresh, setFresh] = useState(true);
  const [feedback, setFeedback] = useState("");
  const [tieBreaker, setTieBreaker] = useState(false);

  let items = ["rock", "paper", "scissors"];

  useEffect(() => {
    if (fresh) {
      let newBoard = [];
      for (let i = 0; i < 25; i++) {
        //add new items to button object as needed
        newBoard.push({
          id: i,
          userMove: " ",
          aiMove: " ",
          aiItem: null,
          owner: null,
          contested: false,
        });
      }
      setBoard(newBoard);
      setFresh(false);
    }
  }, [fresh]);

  const handleClick = (e) => {
    setFeedback("");
    let nextItem;
    let targetId = parseInt(e.target.id);
    if (board[targetId].userMove === " ") {
      if (currentSelect.item === 0 && currentSelect.id === null) nextItem = 0;
      else if (currentSelect.id !== targetId) nextItem = 0;
      else if (currentSelect.item === 2) nextItem = 0;
      else nextItem = currentSelect.item + 1;
      setCurrentSelect({ id: parseInt(e.target.id), item: nextItem });
    } else {
      setFeedback("You have already set this tile!");
    }
  };

  const handleSubmit = () => {
    let updatedButton = {
      ...board[currentSelect.id],
      userMove: items[currentSelect.item],
      userMoveNumber: currentSelect.item,
      contested: true,
    };
    let updatedBoard = board;
    updatedBoard[currentSelect.id] = updatedButton;
    setCurrentSelect({ id: null, item: 0 });
    setBoard(updatedBoard);
    let outcome = aiLogic.makeMove(board);
    console.log(outcome);
    if (outcome.message === "tie") {
      setFeedback("It's a tie!");
      setTieBreaker(true);
    }
    if (outcome.message === "ai") {
      board[currentSelect.id].owner = "ai";
      setFeedback("Your opponent won the tile!");
    }
    if (outcome.message === "user") {
      board[currentSelect.id].owner = "user";
      setFeedback("You won the tile!");
    } else {
      let aiUpdate = {
        ...board[outcome.id],
        aiMove: items[outcome.selection],
        contested: true,
      };
      let updatedAiBoard = board;
      updatedAiBoard[outcome.id] = aiUpdate;
      setBoard(updatedAiBoard);
    }
  };

  const handleReset = () => {
    setFresh(true);
    setCurrentSelect({ id: null, item: 0 });
  };

  const renderBoard = () => {
    return board.map((button) => {
      if (button.owner) {
        if (button.owner === "user") {
          return (
            <button className="board_button" key={button.id}>
              <div className="button_label">X</div>
            </button>
          );
        } else {
          return (
            <button className="board_button" key={button.id}>
              <div className="button_label">O</div>
            </button>
          );
        }
      } else {
        let className = "board_button " + button.userMove;
        let buttonLabel = button.userMove[0];
        if (button.id === currentSelect.id) {
          className = "board_button " + items[currentSelect.item];
          buttonLabel = items[currentSelect.item];
        }

        if ((button.id + 1) % 5 === 0) {
          return (
            <span key={"button" + button.id}>
              <button
                key={button.id}
                id={button.id}
                className={className}
                onClick={(e) => handleClick(e)}
              >
                {button.aiMove !== " " ? (
                  <span className="button_label">?</span>
                ) : (
                  <span className="button_label">{buttonLabel[0]}</span>
                )}
              </button>
              <br key={"break" + button.id} />
            </span>
          );
        } else
          return (
            <span key={"button" + button.id}>
              <button
                key={button.id}
                id={button.id}
                className={className}
                onClick={(e) => handleClick(e)}
              >
                {button.aiMove !== " " ? (
                  <span className="button_label">?</span>
                ) : (
                  <span className="button_label">{buttonLabel[0]}</span>
                )}
              </button>
            </span>
          );
      }
    });
  };

  return (
    <div className="game_board">
      {renderBoard()}
      <br></br>
      <button onClick={() => handleSubmit()}>Submit</button>
      <button onClick={() => handleReset()}>Reset</button>
      <h3>{feedback}</h3>
      {tieBreaker ? (
        <div>
          <button>Rock</button>
          <button>Paper</button>
          <button>Scissors</button>
          <button>Shoot!</button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Board;
