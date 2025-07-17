import { attackEnemy } from './index.js'
const $ = (id) => document.getElementById(id)

export function render(board) {
    let output = ''
    board.forEach(row => {
        let rowOutput = '<div>'
        row.forEach(cell => {
            let content = ''
            let colour = 'grey'
            if (Number.isInteger(cell.value)) {
                content = cell.value
                colour = 'blue'
            }
            rowOutput += `<div style="background-color:${colour};">${content}</div>`
        })
        rowOutput += '</div>'
        output += rowOutput
    })

    const gameBoard = document.createElement('div')
    gameBoard.classList.add('board')
    gameBoard.innerHTML = output
    $('game').appendChild(gameBoard)
}

export function renderAsHidden(board) {
    const gameBoard = document.createElement('div')
    gameBoard.classList.add('board')
    $('game').appendChild(gameBoard)

    board.forEach((row, rowIndex) => {
        let rowDiv = document.createElement('div')
        gameBoard.appendChild(rowDiv)
        row.forEach((cell, columnIndex) => {
            let cellDiv = document.createElement('div')
            cellDiv.classList.add('clickableCell')
            cellDiv.dataset.y = rowIndex
            cellDiv.dataset.x = columnIndex
            rowDiv.appendChild(cellDiv)

            cellDiv.addEventListener('click', attackEnemy)
        })
    })
}