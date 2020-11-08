import React from "react";

export default function DifficultySelect(props) {
  return (
    <div className={"difficulty_select_main"}>
      <button onClick={() => props.setAiDifficulty("easy")}>Easy</button>
      <button onClick={() => props.setAiDifficulty("medium")}>Medium</button>
      <button onClick={() => props.setAiDifficulty("hard")}>Hard</button>
    </div>
  );
}
