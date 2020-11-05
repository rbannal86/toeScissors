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

  const [victory, setVictory] = useState(null);

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

      //check if ai and player are contesting the same tile
      if (currentTile === aiMove.tile && !tiedTiles.includes(currentTile)) {
        let outcome = checkBoard.compareMoves(currentMove, aiMove.move);

        if (outcome === "tie") tiedTiles.push(currentTile);
        else updatedBoard[currentTile].outcome = outcome;
      } else {
        //check if player is contesting an ai tile
        if (updatedBoard[currentTile].aiMove !== "none") {
          let outcome = checkBoard.compareMoves(
            moveSet.indexOf(currentMove),
            updatedBoard[currentTile].aiMove
          );

          if (outcome === "tie") tiedTiles.push(currentTile);
          else updatedBoard[currentTile].outcome = outcome;
        }

        //check if ai is contesting a player tile
        if (updatedBoard[aiMove.tile].userMove !== "none") {
          let outcome = checkBoard.compareMoves(
            moveSet.indexOf(board[aiMove.tile].userMove),
            aiMove.move
          );

          if (outcome === "tie") tiedTiles.push(aiMove.tile);
          else updatedBoard[currentTile].outcome = outcome;
        }
      }

      if (tiedTiles.length > 0) {
        setTieToggle(true);
      }
      if (checkBoard.checkUserWin(updatedBoard, currentTile))
        return setVictory("You Have Won!");
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
          tieList={tieList}
        />
      );
    });
  };

  const updateBoardAfterTie = (tile, outcome) => {
    let updatedBoard = board;
    updatedBoard[tile].outcome = outcome;
    if (checkBoard.checkUserWin(updatedBoard, tile))
      return setVictory("You Have Won!");
    setBoard(board);
    setBoardUpdated(true);
  };

  return (
    <div className={"board_main"}>
      <h2>{victory}</h2>
      <div className={"board_display"}>
        {renderBoard()}
        {tieToggle ? (
          <HandleTie
            tieList={tieList}
            setTieList={setTieList}
            setTieToggle={setTieToggle}
            updateBoardAfterTie={updateBoardAfterTie}
          />
        ) : (
          <Buttons currentTile={currentTile} handleMove={handleMove} />
        )}
      </div>
    </div>
  );
}
