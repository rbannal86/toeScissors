import React from "react";
import "./DifficultySelect.css";

export default function DifficultySelect(props) {
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
