import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

function getRandom(max) {
  return Math.floor(Math.random() * max);
}

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
    let g = props.isGreen ? 1 : 4;
    let r = props.isGreen ? 4 : 1;
    setBgColor(
      `rgb(
        ${Math.floor(props.value / r)}, 
        ${Math.floor(props.value / g)}, 
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
  const [square, setSquare] = useState(Array(9).fill(null));
  const [isGreen, setIsGreen] = useState(true);
  const [sumGreen, setSumGreen] = useState(0);
  const [sumRed, setSumRed] = useState(0);
  const [winner, setWinner] = useState("go play");

  const status = `Next player: ${isGreen ? "red" : "green"}`;

  function fWinner(arr) {
    if (arr.indexOf(null) === -1) {
      sumGreen > sumRed ? setWinner("Green") : setWinner("Red");
    }
  }

  useEffect(()=>{
    fWinner(square);
  }, [square]);

  function handleSquare(i) {
    if (square.indexOf(null) === -1) return;
    const newSquare = square.slice();
    newSquare[i] = getRandom(256);
    setSquare(newSquare);
    setIsGreen(!isGreen);
    sumRedGreen(newSquare[i], isGreen); 
  }

  function sumRedGreen(value, isGreen) {
    console.log(value);
    let sum;
    if (!isGreen) {
      sum = sumGreen + value;
      setSumGreen(sum);
    } else {
      sum = sumRed + value;
      setSumRed(sum);
    }
  }

  function renderSquare(i) {
    return (
      <SquareF
        value={square[i]}
        item={i}
        isGreen={isGreen}
        onClick={() => {
          handleSquare(i);
        }}
      />
    );
  }

  function Matrix(props) {
    const item = props.item
      ? `| ${props.item.toString().padStart(3, "0")} |`
      : "";

    return props.index % 3 ? (
      <>
        <span>{item}</span>
      </>
    ) : (
      <>
        <span>{item}</span>
        <br></br>
      </>
    );
  }

  function CreateMatrix({ arr }) {
    let i = 0;
    const matrix = arr.map((item) => {
      i += 1;
      return <Matrix index={i} item={item} key={getRandom(10000)}></Matrix>;
    });

    return matrix;
  }

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
      <div>Red - {sumRed}</div>
      <div>Green - {sumGreen}</div>
      <div>Winner - {winner}</div>
    </div>
  );
}

function Game() {
  return (
    <div className="game">
      <InputForName />
      <div className="game-board">
        <Board />
        <hr></hr>
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
