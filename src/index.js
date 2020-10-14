import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

function InputForName() {
  const [value, setValue] = useState("");

  const handleInputForName = (event) => {
    setValue(event.target.value);
    console.log(event.target.value);
  };

  return (
    <form>
      <label htmlFor="name">{value ? `Привет, ${value}!` : ""}</label>
      <br />
      <input
        name="name"
        placeholder="enter your name"
        onChange={handleInputForName}
      />
    </form>
  );
}

function SquareF(props) {
  const [bgColor, setBgColor] = useState(null);

  useEffect(() => {
    document.title = props.value;
  }, [props.value]);

  useEffect(() => {
    setBgColor(
      `rgb(
        ${Math.floor(props.value)}, 
        ${Math.floor(props.value / 2)}, 
        ${Math.floor(props.value / 4)}
        )`
    );
  }, [props.value]);

  return (
    <button
      key={props.item}
      className="square"
      onClick={() => {
        props.onClick();
      }}
      style={{ backgroundColor: bgColor }}
    >
      {props.value}
    </button>
  );
}

function Board() {
  const status = "Next player: X";

  const [square, setSquare] = useState(Array(9).fill(null));

  function handleSquare(i) {
    const newSquare = square.slice();
    newSquare[i] = Math.floor(Math.random() * 256);
    setSquare(newSquare);
  }

  function renderSquare(i) {
    return (
      <SquareF
        value={square[i]}
        item={i}
        onClick={() => {
          handleSquare(i);
        }}
      />
    );
  }

  function Matrix(props) {
    const item = props.item
      ? `| ${props.item.toString().padStart(3, "0")} |`
      : "   ";

    return props.index % 3 ? (
      <>
        <span>{item}</span>
      </>
    ) : (
      <>
        <span>{item.toString().padStart(3, "0")}</span>
        <br></br>
      </>
    );
  }

  function CreateMatrix({ arr }) {
    let i = 0;
    const matrix = arr.map((item) => {
      i += 1;
      return (
        <Matrix
          index={i}
          item={item}
          key={Math.floor(Math.random() * 1000)}
        ></Matrix>
      );
    });

    return matrix;
  }
  console.log(square);

  return (
    <div>
      <div className="status">{status}</div>
      <CreateMatrix arr={square}></CreateMatrix>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

function Game() {
  return (
    <div className="game">
      <InputForName />
      <div className="game-board">
        <Board />
        <Board />
      </div>
      <div className="game-info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
