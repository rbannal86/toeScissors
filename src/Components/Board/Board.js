import React, { useState, useEffect } from "react";
import Tile from "../Tile/Tile";
import Buttons from "../Buttons/Buttons";

import "./Board.css";

export default function Board() {
  const [board, setBoard] = useState([
    { userMove: "none" },
    { userMove: "none" },
    { userMove: "none" },
    { userMove: "none" },
    { userMove: "none" },
    { userMove: "none" },
    { userMove: "none" },
    { userMove: "none" },
    { userMove: "none" },
    { userMove: "none" },
    { userMove: "none" },
    { userMove: "none" },
    { userMove: "none" },
    { userMove: "none" },
    { userMove: "none" },
    { userMove: "none" },
    { userMove: "none" },
    { userMove: "none" },
    { userMove: "none" },
    { userMove: "none" },
    { userMove: "none" },
    { userMove: "none" },
    { userMove: "none" },
    { userMove: "none" },
    { userMove: "none" },
  ]);

  const [currentTile, setCurrentTile] = useState(" ");
  const [currentMove, setCurrentMove] = useState();

  const [boardUpdated, setBoardUpdated] = useState(false);

  useEffect(() => {
    if (boardUpdated) setBoardUpdated(false);
  }, [boardUpdated]);

  const handleMove = () => {
    let updatedBoard = board;
    updatedBoard[currentTile].userMove = currentMove;
    setBoard(updatedBoard);
    setCurrentTile(" ");
    setCurrentMove();
    setBoardUpdated(true);
  };

  const renderBoard = () => {
    return board.map((tile, index) => {
      return (
        <Tile
          key={tile.userMove + index}
          tileState={tile}
          tileIndex={index}
          currentTile={currentTile}
          setBoard={setBoard}
          setCurrentTile={setCurrentTile}
          setCurrentMove={setCurrentMove}
        />
      );
    });
  };
  return (
    <div className={"board_main"}>
      <div className={"board_display"}>
        {renderBoard()}
        <Buttons currentTile={currentTile} handleMove={handleMove} />
      </div>
    </div>
  );
}
