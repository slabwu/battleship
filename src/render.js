const $ = (id) => document.getElementById(id)

export function render(board) {
    let output = ''
    console.log(board)
    board.forEach(row => {
        let rowOutput = '<div>'
        row.forEach(cell => {
            let content = ''
            if (Number.isInteger(cell.value)) content = cell.value
            rowOutput += `<div>${content}</div>`
        })
        rowOutput += '</div>'
        output += rowOutput
    })

    const gameBoard = document.createElement("div")
    gameBoard.classList.add('board')
    gameBoard.innerHTML = output
    $('game').appendChild(gameBoard)
}