import React, { useState, useEffect } from "react";
import Tile from "../Tile/Tile";
import Buttons from "../Buttons/Buttons";
import HandleTie from "../HandleTie/HandleTie";

import AI from "../../Services/AI";
import checkBoard from "../../Services/checkBoard";

import "./Board.css";

export default function Board() {
  const [board, setBoard] = useState([
    { userMove: "none", aiMove: "none", outcome: null },
    { userMove: "none", aiMove: "none", outcome: null },
    { userMove: "none", aiMove: "none", outcome: null },
    { userMove: "none", aiMove: "none", outcome: null },
    { userMove: "none", aiMove: "none", outcome: null },
    { userMove: "none", aiMove: "none", outcome: null },
    { userMove: "none", aiMove: "none", outcome: null },
    { userMove: "none", aiMove: "none", outcome: null },
    { userMove: "none", aiMove: "none", outcome: null },
    { userMove: "none", aiMove: "none", outcome: null },
    { userMove: "none", aiMove: "none", outcome: null },
    { userMove: "none", aiMove: "none", outcome: null },
    { userMove: "none", aiMove: "none", outcome: null },
    { userMove: "none", aiMove: "none", outcome: null },
    { userMove: "none", aiMove: "none", outcome: null },
    { userMove: "none", aiMove: "none", outcome: null },
    { userMove: "none", aiMove: "none", outcome: null },
    { userMove: "none", aiMove: "none", outcome: null },
    { userMove: "none", aiMove: "none", outcome: null },
    { userMove: "none", aiMove: "none", outcome: null },
    { userMove: "none", aiMove: "none", outcome: null },
    { userMove: "none", aiMove: "none", outcome: null },
    { userMove: "none", aiMove: "none", outcome: null },
    { userMove: "none", aiMove: "none", outcome: null },
    { userMove: "none", aiMove: "none", outcome: null },
  ]);

  const moveSet = ["rock", "paper", "scissors"];

  const [currentTile, setCurrentTile] = useState(" ");
  const [currentMove, setCurrentMove] = useState();
  const [currentAiMove, setCurrentAiMove] = useState();

  const [tieToggle, setTieToggle] = useState(false);
  const [tieList, setTieList] = useState([]);

  const [victory, setVictory] = useState(null);

  const [boardUpdated, setBoardUpdated] = useState(false);

  const testAi = () => {
    setBoardUpdated(false);
    let aiMove = AI.aiMove();
    let updatedBoard = board;
    if (updatedBoard.filter((tile) => tile.aiMove === "none").length === 0)
      return console.log("no more moves");
    if (board[aiMove.tile].aiMove !== "none") {
      console.log("reselecting");
      testAi();
    } else {
      updatedBoard[aiMove.tile].aiMove = aiMove.move;
      setBoardUpdated(true);
      setBoard(updatedBoard);
      // console.log(
      //   checkBoard.checkDiagonalLeftToRight(board, 0, "aiMove", "ai wins")
      // );
      // console.log(
      //   checkBoard.checkDiagonalLeftToRight(board, 4, "aiMove", "ai wins")
      if (
        checkBoard.checkVertical(board, 0, "userMove", "ai wins") ||
        checkBoard.checkHorizontal(board, 0, "userMove", "ai wins") ||
        checkBoard.checkDiagonalLeftToRight(
          board,
          0,
          "userMove",
          "user wins"
        ) ||
        checkBoard.checkDiagonalRightToLeft(board, 0, "userMove", "user wins")
      )
        setVictory("The Computer Has Won!");
      if (
        checkBoard.checkVertical(board, 0, "aiMove", "user wins") ||
        checkBoard.checkHorizontal(board, 0, "aiMove", "user wins") ||
        checkBoard.checkDiagonalLeftToRight(board, 0, "aiMove", "ai wins") ||
        checkBoard.checkDiagonalRightToLeft(board, 0, "aiMove", "ai wins")
      )
        setVictory("The Computer Has Won!");
    }
  };

  useEffect(() => {
    if (!tieToggle) {
      if (
        checkBoard.checkVertical(board, 0, "userMove", "ai wins") ||
        checkBoard.checkHorizontal(board, 0, "userMove", "ai wins") ||
        checkBoard.checkDiagonalLeftToRight(
          board,
          0,
          "userMove",
          "user wins"
        ) ||
        checkBoard.checkDiagonalRightToLeft(board, 0, "userMove", "user wins")
      )
        setVictory("You Win!");
      if (
        checkBoard.checkVertical(board, 0, "aiMove", "user wins") ||
        checkBoard.checkHorizontal(board, 0, "aiMove", "user wins") ||
        checkBoard.checkDiagonalLeftToRight(board, 0, "aiMove", "ai wins") ||
        checkBoard.checkDiagonalRightToLeft(board, 0, "aiMove", "ai wins")
      )
        setVictory("The Computer Has Won!");
    } else if (boardUpdated) {
      setCurrentTile(" ");
      setCurrentMove();
      setCurrentAiMove();
    }
  }, [board, boardUpdated, currentAiMove, currentMove, currentTile, tieToggle]);

  useEffect(() => {
    if (boardUpdated) setBoardUpdated(false);
  }, [boardUpdated]);

  const handleMove = () => {
    let aiMove = AI.aiMove();

    let updatedBoard = board;
    let tiedTiles = [];
    if (board[aiMove.tile].aiMove === "none") {
      setCurrentAiMove(aiMove.tile);
      updatedBoard[currentTile].userMove = currentMove;
      updatedBoard[aiMove.tile].aiMove = aiMove.move;

      //check if ai and player are contesting the same tile
      if (
        currentTile === aiMove.tile &&
        !tiedTiles.includes(currentTile) &&
        !updatedBoard[currentTile].outcome
      ) {
        let outcome = checkBoard.compareMoves(currentMove, aiMove.move);

        if (outcome === "tie") tiedTiles.push(currentTile);
        else updatedBoard[currentTile].outcome = outcome;
      } else {
        //check if player is contesting an ai tile
        if (
          updatedBoard[currentTile].aiMove !== "none" &&
          !updatedBoard[currentTile].outcome
        ) {
          let outcome = checkBoard.compareMoves(
            moveSet.indexOf(currentMove),
            updatedBoard[currentTile].aiMove
          );

          if (outcome === "tie") tiedTiles.push(currentTile);
          else updatedBoard[currentTile].outcome = outcome;
        }

        //check if ai is contesting a player tile
        if (
          updatedBoard[aiMove.tile].userMove !== "none" &&
          !updatedBoard[aiMove.tile].outcome
        ) {
          let outcome = checkBoard.compareMoves(
            moveSet.indexOf(board[aiMove.tile].userMove),
            aiMove.move
          );

          if (outcome === "tie") tiedTiles.push(aiMove.tile);
          else updatedBoard[currentTile].outcome = outcome;
        }
      }

      if (tiedTiles.length > 0) {
        setTieList(tiedTiles);
        return setTieToggle(true);
      }

      setBoard(updatedBoard);

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
    // if (checkBoard.checkUserWin(updatedBoard, tile))
    //   return setVictory("You Have Won!");
    setBoard(board);
    setBoardUpdated(true);
  };

  return (
    <div className={"board_main"}>
      <button
        onClick={() => {
          testAi();
        }}
      >
        TEST AI
      </button>
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
