import React, { useState } from "react";
import Board from "../src/Components/Board/Board";
import Tutorial from "../src/Components/Tutorial/Tutorial";

import "./App.css";

function App() {
  const [view, setView] = useState();

  return (
    <div className="App">
      <div className="app_title_box">
        <h1 className="app_title" onClick={() => setView(null)}>
          TOE SCISSORS
        </h1>
      </div>
      {view === "tutorial" ? <Tutorial /> : null}
      {view !== "board" ? (
        <div className={"app_buttons"}>
          <button className={"app_button"} onClick={() => setView("tutorial")}>
            How To Play
          </button>
          <button className={"app_button"} onClick={() => setView("board")}>
            Start Game
          </button>
        </div>
      ) : null}
      {view === "board" ? <Board /> : null}
    </div>
  );
}

export default App;
