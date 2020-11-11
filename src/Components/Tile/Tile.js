import React, { useState, useEffect } from "react";

import "./Tile.css";

const Tile = React.memo((props) => {
  const [userMove, setUserMove] = useState(props.tileState.userMove);
  const [activeTile, setActiveTile] = useState();
  const [ownerTile, setOwnerTile] = useState();

  //When the current tile prop or the userMove changes, this will either return the
  //tile to its original (empty) state so nothing shows on the board, or make sure that
  //the display is set to rock on first click. Handles an issue where, when clicking on
  //a tile for the first time, it doesn't update to rock until the second click.
  useEffect(() => {
    if (props.currentTile !== props.tileIndex && userMove !== "none")
      setUserMove(props.tileState.userMove);
    if (props.currentTile === props.tileIndex && userMove === "none")
      setUserMove("rock");
  }, [props, userMove]);

  //Toggles the active tile state. Determines if the tile needs to have
  //a border or not.
  useEffect(() => {
    if (props.currentTile === props.tileIndex && !activeTile)
      setActiveTile("active_tile");
    else if (props.currentTile !== props.tileIndex && activeTile) {
      setActiveTile(null);
    }
  }, [activeTile, props.currentTile, props.tileIndex]);

  //Determines the background color of the tile by setting a class tag.
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

  //Switch statement determines which icon shows in the tile when a user
  //clicks on the tile
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
        break;
    }
  };

  //Shows the correct image when the user has made a move in the tile
  //but the tile is not owned.
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

  //If the tile is currently being decided by a tie breaker, sets a class tag
  //that changes the background color
  let tieFocus;
  if (props.tieList.length > 0 && props.tieList[0] === props.tileIndex)
    tieFocus = "currentTie";

  //Setting an empty handleClick function so that a user can't click on a tile
  //unless...
  let handleClick = () => {};

  //The tile has no current move AND the tile is the current focused tile
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

  //Image links obbject for the renderImage function
  const imageObject = {
    rock: "Images/rock.png",
    scissors: "Images/scissors.png",
    paper: "Images/paper.png",
  };

  //Render- Disabled when the game is over. ? displays when the computer has played the tile.
  //X displays when the computer owns the tile. O displays when the user owns the tile. An image
  //of the appropriate type displays when the user has played the tile or is clicking on
  //the tile. ! displays when there is a tie in the tile.
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
