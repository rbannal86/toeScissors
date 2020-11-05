import React, { useState, useEffect } from "react";
import Tile from "../Tile/Tile";
import Buttons from "../Buttons/Buttons";
import HandleTie from "../HandleTie/HandleTie";

import AI from "../../Services/AI";
import checkBoard from "../../Services/checkBoard";

import "./Board.css";

export default function Board() {
  const [board, setBoard] = useState([
    { userMove: "none", aiMove: "none" },
    { userMove: "none", aiMove: "none" },
    { userMove: "none", aiMove: "none" },
    { userMove: "none", aiMove: "none" },
    { userMove: "none", aiMove: "none" },
    { userMove: "none", aiMove: "none" },
    { userMove: "none", aiMove: "none" },
    { userMove: "none", aiMove: "none" },
    { userMove: "none", aiMove: "none" },
    { userMove: "none", aiMove: "none" },
    { userMove: "none", aiMove: "none" },
    { userMove: "none", aiMove: "none" },
    { userMove: "none", aiMove: "none" },
    { userMove: "none", aiMove: "none" },
    { userMove: "none", aiMove: "none" },
    { userMove: "none", aiMove: "none" },
    { userMove: "none", aiMove: "none" },
    { userMove: "none", aiMove: "none" },
    { userMove: "none", aiMove: "none" },
    { userMove: "none", aiMove: "none" },
    { userMove: "none", aiMove: "none" },
    { userMove: "none", aiMove: "none" },
    { userMove: "none", aiMove: "none" },
    { userMove: "none", aiMove: "none" },
    { userMove: "none", aiMove: "none" },
  ]);

  const moveSet = ["rock", "paper", "scissors"];

  const [currentTile, setCurrentTile] = useState(" ");
  const [currentMove, setCurrentMove] = useState();

  const [tieToggle, setTieToggle] = useState(false);
  const [tieList, setTieList] = useState([]);

  const [boardUpdated, setBoardUpdated] = useState(false);

  // useEffect(() => {
  //   if (aiFirstMove) {

  //     let updatedBoard = board;

  //     setAiFirstMove(false);
  //   }
  // }, [aiFirstMove, board]);

  useEffect(() => {
    if (boardUpdated) setBoardUpdated(false);
  }, [boardUpdated]);

  const handleMove = () => {
    let aiMove = AI.aiMove();
    let updatedBoard = board;
    let tiedTiles = [];
    if (board[aiMove.tile].aiMove === "none") {
      updatedBoard[currentTile].userMove = currentMove;
      updatedBoard[aiMove.tile].aiMove = aiMove.move;

      //check if player is contesting an ai tile
      if (updatedBoard[currentTile].aiMove !== "none") {
        let outcome = checkBoard.compareMoves(
          moveSet.indexOf(currentMove),
          updatedBoard[currentTile].aiMove
        );

        if (outcome === "tie")
          tiedTiles.push({
            tile: currentTile,
            userMove: currentMove,
            aiMove: updatedBoard[currentTile].aiMove,
          });
        else updatedBoard[currentTile].outcome = outcome;
      }

      //check if ai is contesting a player tile
      if (updatedBoard[aiMove.tile].userMove !== "none") {
        let outcome = checkBoard.compareMoves(
          moveSet.indexOf(board[aiMove.tile].userMove),
          aiMove.move
        );

        if (outcome === "tie")
          tiedTiles.push({
            tile: currentTile,
            userMove: board[aiMove.tile].userMove,
            aiMove: aiMove.move,
          });
        else updatedBoard[currentTile].outcome = outcome;
      }

      //check if ai and player are contesting the same tile
      if (currentTile === aiMove.tile && !tiedTiles.includes(currentTile)) {
        let outcome = checkBoard.compareMoves(currentMove, aiMove.move);

        if (outcome === "tie")
          tiedTiles.push({
            tile: currentTile,
            userMove: currentMove,
            aiMove: aiMove.move,
          });
        else updatedBoard[currentTile].outcome = outcome;
      }

      if (tiedTiles.length > 0) {
        setTieToggle(true);
      }
      setTieList(tiedTiles);
      setBoard(updatedBoard);
      setCurrentTile(" ");
      setCurrentMove();
      setBoardUpdated(true);
    } else handleMove();
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
        {tieToggle ? (
          <HandleTie tieList={tieList} setTieList={setTieList} />
        ) : (
          <Buttons currentTile={currentTile} handleMove={handleMove} />
        )}
      </div>
    </div>
  );
}
