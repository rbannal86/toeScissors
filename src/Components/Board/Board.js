import React, { useState, useEffect } from "react";
import "./Board.css";

function Board() {
  const [currentSelect, setCurrentSelect] = useState({ id: null, item: 0 });
  const [board, setBoard] = useState([]);
  const [fresh, setFresh] = useState(true);

  let items = ["rock", "paper", "scissors"];

  console.log(board);

  useEffect(() => {
    if (fresh) {
      let newBoard = [];
      for (let i = 0; i < 25; i++) {
        //add new items to button object as needed
        newBoard.push({ id: i, userMove: " " });
      }
      setBoard(newBoard);
      setFresh(false);
    }
  }, [fresh]);

  const handleClick = (e) => {
    // e.preventDefault();
    let nextItem;
    if (currentSelect.item === 2) nextItem = 0;
    else if (currentSelect.id !== e.target.id) nextItem = 0;
    else if (currentSelect.item === 0 && !currentSelect.id) nextItem = 0;
    else nextItem = currentSelect.item + 1;
    setCurrentSelect({ id: e.target.id, item: nextItem });
    console.log(currentSelect);
  };

  const handleSubmit = () => {
    let updatedButton = {
      id: currentSelect.id,
      userMove: items[currentSelect.item],
      contested: true,
    };
    let updatedBoard = board;
    updatedBoard[currentSelect.id] = updatedButton;
    setCurrentSelect({ id: null, item: 0 });
    setBoard(updatedBoard);
  };

  const handleReset = () => {
    setFresh(true);
  };

  const renderBoard = () => {
    return board.map((button) => {
      let className = "board_button " + button.userMove;
      let buttonLabel = button.userMove[0];
      console.log(button.id);
      if (parseInt(button.id) === parseInt(currentSelect.id)) {
        className = "board_button " + items[currentSelect.item];
        buttonLabel = items[currentSelect.item];
        console.log(className);
      }

      if ((parseInt(button.id) + 1) % 5 === 0) {
        return (
          <span key={"button" + button.id}>
            <button
              key={button.id}
              id={button.id}
              className={className}
              onClick={(e) => handleClick(e)}
            >
              <span className="button_label">{buttonLabel[0]}</span>
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
              <span className="button_label">{buttonLabel[0]}</span>
            </button>
          </span>
        );
    });
  };

  return (
    <div className="game_board">
      {renderBoard()}
      <br></br>
      <button onClick={() => handleSubmit()}>Submit</button>
      <button onClick={() => handleReset()}>Reset</button>
    </div>
  );
}

export default Board;
