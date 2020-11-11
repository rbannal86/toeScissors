import React, { useState } from "react";
import "./Buttons.css";

export default function Buttons(props) {
  const [toggleForfeit, setToggleForfeit] = useState(false);

  //Control buttons for the game board. Confirm finalizes a selected move. Is disabled until
  //the user actually chooses a move. Forfeit renders a confirmation dialog. Cancel goes back,
  //confirm sets a victory condition and new game button. Any victory condition will also switch
  //to a new game button. The new game button will reset the board and all relevant state values.
  return (
    <div className={"buttons_main"}>
      {toggleForfeit ? (
        <div className={"buttons_section"}>
          <h3 className={"buttons_confirm"}>
            Are you sure you want to forfeit?
          </h3>
          <button
            className={"buttons_button"}
            onClick={() => {
              props.setVictory("You have forfeited. The computer wins!");
              setToggleForfeit(false);
            }}
          >
            Confirm
          </button>
          <button
            className={"buttons_button"}
            onClick={() => setToggleForfeit(false)}
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
          {props.victory ? (
            <div className={"buttons_section"}>
              <button
                onClick={() => props.resetBoard()}
                className={"buttons_button buttons_new_game"}
              >
                New Game
              </button>
            </div>
          ) : (
            <>
              <div className={"buttons_section"}>
                <button
                  disabled={props.currentTile === " "}
                  onClick={() => props.handleMove()}
                  className={"buttons_button"}
                >
                  Confirm Move
                </button>
                <button
                  className={"buttons_button"}
                  onClick={() => {
                    setToggleForfeit(true);
                  }}
                >
                  Forfeit
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
