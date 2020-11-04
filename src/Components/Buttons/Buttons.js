import React from "react";
import "./Buttons.css";

export default function Buttons(props) {
  const handleConfirm = () => {};

  return (
    <div className={"buttons_main"}>
      <button
        disabled={props.currentTile === " "}
        onClick={() => props.handleMove()}
      >
        Confirm Move
      </button>
    </div>
  );
}
