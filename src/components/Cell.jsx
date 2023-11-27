import { TURNS } from '../constants'

export const Cell = ({ turnCell, gameCell, updateBoard, index }) => {
  const cssTurnCell = turnCell === TURNS.blue ? '--blue' : turnCell === TURNS.orange ? '--orange is-turn' : ''
  const cssGameCell = gameCell === TURNS.blue ? '--blue' : gameCell === TURNS.orange ? '--orange' : ''
  const handleClick = () => { updateBoard(index) }
  return <span id={`cell-${index}`} onClick={handleClick} className={`c-board__cell ${cssGameCell} ${cssTurnCell}`}></span>
}
