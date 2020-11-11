import React from "react";
import "./DifficultySelect.css";

export default function DifficultySelect(props) {
  //Buttons to choose difficulty. If the difficulty is set, the corresponding button
  //is disabled and the styling affects the disabled button to show that it is
  //the currently selected difficulty.
  return (
    <div className={"difficulty_select_main"}>
      <button
        onClick={() => props.setAiDifficulty("easy")}
        disabled={props.aiDifficulty === "easy" ? true : false}
        className={"difficulty_select_button"}
      >
        Easy
      </button>
      <button
        onClick={() => props.setAiDifficulty("medium")}
        disabled={props.aiDifficulty === "medium" ? true : false}
        className={"difficulty_select_button"}
      >
        Medium
      </button>
      <button
        onClick={() => props.setAiDifficulty("hard")}
        disabled={props.aiDifficulty === "hard" ? true : false}
        className={"difficulty_select_button"}
      >
        Hard
      </button>
    </div>
  );
}
