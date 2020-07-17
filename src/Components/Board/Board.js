import React from "react";

function Board() {
  const renderRow = () => {
    return (
      <div>
        <button />
        <button />
        <button />
        <button />
        <button />
      </div>
    );
  };
  const renderBoard = () => {
    return (
      <div>
        <div>
          <button />
          <button />
          <button />
          <button />
          <button />
        </div>
        <div>
          <button />
          <button />
          <button />
          <button />
          <button />
        </div>
        <div>
          <button />
          <button />
          <button />
          <button />
          <button />
        </div>
        <div>
          <button />
          <button />
          <button />
          <button />
          <button />
        </div>
        <div>
          <button />
          <button />
          <button />
          <button />
          <button />
        </div>
      </div>
    );
  };

  return <div>{renderBoard()}</div>;
}

export default Board;
