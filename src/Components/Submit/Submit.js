import React from "react";

const Submit = (props) => {
  return (
    <div>
      <button onClick={() => props.handleSubmit()}>Submit</button>
      <button onClick={() => props.handleReset()}>Reset</button>
    </div>
  );
};

export default Submit;
