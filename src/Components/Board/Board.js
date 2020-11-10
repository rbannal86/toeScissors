import React, { useState, useEffect, useCallback } from "react";
import Tile from "../Tile/Tile";
import Buttons from "../Buttons/Buttons";
import HandleTie from "../HandleTie/HandleTie";
import Scoreboard from "../Scoreboard/Scoreboard";
import DifficultySelect from "../DifficultySelect/DifficultySelect";

import AI from "../../Services/AI";
import checkBoard from "../../Services/checkBoard";

import "./Board.css";

export default function Board() {
  //Default board array for shorter setting on render and reset
  const defaultBoard = [
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
  ];
  const [board, setBoard] = useState(defaultBoard);

  const [currentTile, setCurrentTile] = useState(" ");
  const [currentMove, setCurrentMove] = useState();
  const [currentAiMove, setCurrentAiMove] = useState(" ");
  const [aiDifficulty, setAiDifficulty] = useState("medium");

  const [userHeldTiles, setUserHeldTiles] = useState(0);
  const [aiHeldTiles, setAiHeldTiles] = useState(0);

  const [tieToggle, setTieToggle] = useState(false);
  const [tieList, setTieList] = useState([]);

  const [victory, setVictory] = useState(null);

  const [boardUpdated, setBoardUpdated] = useState(false);

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
    if (
      board.filter((tile) => tile.outcome === null).length === 0 &&
      !victory &&
      !tieToggle
    )
      if (aiHeldTiles > userHeldTiles)
        setVictory("The Computer Holds More Tiles. It Wins!");
      else setVictory("You Hold More Tiles! You Win!");
    setAiHeldTiles(aiOwned);
    setUserHeldTiles(userOwned);
    setBoardUpdated(false);
  }, [aiHeldTiles, board, tieToggle, userHeldTiles, victory]);

  useEffect(() => {
    if (boardUpdated) setBoardUpdated(false);
  }, [boardUpdated]);

  useEffect(() => {
    if (boardUpdated) countTotals();
  }, [boardUpdated, countTotals]);

  const handleMove = () => {
    let updatedBoard = [...board];
    let aiMove;
    if (aiDifficulty === "easy") aiMove = AI.aiMove();
    if (aiDifficulty === "medium") aiMove = AI.aiMoveMedium(board);
    if (aiDifficulty === "hard") aiMove = AI.aiMoveHard(board, currentAiMove);

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
    // countTotals();
    if (checkUserWins()) setVictory("You Win!");
    if (checkAiWins()) setVictory("The Computer Has Won!");
  };

  const renderBoard = () => {
    return board.map((tile, index) => {
      return (
        <Tile
          key={index}
          tileState={tile}
          tileIndex={index}
          currentTile={currentTile}
          setBoard={setBoard}
          setCurrentTile={setCurrentTile}
          setCurrentMove={setCurrentMove}
          tieList={tieList}
          board={board}
          boardUpdated={boardUpdated}
        />
      );
    });
  };

  const updateBoardAfterTie = (tile, outcome) => {
    let updatedBoard = [...board];
    updatedBoard[tile].outcome = outcome;
    setBoard(board);
    setBoardUpdated(true);
    // countTotals();
    if (checkUserWins()) setVictory("You Win!");
    if (checkAiWins()) setVictory("The Computer Has Won!");
  };

  const resetBoard = () => {
    setBoard(defaultBoard);

    setCurrentTile(" ");
    setCurrentMove();
    setCurrentAiMove(" ");
    setTieToggle(false);
    setTieList([]);
    setVictory(null);
    setBoardUpdated(false);
    setUserHeldTiles(0);
    setAiHeldTiles(0);
  };

  return (
    <div className={"board_main"}>
      <DifficultySelect
        setAiDifficulty={setAiDifficulty}
        aiDifficulty={aiDifficulty}
      />
      <Scoreboard userTiles={userHeldTiles} aiTiles={aiHeldTiles} />
      {tieToggle ? (
        <HandleTie
          tieList={tieList}
          setTieList={setTieList}
          setTieToggle={setTieToggle}
          updateBoardAfterTie={updateBoardAfterTie}
        />
      ) : null}

      {victory ? (
        <div className={"board_victory_div"}>
          <h2 className={"board_victory"}>{victory}</h2>
        </div>
      ) : null}
      <div className={"board_display"}>{renderBoard()}</div>
      <div className={"board_buttons"}>
        {victory ? (
          <button onClick={() => resetBoard()} className={"board_button"}>
            New Game
          </button>
        ) : (
          <Buttons currentTile={currentTile} handleMove={handleMove} />
        )}
      </div>
    </div>
  );
}
