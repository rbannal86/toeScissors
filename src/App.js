import React from "react";
import Board from "../src/Components/Board/Board";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>TOE SCISSORS</h1>
      <h2>It's like Rock-Paper-Scissors and Tic-Tac-Toe</h2>
      <Board />
    </div>
  );
}

export default App;
