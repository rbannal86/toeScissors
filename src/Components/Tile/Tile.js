import React, { useState, useEffect } from "react";

import "./Tile.css";

export default function Tile(props) {
  const [userMove, setUserMove] = useState(props.tileState.userMove);

  useEffect(() => {
    if (props.currentTile !== props.tileIndex && userMove !== "none")
      setUserMove(props.tileState.userMove);
    if (props.currentTile === props.tileIndex && userMove === "none")
      setUserMove("rock");
  }, [props, userMove]);

  const changeMove = () => {
    switch (userMove) {
      case "none":
        setUserMove("rock");
        props.setCurrentMove("rock");
        break;
      case "rock":
        setUserMove("paper");
        props.setCurrentMove("paper");
        break;
      case "paper":
        setUserMove("scissors");
        props.setCurrentMove("scissors");
        break;
      case "scissors":
        setUserMove("rock");
        props.setCurrentMove("rock");
        break;
      default:
        console.log("break");
        break;
    }
  };

  let aiMove;
  if (props.tileState.aiMove !== "none" && !props.tileState.outcome)
    aiMove = "ai_move";

  let userMoveTag;
  if (userMove !== "none" && !props.tileState.outcome) userMoveTag = userMove;

  let outcome;
  if (props.tileState.outcome) outcome = props.tileState.outcome;

  let tieFocus;
  if (props.tieList.length > 0 && props.tieList[0] === props.tileIndex)
    tieFocus = "currentTie";

  let handleClick = () => {};

  if (
    (userMove === "none" || props.currentTile === props.tileIndex) &&
    props.tieList.length === 0
  ) {
    handleClick = () => {
      if (props.currentTile !== props.tileIndex) {
        props.setCurrentTile(props.tileIndex);
        changeMove();
      } else changeMove();
    };
  }

  return (
    <div
      className={"tile_main " + aiMove + " user" + userMoveTag + " " + tieFocus}
      onClick={() => handleClick()}
    >
      {outcome}
    </div>
  );
}
