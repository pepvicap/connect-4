import './App.css'
import { TURNS, COLORS } from './constants'
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
    return savedTurn || TURNS.orange
  })

  const [orangeWins, setOrangeWins] = useState(() => {
    const savedOrangeWins = window.localStorage.getItem('orangeWins')
    return savedOrangeWins ? JSON.parse(savedOrangeWins) : 0
  })

  const [blueWins, setBlueWins] = useState(() => {
    const savedBlueWins = window.localStorage.getItem('blueWins')
    return savedBlueWins ? JSON.parse(savedBlueWins) : 0
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
    const newTurn = turn === TURNS.orange ? TURNS.blue : TURNS.orange
    updateBeforeColor(turn === TURNS.orange ? COLORS.orange : COLORS.blue)
    setTurn(newTurn)
    console.log(COLORS.orange)
    pointerEVents()

    // save to local storage
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)

    // check winner
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
      if (newWinner === TURNS.orange) {
        setOrangeWins(orangeWins + 1)
        window.localStorage.setItem('orangeWins', orangeWins + 1)
      } else if (newWinner === TURNS.blue) {
        setBlueWins(blueWins + 1)
        window.localStorage.setItem('blueWins', blueWins + 1)
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
    setTurn(TURNS.orange)
    setWinner(null)
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  const resetWins = () => {
    setOrangeWins(0)
    setBlueWins(0)
    window.localStorage.removeItem('orangeWins')
    window.localStorage.removeItem('blueWins')
  }

  return (
    <>
    <main className='c-board'>
    <h1>Connect 4!</h1>
    <section className="c-board__btns">
    <button className="btn" onClick={resetGame}>Reset game</button>
    <button className="btn --yellow" onClick={resetWins}>Reset wins</button>
    </section>
    <section className="c-board__colors">
    <p className="is-orange"><em>Orange</em> {orangeWins}</p>
    <p className="is-blue"><em>Blue</em> {blueWins}</p>
    </section>
    <section className="c-board__turn">
      <Cell turnCell={turn}></Cell>
    </section>
    <section className="c-board__game">
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
