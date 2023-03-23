import { useState } from 'react';
import './App.css';

function Square({ value, onSquareClick }) {
  return (
    <>
      {value === 'O' ? (
        <button
          style={{ color: '#2A3492' }}
          className='square'
          onClick={onSquareClick}
        >
          {value}
        </button>
      ) : (
        <button
          style={{ color: '#EF4423' }}
          className='square'
          onClick={onSquareClick}
        >
          {value}
        </button>
      )}
    </>
  );
}

function App() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [chooseTeam, setChooseTeam] = useState(true);

  function handleSquareClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();

    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }

    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function handleChoosePlayerClick(value) {
    console.log(value);
    setChooseTeam(false);
    if (value === 'O') {
      setXIsNext(false);
    }
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [2, 5, 8],
      [1, 4, 7],
      [0, 3, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  const winner = calculateWinner(squares);
  let status;

  if (!squares.includes(null)) {
    console.log('Squares are full');
  }

  if (winner) {
    status = 'Winner: ' + winner;
    setTimeout(() => {
      setChooseTeam(true);
      setXIsNext('X');
      setSquares(Array(9).fill(null));
    }, 3000);
  } else if (!squares.includes(null)) {
    status = 'Tie Game';
    setTimeout(() => {
      setChooseTeam(true);
      setXIsNext('X');
      setSquares(Array(9).fill(null));
    }, 3000);
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : '0');
  }

  function handleReset() {
    setXIsNext('X');
    setSquares(Array(9).fill(null));
    setChooseTeam(true);
  }

  return (
    <div className='App'>
      <h1>
        <span style={{ color: '#2A3492' }}>Tic </span>
        <span style={{ color: '#FF9526' }}>Tac </span>
        <span style={{ color: '#EF4423' }}>Toe </span>
      </h1>
      {chooseTeam ? (
        <div>
          <p>Choose your team:</p>
          <button
            className='choosePlayerButton red'
            value='X'
            onClick={() => handleChoosePlayerClick('X')}
          >
            X
          </button>
          <button
            className='choosePlayerButton blue'
            value='O'
            onClick={() => handleChoosePlayerClick('O')}
          >
            O
          </button>
        </div>
      ) : (
        <div className='status'>{status}</div>
      )}

      <div className='gameBoard'>
        <Square value={squares[0]} onSquareClick={() => handleSquareClick(0)}>
          {squares}
        </Square>
        <Square
          xIsNext={xIsNext}
          value={squares[1]}
          onSquareClick={() => handleSquareClick(1)}
        >
          {squares}
        </Square>
        <Square value={squares[2]} onSquareClick={() => handleSquareClick(2)}>
          {squares}
        </Square>
        <Square value={squares[3]} onSquareClick={() => handleSquareClick(3)}>
          {squares}
        </Square>
        <Square value={squares[4]} onSquareClick={() => handleSquareClick(4)}>
          {squares}
        </Square>
        <Square value={squares[5]} onSquareClick={() => handleSquareClick(5)}>
          {squares}
        </Square>
        <Square value={squares[6]} onSquareClick={() => handleSquareClick(6)}>
          {squares}
        </Square>
        <Square value={squares[7]} onSquareClick={() => handleSquareClick(7)}>
          {squares}
        </Square>
        <Square value={squares[8]} onSquareClick={() => handleSquareClick(8)}>
          {squares}
        </Square>
      </div>
      <button className='resetButton' onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}

export default App;
