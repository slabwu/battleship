export class Gameboard {
    #board = []
    constructor() {
        const ROWS = 10
        const COLUMNS = 10
        const ships = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1]

        for (let i = 0; i < ROWS; i++) {
        this.#board[i] = [];
        for (let j = 0; j < COLUMNS; j++) {
            this.#board[i].push(new Cell());
        }

        // this.printBoard()
    }}

    get board() {
        return this.#board
    }
    
    printBoard = () => {
        this.#board.forEach(row => {
            let output = ''
            row.forEach(cell => output += cell.value)
            console.log(output)
        })
    }
}

class Cell {
    constructor() {
        this.value = 'X'
    }
}