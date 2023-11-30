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
    <section className="c-board__links">
    <a href="https://www.linkedin.com/in/jmvicap" title="Linkedin" target="_blank" rel="noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 1024 1024"><path fill="currentColor" d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5C64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9c26.4 39.1 77.9 32.5 104 26c5.7-23.5 17.9-44.5 34.7-60.8c-140.6-25.2-199.2-111-199.2-213c0-49.5 16.3-95 48.3-131.7c-20.4-60.5 1.9-112.3 4.9-120c58.1-5.2 118.5 41.6 123.2 45.3c33-8.9 70.7-13.6 112.9-13.6c42.4 0 80.2 4.9 113.5 13.9c11.3-8.6 67.3-48.8 121.3-43.9c2.9 7.7 24.7 58.3 5.5 118c32.4 36.8 48.9 82.7 48.9 132.3c0 102.2-59 188.1-200 212.9a127.5 127.5 0 0 1 38.1 91v112.5c.8 9 0 17.9 15 17.9c177.1-59.7 304.6-227 304.6-424.1c0-247.2-200.4-447.3-447.5-447.3z"/></svg></a>
    <a href="https://www.github.com/peptramuntana/connect-4" title="GitHub" target="_blank" rel="noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 256 256"><path fill="currentColor" d="M216 24H40a16 16 0 0 0-16 16v176a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V40a16 16 0 0 0-16-16Zm0 192H40V40h176v176ZM96 112v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Zm88 28v36a8 8 0 0 1-16 0v-36a20 20 0 0 0-40 0v36a8 8 0 0 1-16 0v-64a8 8 0 0 1 15.79-1.78A36 36 0 0 1 184 140Zm-84-56a12 12 0 1 1-12-12a12 12 0 0 1 12 12Z"/></svg></a>
    </section>
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
