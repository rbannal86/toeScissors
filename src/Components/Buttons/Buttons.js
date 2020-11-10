import React, { useState } from "react";
import "./Buttons.css";

export default function Buttons(props) {
  const [toggleForfeit, setToggleForfeit] = useState(false);
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
