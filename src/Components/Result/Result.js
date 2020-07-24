import React from "react";

const Result = (props) => {
  return (
    <div>
      {props.winner === "user" ? <h3>You Win!</h3> : <h3>You Lose</h3>}
      <button onClick={() => props.handleReset()}>Start Over</button>
    </div>
  );
};

export default Result;
