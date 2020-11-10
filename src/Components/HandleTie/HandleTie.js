import React, { useState } from "react";

import AI from "../../Services/AI";
import checkBoard from "../../Services/checkBoard";

import "./HandleTie.css";

export default function HandleTie(props) {
  const [tie, setTie] = useState(false);
  const [userMove, setUserMove] = useState();
  const [aiMove, setAiMove] = useState();
  const [outcome, setOutcome] = useState();

  const moveList = ["Rock", "Paper", "Scissors"];

  const returnTieOutcome = () => {
    props.updateBoardAfterTie(props.tieList[0], outcome);
    let updatedList = [...props.tieList];
    updatedList.shift();
    console.log(updatedList);
    if (updatedList.length === 0) props.setTieToggle(false);
    props.setTieList(updatedList);
    setUserMove(null);
    setAiMove(null);
    setOutcome(null);
  };

  const handleTie = (userMove) => {
    setTie(false);
    let aiMove = AI.aiTie();
    let outcome = checkBoard.compareMoves(userMove, aiMove);
    setOutcome(outcome);
    setUserMove(moveList[userMove]);
    setAiMove(moveList[aiMove]);
    if (outcome === "tie") setTie(true);
  };

  return (
    <div className={"handle_tie_main"}>
      {aiMove && userMove && outcome !== "tie" ? (
        <div>
          <p>You played {userMove}.</p>
          <p>The computer played {aiMove}.</p>
          {outcome === "user wins" ? (
            <p>You won the tile!</p>
          ) : (
            <p>The computer won the tile!</p>
          )}
          <div className={"handle_tie_buttons"}>
            <button
              className={"handle_tie_button handle_tie_confirm"}
              onClick={() => returnTieOutcome()}
            >
              OK!
            </button>
          </div>
        </div>
      ) : null}
      {outcome === "tie" || !outcome ? (
        <>
          {tie ? (
            <div>
              <p>You both played {userMove}! Try again!</p>
            </div>
          ) : (
            <div>
              <p>You tied on this tile.</p>
              <p>Select a new move!</p>
            </div>
          )}
          <div className={"handle_tie_buttons"}>
            <button
              onClick={() => handleTie(0)}
              className={"handle_tie_button"}
            >
              <img
                src={"Images/rock.png"}
                alt={"rock"}
                className={"handle_tie_image"}
              />
            </button>
            <button
              onClick={() => handleTie(1)}
              className={"handle_tie_button"}
            >
              <img
                src={"Images/paper.png"}
                alt={"paper"}
                className={"handle_tie_image"}
              />
            </button>
            <button
              onClick={() => handleTie(2)}
              className={"handle_tie_button"}
            >
              <img
                src={"Images/scissors.png"}
                alt={"scissors"}
                className={"handle_tie_image"}
              />
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}
