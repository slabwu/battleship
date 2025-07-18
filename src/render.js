import { attackEnemy } from './index.js'
import { Events } from './pubsub.js'
const $ = (id) => document.getElementById(id)

export function render(board) {
    renderCells(board, false)
}

export function renderAsHidden(board) {
    renderCells(board, true)
}

function renderCells(board, hidden) {
    const gameBoard = document.createElement('div')
    gameBoard.classList.add('board')
    $('game').appendChild(gameBoard)

    if (hidden) {
        gameBoard.classList.add('enemy')
    } else {
        gameBoard.classList.add('player')
    }

    board.forEach((row, rowIndex) => {
        let rowDiv = document.createElement('div')
        gameBoard.appendChild(rowDiv)
        row.forEach((cell, columnIndex) => {
            let cellDiv = document.createElement('div')
            cellDiv.dataset.y = rowIndex
            cellDiv.dataset.x = columnIndex
            rowDiv.appendChild(cellDiv)
            
            if (hidden) {
                cellDiv.classList.add('clickableCell')
                cellDiv.addEventListener('click', attackEnemy)
            } else {
                let className = 'empty'
                if (Number.isInteger(cell.value)) className = 'ship'
                cellDiv.classList.add(className)
            }
        })
    })
}

(function renderer() {
    Events.on('updateCell', ([name, x, y, state]) => {
        let div = document.querySelector(`.${name} [data-x="${x}"][data-y="${y}"]`)
        div.classList.add(state)
    })
})()