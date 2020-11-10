import React from "react";
import Board from "../src/Components/Board/Board";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="app_title_box">
        <h1 className="app_title">TOE SCISSORS</h1>
      </div>
      {/* <h2>It's like Rock-Paper-Scissors and Tic-Tac-Toe</h2> */}
      <Board />
    </div>
  );
}

export default App;
