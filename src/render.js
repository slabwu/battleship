import { attackEnemy } from './index.js'
import { Events } from './pubsub.js'
import hit from './hit.mp3'
import miss from './miss.mp3'
import sink from './sink.mp3'

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
    Events.on('win', (player) => {console.log(`${player} won`)})
    Events.on('updateCell', ([name, x, y, state]) => {
        let div = document.querySelector(`.${name} [data-x="${x}"][data-y="${y}"]`)
        div.classList.add(state)
    })
})();

(function soundBoard() {
    Events.on('hit', () => {playSound(hit)})
    Events.on('miss', () => {playSound(miss)})
    Events.on('sink', () => {playSound(sink)})
})()

function playSound(file) {
    let sound = new Audio(file)
    // sound.currentTime = 0;
    sound.play();
}