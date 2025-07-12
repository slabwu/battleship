import { Ship } from './ship.js'

export class Gameboard {
    #board = []
    constructor() {
        const ROWS = 10
        const COLUMNS = 10
        this.ships = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1]

        for (let i = 0; i < ROWS; i++) {
        this.#board[i] = [];
        for (let j = 0; j < COLUMNS; j++) {
            this.#board[i].push(new Cell());
        }}

        this.ships.forEach((length, index) => {
            let ship = new Ship(length)
            this.ships[index] = ship
        })

        this.placeShip(0, this.ships[0].length)
        // this.printBoard()
        // console.log(this.ships)
    }

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

    placeShip = (index, length) => {
        let x = 1
        let y = 1
        for (let i = 0; i < length; i++) {
            this.#board[i + y][x].value = index + 1
        }
        this.printBoard()
    }
}

class Cell {
    constructor() {
        this.value = '_'
    }
}

let cat = new Gameboard()