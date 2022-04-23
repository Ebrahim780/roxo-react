import React, { useState } from 'react';
import calculateWinner from '../helper';
import Board from './Board';

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [stepNumber, setStepNumber] = useState(0)
  const [isNext, setIsNext] = useState(true)
  const winner = calculateWinner(history[stepNumber])
  const XO = isNext ? 'X' : 'O';

  const hanldeClick = i => {
    const historyPoint = history.slice(0, stepNumber + 1)
    const current = historyPoint[stepNumber]
    const squares = [...current]
    // return if won or occupied
    if (winner || squares[i]) return;
    // select square
    squares[i] = XO
    setHistory([...historyPoint, squares])
    setStepNumber(historyPoint.length)
    setIsNext(!isNext)
  }

  const jumpTo = step => {
    setStepNumber(step)
    setIsNext(step % 2 === 0)
  }

  const renderMoves = () =>
    history.map((_step, move) => {
      const destination = move ? `Go to move ${move}` : `go to start`;

      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{destination}</button>
        </li>
      )
    })
    

  return (
    <>
      <h1>Tic Tac Toe</h1>
      <Board squares={history[stepNumber]} onClick={hanldeClick} />
        <h3>History</h3>
        <div className='info-wrapper'>
          {renderMoves()}
        </div>
        <h3>{winner ? `${winner} is winner` : `Next player: ${XO}`}</h3>
    </>
  )
}

export default Game;