export const checkWinner = (board) => {
  // check horizontal
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 4; col++) {
      const index = row * 7 + col
      if (board[index] && board[index] === board[index + 1] && board[index] === board[index + 2] && board[index] === board[index + 3]) {
        return {
          board: board[index],
          winningCells: [index, index + 1, index + 2, index + 3]
        }
      }
    }
  }

  // check vertical
  for (let index = 0; index < 21; index++) {
    if (board[index] && board[index] === board[index + 7] && board[index] === board[index + 14] && board[index] === board[index + 21]) {
      return {
        board: board[index],
        winningCells: [index, index + 7, index + 14, index + 21]
      }
    }
  }

  // check diagonal right
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 4; col++) {
      const index = row * 7 + col
      if (board[index] && board[index] === board[index + 7 + 1] && board[index] === board[index + 14 + 2] && board[index] === board[index + 21 + 3]) {
        return {
          board: board[index],
          winningCells: [index, index + 7 + 1, index + 14 + 2, index + 21 + 3]
        }
      }
    }
  }

  // check diagonal left
  for (let row = 0; row < 3; row++) {
    for (let col = 3; col < 7; col++) {
      const index = row * 7 + col
      if (board[index] && board[index] === board[index + 7 - 1] && board[index] === board[index + 14 - 2] && board[index] === board[index + 21 - 3]) {
        return {
          board: board[index],
          winningCells: [index, index + 7 - 1, index + 14 - 2, index + 21 - 3]
        }
      }
    }
  }
  return null
}

export const checkTie = (newBoard) => {
  return newBoard.every(cell => cell !== null)
}

export const lowestUnoccupiedCell = (board, index) => {
  // calculate column from index
  const column = index % 7

  // find the first occupied cell from the top in the column
  let lowestUnoccupiedCellIndex = -1
  let counter = 0
  for (let i = column; i <= 35 + column; i += 7) {
    if (board[i] !== null) {
      lowestUnoccupiedCellIndex = i - 7
      break
    } else {
      // add animation classes to the cell
      const cell = document.getElementById(`cell-${i}`)
      cell.classList.add('is-dropping', `is-animation-${counter}`)
      const currentCounter = counter
      counter++
      // remove animation classes after 1 second
      setTimeout(() => {
        cell.classList.remove('is-dropping', `is-animation-${currentCounter}`)
      }, 1000)
    }
  }

  // if all cells in the column are unoccupied, set lowestUnoccupiedCellIndex to the bottom cell
  if (lowestUnoccupiedCellIndex === -1) {
    lowestUnoccupiedCellIndex = 35 + column
  }

  // calculate the delay regarding the last row
  const row = Math.floor(lowestUnoccupiedCellIndex / 7)
  const delay = row * 0.167
  const cell = document.getElementById(`cell-${lowestUnoccupiedCellIndex}`)
  cell.style.transitionDelay = `${delay}s`
  setTimeout(() => {
    cell.style.transitionDelay = ''
  }, 1000)

  // if the column is fully occupied, stop and return
  if (lowestUnoccupiedCellIndex < column) return

  return lowestUnoccupiedCellIndex
}

export const updateBeforeColor = (color) => {
  // Create a new style element
  const style = document.createElement('style')

  // Set the CSS text
  style.textContent = `
      .c-board__cell::before {
        background-color: ${color};
      }
    `
  // Append the style element to the document head
  document.head.append(style)
}

export const pointerEVents = () => {
  const boardGame = document.querySelectorAll('.c-board .c-board__game')
  boardGame.forEach(game => {
    game.style.pointerEvents = 'none'
  })
  setTimeout(() => {
    boardGame.forEach(game => {
      game.style.pointerEvents = 'auto'
    })
  }, 1000)
}
