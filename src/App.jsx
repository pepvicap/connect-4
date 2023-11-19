import './App.css'
import { WinnerModal } from './components/WinnerModal'
import { useState } from 'react'
import confetti from 'canvas-confetti'

const TURNS = {
  blue: 'Blue',
  red: 'Red'
}

const Cell = ({ turnCell, gameCell, updateBoard, index }) => {
  const cssTurnCell = turnCell === TURNS.blue ? 'blue is-selected' : turnCell === TURNS.red ? 'red is-selected' : ''
  const cssGameCell = gameCell === TURNS.blue ? 'blue' : gameCell === TURNS.red ? 'red' : ''
  const handleClick = () => { updateBoard(index) }
  return <span onClick={handleClick} className={`square ${cssGameCell} ${cssTurnCell}`}></span>
}

function App () {
  // States
  const [board, setBoard] = useState(() => {
    const savedBoard = window.localStorage.getItem('board')
    return savedBoard ? JSON.parse(savedBoard) : Array(42).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const savedTurn = window.localStorage.getItem('turn')
    return savedTurn || TURNS.X
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
    if (board[index] || winner) return

    // update board
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    // change turn
    const newTurn = turn === TURNS.blue ? TURNS.red : TURNS.blue
    setTurn(newTurn)

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

  const checkWinner = (board) => {
    // check horizontal
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 4; col++) {
        const index = row * 7 + col
        if (board[index] && board[index] === board[index + 1] && board[index] === board[index + 2] && board[index] === board[index + 3]) {
          return board[index]
        }
      }
    }

    // check vertical
    for (let index = 0; index < 21; index++) {
      if (board[index] && board[index] === board[index + 7] && board[index] === board[index + 14] && board[index] === board[index + 21]) {
        return board[index]
      }
    }

    // check diagonal right
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 4; col++) {
        const index = row * 7 + col
        if (board[index] && board[index] === board[index + 7 + 1] && board[index] === board[index + 14 + 2] && board[index] === board[index + 21 + 3]) {
          return board[index]
        }
      }
    }

    // check diagonal left
    for (let row = 0; row < 3; row++) {
      for (let col = 3; col < 7; col++) {
        const index = row * 7 + col
        if (board[index] && board[index] === board[index + 7 - 1] && board[index] === board[index + 14 - 2] && board[index] === board[index + 21 - 3]) {
          return board[index]
        }
      }
    }

    return null
  }

  const checkTie = (newBoard) => {
    return newBoard.every(cell => cell !== null)
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
    <button onClick={resetWins}>Reset wins</button>    <section>
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
