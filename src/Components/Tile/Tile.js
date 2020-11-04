import React, { useState, useEffect } from "react";

import "./Tile.css";

export default function Tile(props) {
  const [userMove, setUserMove] = useState(props.tileState.userMove);

  useEffect(() => {
    if (props.currentTile !== props.tileIndex && !userMove) setUserMove("none");
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

  let handleClick = () => {};

  if (userMove === "none" || props.currentTile === props.tileIndex) {
    handleClick = () => {
      if (props.currentTile !== props.tileIndex) {
        props.setCurrentTile(props.tileIndex);
        changeMove();
      } else changeMove();
    };
  }

  return (
    <div className={"tile_main"} onClick={() => handleClick()}>
      {userMove}
    </div>
  );
}
