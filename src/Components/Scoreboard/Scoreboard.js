import React from "react";
import "./Scoreboard.css";

export default function Scoreboard(props) {
  //Simply returns a display with the number of tiles owned by each player.
  //Total is determined in the Board component.
  return (
    <div className={"scoreboard_main"}>
      <div className={"scoreboard_display"}>
        User Controls {props.userTiles} Tiles
      </div>
      <div className={"scoreboard_display"}>
        Computer Controls {props.aiTiles} Tiles
      </div>
    </div>
  );
}
