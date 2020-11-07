import React from "react";

export default function Scoreboard(props) {
  return (
    <div className={"scoreboard_main"}>
      <div>User Controls {props.userTiles} Tiles</div>
      <div>Computer Controls {props.aiTiles} Tiles</div>
    </div>
  );
}
