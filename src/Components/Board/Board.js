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

  //Current board state
  const [board, setBoard] = useState(defaultBoard);

  //Current turn information
  const [currentTile, setCurrentTile] = useState(" ");
  const [currentMove, setCurrentMove] = useState();
  const [currentAiMove, setCurrentAiMove] = useState(" ");

  //Previous Turn Information
  const [lastUserPlay, setLastUserPlay] = useState(false);
  const [lastAiPlay, setLastAiPlay] = useState(false);

  //Difficulty setting
  const [aiDifficulty, setAiDifficulty] = useState("medium");

  //Count for currently owned tiles. Used to determine winner when board is full.
  const [userHeldTiles, setUserHeldTiles] = useState(0);
  const [aiHeldTiles, setAiHeldTiles] = useState(0);

  //Tie handling state
  const [tieToggle, setTieToggle] = useState(false);
  const [tieList, setTieList] = useState([]);

  //Victory message
  const [victory, setVictory] = useState(null);

  //Toggle for updating the board in certain circumstances
  const [boardUpdated, setBoardUpdated] = useState(false);

  //Check if the user wins. useCallback so that this can be used in useEffect and
  //outside
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

  //Check if ai wins. useCallback so that this can be used in useEffect and
  //outside
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

  //Determines the number of tiles owned by each player. If there are no tiles
  //without an outcome ('user wins', 'ai wins'), calls the game and checks which
  //player has the most owned tiles and sets an appropriate victory message.
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

  //Switches the boardUpdated toggle to force rerender when necessary
  useEffect(() => {
    if (boardUpdated) setBoardUpdated(false);
  }, [boardUpdated]);

  //Calls the count totals function when the board updates. Guarantees
  //the count updates after every event.
  useEffect(() => {
    if (boardUpdated) countTotals();
  }, [boardUpdated, countTotals]);

  //Calls the check functions and, if one is true, sets the appropriate victory message.
  const checkWins = () => {
    if (checkUserWins()) setVictory("You Win!");
    if (checkAiWins()) setVictory("The Computer Has Won!");
  };

  //Called after a user confirms a move.
  //Goes through this flow:
  //Copies the board.
  //Creates and aiMove and sets its value based on the difficulty.
  //Sets the currently selected tile and sets the user move for that tile.
  //Checks if the ai is actually choosing a new tile, and restarts if it isn't. Updates the board with the new ai move.
  //Checks the board for ties and populates the tiedTiles array with any tie's index.
  //Toggles the tie handling component if any ties exist.
  //Clears state involving current turn.
  //Updates the board with the new moves.
  //Toggles the boardUpdated state to rerender.
  //Checks if anyone won after this round.
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
    setLastAiPlay(aiMove.tile);
    setLastUserPlay(currentTile);
    setCurrentTile(" ");
    setBoard(updatedBoard);
    setBoardUpdated(true);
    checkWins();
  };

  //Renders the board.
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
          victory={victory}
          lastAiPlay={lastAiPlay}
          lastUserPlay={lastUserPlay}
        />
      );
    });
  };

  //Updates the board after handling a tie
  const updateBoardAfterTie = (tile, outcome) => {
    let updatedBoard = [...board];
    updatedBoard[tile].outcome = outcome;
    setBoard(board);
    setBoardUpdated(true);
    if (checkUserWins()) setVictory("You Win!");
    if (checkAiWins()) setVictory("The Computer Has Won!");
  };

  //Resets the board after confirming a forfeit or starting a new game.
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
    setLastUserPlay(null);
    setLastAiPlay(null);
  };

  //Returns all of the relevant components
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
      <div className={"board_input"}>
        <div className={"board_display"}>{renderBoard()}</div>
        <div className={"board_buttons"}>
          <Buttons
            setVictory={setVictory}
            currentTile={currentTile}
            handleMove={handleMove}
            resetBoard={resetBoard}
            victory={victory}
          />
        </div>
      </div>
    </div>
  );
}
