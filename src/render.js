const $ = (id) => document.getElementById(id)

export function render(board, hidden = false) {
    let output = ''
    console.log(board)
    board.forEach(row => {
        let rowOutput = '<div>'
        row.forEach(cell => {
            let content = ''
            let colour = 'grey'
            if (Number.isInteger(cell.value) && !hidden) {
                content = cell.value
                colour = 'blue'
            }
            rowOutput += `<div style="background-color:${colour};">${content}</div>`
        })
        rowOutput += '</div>'
        output += rowOutput
    })

    const gameBoard = document.createElement("div")
    gameBoard.classList.add('board')
    gameBoard.innerHTML = output
    $('game').appendChild(gameBoard)
}