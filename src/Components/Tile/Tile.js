import { render } from "@testing-library/react";
import React, { useState, useEffect } from "react";

import "./Tile.css";

const Tile = React.memo((props) => {
  const [userMove, setUserMove] = useState(props.tileState.userMove);

  useEffect(() => {
    if (props.currentTile !== props.tileIndex && userMove !== "none")
      setUserMove(props.tileState.userMove);
    if (props.currentTile === props.tileIndex && userMove === "none")
      setUserMove("rock");
  }, [props, userMove]);

  useEffect(() => {
    if (document.getElementById("tile_image_user_move")) {
      console.log("remove class");
      document.getElementById("tile_image_user_move").removeAttribute("class");
      document
        .getElementById("tile_image_user_move")
        .setAttribute("class", "tile_image");
    }
  }, [userMove]);

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

  const renderImage = () => {
    if (userMove !== "none" && !outcome)
      return (
        <img
          id={"tile_image_user_move"}
          src={imageObject[userMove]}
          alt={userMove}
          className={"tile_image"}
        />
      );
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
      } else {
        changeMove();
      }
    };
  }

  const imageObject = {
    rock: "Images/rock.png",
    scissors: "Images/scissors.png",
    paper: "Images/paper.png",
  };

  return (
    <button
      className={
        "tile_main " +
        aiMove +
        " user " +
        props.tileState.userMove +
        " " +
        tieFocus
      }
      onClick={() => handleClick()}
    >
      {renderImage()}
      {props.tileState.aiMove !== "none" && userMove === "none" ? (
        <h3 className={"tile_image"}>?</h3>
      ) : null}
      {outcome === "ai wins" ? <h3 className={"tile_image"}>X</h3> : null}
      {outcome === "user wins" ? <h3 className={"tile_image"}>O</h3> : null}
      {outcome === "tie" ? <h3 className={"tile_image"}>!</h3> : null}
    </button>
  );
});

export default Tile;
