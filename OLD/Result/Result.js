import React from "react";

const Result = (props) => {
  console.log(props.winner);
  return (
    <div>
      {props.winner === 1 ? <h3>You Win!</h3> : <h3>You Lose</h3>}
      <button onClick={() => props.handleReset()}>Start Over</button>
    </div>
  );
};

export default Result;
