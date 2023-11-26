import { TURNS } from '../constants'

export const Cell = ({ turnCell, gameCell, updateBoard, index }) => {
  const cssTurnCell = turnCell === TURNS.blue ? 'blue' : turnCell === TURNS.red ? 'red' : ''
  const cssGameCell = gameCell === TURNS.blue ? 'blue' : gameCell === TURNS.red ? 'red' : ''
  const handleClick = () => { updateBoard(index) }
  return <span id={`cell-${index}`} onClick={handleClick} className={`cell ${cssGameCell} ${cssTurnCell}`}></span>
}
