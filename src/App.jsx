import './App.css'
import { useState } from 'react'

const TURNS = {
  blue: 'b',
  red: 'r'
}

const Cell = ({ isSelected, value, updateBoard, index }) => {
  const css = isSelected ? 'is-selected' : ''
  const turnSwitcher = value === TURNS.blue ? 'blue' : value === TURNS.red ? 'red' : ''
  const handleClick = () => { updateBoard(index) }
  return <span onClick={handleClick} className={`square ${turnSwitcher} ${css}`}></span>
}

function App () {
  const [board, setBoard] = useState(Array(42).fill(null))
  const [turn, setTurn] = useState(TURNS.blue)

  const updateBoard = (index) => {
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.blue ? TURNS.red : TURNS.blue
    console.log(newTurn)
    setTurn(newTurn)
  }

  return (
    <>
    <main className='board'>
    <h1>Connect 4!</h1>
    <section>
      <Cell isSelected={turn === TURNS.blue}>{TURNS.blue}</Cell>
      <Cell isSelected={turn === TURNS.red}>{TURNS.red}</Cell>
    </section>
    <section className="game">
    {
      board.map((cell, index) => {
        return <Cell key={index} index={index} value={cell} updateBoard={updateBoard} />
      })
    }
    </section>
    </main>
    </>
  )
}

export default App
