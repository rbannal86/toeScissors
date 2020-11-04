import React, { useState } from "react";

const Tie = (props) => {
  const [userChoice, setUserChoice] = useState();

  return (
    <div>
      <button onClick={() => setUserChoice(0)}>
        <img src="/rock.png" alt="rock"></img>
      </button>
      <button onClick={() => setUserChoice(1)}>
        <img src="/paper.png" alt="paper"></img>
      </button>
      <button onClick={() => setUserChoice(2)}>
        <img src="/scissors.png" alt="scissors"></img>
      </button>
      <button onClick={() => props.handleSubmit(userChoice)}>Submit</button>
    </div>
  );
};

export default Tie;
