import React, { useState, useEffect } from "react";

import "./Tile.css";

const Tile = React.memo((props) => {
  const [userMove, setUserMove] = useState(props.tileState.userMove);
  const [activeTile, setActiveTile] = useState();
  const [ownerTile, setOwnerTile] = useState();

  useEffect(() => {
    if (props.currentTile !== props.tileIndex && userMove !== "none")
      setUserMove(props.tileState.userMove);
    if (props.currentTile === props.tileIndex && userMove === "none")
      setUserMove("rock");
  }, [props, userMove]);

  useEffect(() => {
    if (props.currentTile === props.tileIndex && !activeTile)
      setActiveTile("active_tile");
    else if (props.currentTile !== props.tileIndex && activeTile) {
      setActiveTile(null);
    }
  }, [activeTile, props.currentTile, props.tileIndex]);

  useEffect(() => {
    if (userMove === "none" && props.tileState.aiMove === "none")
      setOwnerTile("open_tile");
    if (props.tileState.outcome === "user wins")
      setOwnerTile("user_tile_owned");
    if (
      userMove !== "none" &&
      props.tileState.aiMove === "none" &&
      !props.tileState.outcome
    )
      setOwnerTile("user_tile_move");
    if (userMove === "none" && props.tileState.aiMove !== "none")
      setOwnerTile("ai_tile_move");
    if (props.tileState.outcome === "ai wins") setOwnerTile("ai_tile_owned");
    if (
      userMove !== "none" &&
      props.tileState.aiMove !== "none" &&
      !props.tileState.outcome
    )
      setOwnerTile("contested_tile");
  }, [props.tileState.aiMove, props.tileState.outcome, userMove]);

  // useEffect(() => {
  //   if (document.getElementById("tile_image_user_move")) {
  //     console.log("remove class");
  //     document.getElementById("tile_image_user_move").removeAttribute("class");
  //     document
  //       .getElementById("tile_image_user_move")
  //       .setAttribute("class", "tile_image");
  //   }
  // }, [userMove]);

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
    if (userMove !== "none" && !props.tileState.outcome)
      return (
        <img
          id={"tile_image_user_move"}
          src={imageObject[userMove]}
          alt={userMove}
          className={"tile_image"}
        />
      );
  };

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
      className={"tile_main " + tieFocus + " " + activeTile + " " + ownerTile}
      onClick={() => handleClick()}
      disabled={props.victory ? true : false}
    >
      {renderImage()}
      {props.tileState.aiMove !== "none" && userMove === "none" ? (
        <h3 className={"tile_image tile_text"}>?</h3>
      ) : null}
      {props.tileState.outcome === "ai wins" ? (
        <h3 className={"tile_image tile_text"}>X</h3>
      ) : null}
      {props.tileState.outcome === "user wins" ? (
        <h3 className={"tile_image tile_text"}>O</h3>
      ) : null}
      {props.tileState.outcome === "tie" ? (
        <h3 className={"tile_image tile_text"}>!</h3>
      ) : null}
    </button>
  );
});

export default Tile;
