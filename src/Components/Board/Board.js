import React, { useState, useEffect, useCallback } from "react";
import Tile from "../Tile/Tile";
import Buttons from "../Buttons/Buttons";
import HandleTie from "../HandleTie/HandleTie";
import Scoreboard from "../Scoreboard/Scoreboard";

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

  const [currentTile, setCurrentTile] = useState(" ");
  const [currentMove, setCurrentMove] = useState();
  const [currentAiMove, setCurrentAiMove] = useState();

  const [userHeldTiles, setUserHeldTiles] = useState(0);
  const [aiHeldTiles, setAiHeldTiles] = useState(0);

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

      if (
        checkBoard.checkVertical(board, 0, "aiMove", "ai wins") ||
        checkBoard.checkHorizontal(board, 0, "aiMove", "ai wins") ||
        checkBoard.checkDiagonalLeftToRight(board, "aiMove", "user wins") ||
        checkBoard.checkDiagonalRightToLeft(board, "aiMove", "user wins")
      )
        setVictory("The Computer Has Won!");
    }
  };

  const checkUserWins = useCallback(() => {
    if (
      checkBoard.checkVertical(board, 0, "userMove", "ai wins") ||
      checkBoard.checkHorizontal(board, 0, "userMove", "ai wins") ||
      checkBoard.checkDiagonalLeftToRight(board, "userMove", "ai wins") ||
      checkBoard.checkDiagonalRightToLeft(board, "userMove", "ai wins")
    )
      return true;
    else return false;
  }, [board]);

  const checkAiWins = useCallback(() => {
    if (
      checkBoard.checkVertical(board, 0, "aiMove", "user wins") ||
      checkBoard.checkHorizontal(board, 0, "aiMove", "user wins") ||
      checkBoard.checkDiagonalLeftToRight(board, "aiMove", "user wins") ||
      checkBoard.checkDiagonalRightToLeft(board, "aiMove", "user wins")
    )
      return true;
    else return false;
  }, [board]);

  const countTotals = useCallback(() => {
    let userOwned = board.filter((tile) => tile.outcome === "user wins").length;
    let aiOwned = board.filter((tile) => tile.outcome === "ai wins").length;
    if (board.filter((tile) => tile.outcome === null).length === 0 && !victory)
      if (aiHeldTiles > userHeldTiles)
        setVictory("The Computer Holds More Tiles. It Wins!");
      else setVictory("You Hold More Tiles! You Win!");
    setAiHeldTiles(aiOwned);
    setUserHeldTiles(userOwned);
    setBoardUpdated(false);
  }, [aiHeldTiles, board, userHeldTiles, victory]);

  // useEffect(() => {
  //   if (boardUpdated) setBoardUpdated(false);
  // }, [boardUpdated]);

  useEffect(() => {
    if (boardUpdated) countTotals();
  }, [boardUpdated, countTotals]);

  const handleMove = () => {
    let aiMove = AI.aiMove();
    let updatedBoard = board;

    let tiedTiles = [];
    updatedBoard[currentTile].userMove = currentMove;
    if (board[aiMove.tile].aiMove === "none") {
      setCurrentAiMove(aiMove.tile);
      updatedBoard[aiMove.tile].aiMove = aiMove.move;
    } else return handleMove();

    tiedTiles = checkBoard.checkForTies(updatedBoard);
    tiedTiles = tiedTiles.filter((tile) => tile.outcome === "tie");

    if (tiedTiles.length > 0) {
      setTieToggle(true);
      let newTiedTiles = [];
      tiedTiles.forEach((tile) => {
        newTiedTiles.push(tile.index);
      });
      setTieList(newTiedTiles);
    }
    setCurrentTile(" ");
    setBoard(updatedBoard);
    setBoardUpdated(true);

    if (checkUserWins()) setVictory("You Win!");
    if (checkAiWins()) setVictory("The Computer Has Won!");
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
    setBoard(board);
    setBoardUpdated(true);
    if (checkUserWins()) setVictory("You Win!");
    if (checkAiWins()) setVictory("The Computer Has Won!");
  };

  const resetBoard = () => {
    setBoard([
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

    setCurrentTile(" ");
    setCurrentMove();
    setCurrentAiMove();
    setTieToggle(false);
    setTieList([]);
    setVictory(null);
    setBoardUpdated(false);
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
      <Scoreboard userTiles={userHeldTiles} aiTiles={aiHeldTiles} />
      <h2>{victory}</h2>
      <div className={"board_display"}>
        {renderBoard()}
        {victory ? (
          <button onClick={() => resetBoard()}>New Game</button>
        ) : tieToggle ? (
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
