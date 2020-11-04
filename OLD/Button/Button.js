import React from "react";
import "../Button/Button.css";

const Button = (props) => {
  let classModifier = props.button.userMove + " ";
  let imgSrc;
  let imgAlt = "nothing";

  if (props.currentSelect.id === props.button.id) {
    switch (props.currentSelect.item) {
      case 0:
        imgSrc = "/rock.png";
        imgAlt = "rock currently selected";
        break;
      case 1:
        imgSrc = "/paper.png";
        imgAlt = "paper currently selected";
        break;
      case 2:
        imgSrc = "/scissors.png";
        imgAlt = "scissors currently selected";
        break;
      default:
        break;
    }
  }
  if (props.button.userMoveNumber === 0) {
    imgSrc = "/rock.png";
    imgAlt = "User submitted rock";
  }
  if (props.button.userMoveNumber === 1) {
    imgSrc = "/paper.png";
    imgAlt = "User submitted paper";
  }
  if (props.button.userMoveNumber === 2) {
    imgSrc = "/scissors.png";
    imgAlt = "User submitted scissors";
  }

  if (props.currentSelect.id === props.button.id && !props.button.userMove)
    classModifier = "selected";

  return props.button.owner ? (
    <button className={"board_button "}>
      {props.button.owner === "user" ? "X" : "O"}
    </button>
  ) : (
    <button
      className={"board_button " + classModifier}
      onClick={() => props.handleClick(props.button.id)}
    >
      {imgSrc ? (
        <img className="button_image" src={imgSrc} alt={imgAlt} />
      ) : (
        <></>
      )}
    </button>
  );
};

export default Button;
