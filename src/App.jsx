import './App.css'
import { TURNS } from './constants'
import { WinnerModal } from './components/WinnerModal'
import { checkWinner, checkTie, updateBeforeColor, pointerEVents, lowestUnoccupiedCell } from './logic/board.js'
import { Cell } from './components/Cell'
import { useState } from 'react'
import confetti from 'canvas-confetti'

function App () {
  // States
  const [board, setBoard] = useState(() => {
    const savedBoard = window.localStorage.getItem('board')
    return savedBoard ? JSON.parse(savedBoard) : Array(42).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const savedTurn = window.localStorage.getItem('turn')
    return savedTurn || TURNS.blue
  })

  const [blueWins, setBlueWins] = useState(() => {
    const savedBlueWins = window.localStorage.getItem('blueWins')
    return savedBlueWins ? JSON.parse(savedBlueWins) : 0
  })

  const [redWins, setRedWins] = useState(() => {
    const savedRedWins = window.localStorage.getItem('redWins')
    return savedRedWins ? JSON.parse(savedRedWins) : 0
  })

  const [winner, setWinner] = useState(null)

  const updateBoard = (index) => {
    // check if cell is already occupied or if there is a winner
    if (winner) return

    const newLowestUnoccupiedCell = lowestUnoccupiedCell(board, index)
    // update board

    const newBoard = [...board]
    newBoard[newLowestUnoccupiedCell] = turn
    setBoard(newBoard)

    // change turn
    const newTurn = turn === TURNS.blue ? TURNS.red : TURNS.blue
    updateBeforeColor(turn === TURNS.blue ? 'blue' : 'red')
    setTurn(newTurn)

    pointerEVents()

    // save to local storage
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)

    // check winner
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
      if (newWinner === TURNS.blue) {
        setBlueWins(blueWins + 1)
        window.localStorage.setItem('blueWins', blueWins + 1)
      } else if (newWinner === TURNS.red) {
        setRedWins(redWins + 1)
        window.localStorage.setItem('redWins', redWins + 1)
      }
      confetti()
      confetti()
      confetti()
      confetti()
      confetti()
      confetti()
    } else if (checkTie(newBoard)) {
      setWinner(false)
    }
  }

  const resetGame = () => {
    setBoard(Array(42).fill(null))
    setTurn(TURNS.blue)
    setWinner(null)
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  const resetWins = () => {
    setBlueWins(0)
    setRedWins(0)
    window.localStorage.removeItem('blueWins')
    window.localStorage.removeItem('redWins')
  }

  return (
    <>
    <main className='board'>
    <h1>Connect 4!</h1>
    <p>Blue wins: {blueWins}</p>
    <p>Red wins: {redWins}</p>
    <button onClick={resetGame}>Reset game</button>
    <button onClick={resetWins}>Reset wins</button>
    <section>
      <Cell turnCell={turn}></Cell>
    </section>
    <section className="game">
    {
      board.map((cell, index) => {
        return <Cell key={index} index={index} gameCell={cell} updateBoard={updateBoard} />
      })
    }
    </section>
    {
      <WinnerModal resetGame={resetGame} winner={winner} />
    }
    </main>
    </>
  )
}

export default App
