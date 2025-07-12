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
            this.populate([x, y + i], index + 1)
            this.populate([x - 1, y + i], 0)
            this.populate([x + 1, y + i], 0)
            for (let j = -1; j < 2; j++) {
                this.populate([x + j, y - 1], 0)
                this.populate([x + j, y + length], 0)
            }
        }
        this.printBoard()
    }

    isOnBoard = (y, x) => {
        return x >= 0 && x < 10 && y >= 0 && y < 10
    }

    populate = ([x, y], value) => {
        if (this.isOnBoard(y, x)) this.#board[y][x].value = value
    } 
}

class Cell {
    constructor() {
        this.value = '_'
    }
}

let cat = new Gameboard()