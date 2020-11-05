import React, { useState } from "react";

import AI from "../../Services/AI";
import checkBoard from "../../Services/checkBoard";

import "./HandleTie.css";

export default function HandleTie(props) {
  const [tie, setTie] = useState(false);

  const handleTie = (userMove) => {
    setTie(false);
    let aiMove = AI.aiTie();
    let outcome = checkBoard.compareMoves(userMove, aiMove);
    if (outcome === "tie") setTie(true);
  };

  return (
    <div className={"handle_tie_main"}>
      {tie ? (
        <h2>You Tied! Select Again.</h2>
      ) : (
        <h2>You tied on this tile. Select a new move!</h2>
      )}
      <button onClick={() => handleTie(0)}>Rock</button>
      <button onClick={() => handleTie(1)}>Paper</button>
      <button onClick={() => handleTie(2)}>Scissors</button>
    </div>
  );
}
