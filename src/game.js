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

    placeShip = ([x, y], index, length, orientation) => {
        if (orientation === 'x') {
            for (let i = 0; i < length; i++) {
                this.populate([x + i, y], index)
                this.populate([x + i, y - 1], '=')
                this.populate([x + i, y + 1], '=')
                for (let j = -1; j < 2; j++) {
                    this.populate([x - 1, y + j], '=')
                    this.populate([x + length, y + j], '=')
                }
            }
        } else {
            for (let i = 0; i < length; i++) {
                this.populate([x, y + i], index)
                this.populate([x - 1, y + i], '=')
                this.populate([x + 1, y + i], '=')
                for (let j = -1; j < 2; j++) {
                    this.populate([x + j, y - 1], '=')
                    this.populate([x + j, y + length], '=')
                }
            }
        }
    }

    isOnBoard = (x, y) => x >= 0 && x < 10 && y >= 0 && y < 10

    canOverwrite = (x, y) => this.getValue(x, y) === '_' || this.getValue(x, y) === '='

    populate = ([x, y], value) => {
        if (this.isOnBoard(x, y) && this.canOverwrite(x, y)) this.#board[y][x].value = value
    } 

    getValue = (x, y) => this.#board[y][x].value

    isValidPosition([x, y], length, orientation) {
        for (let i = 0; i < length; i++) {
            if (orientation === 'x') {
                // console.log(x + i, y, this.getValue(y, x + i))
                if (this.getValue(x + i, y) !== '_') return false
            } else {
                // console.log(x, y + i, this.getValue(y + i, x))
                if (this.getValue(x, y + i) !== '_') return false
            }
        }
        return true
    }

    generateShips = () => {
        this.ships.forEach((length, index) => {
            let ship = new Ship(length)
            this.ships[index] = ship

            let x, y, orientation
            while (true) {
                x = this.getRandomInt(11 - length)
                y = this.getRandomInt(11 - length)
                orientation = (this.getRandomInt(2) === 0) ? 'x' : 'y' 
                console.log({index, x, y, length, orientation} )
                if (this.isValidPosition([x, y], length, orientation)) {
                    this.placeShip([x, y], index, length, orientation)
                    break
                }
            }
            this.printBoard()
            console.log()
        })

        // this.placeShip([1, 1], 0, this.ships[0].length, 'x')
        // this.printBoard()
        // console.log(this.ships)
    }

    getRandomInt = (max) => Math.floor(Math.random() * max)

}

class Cell {
    constructor() {
        this.value = '_'
    }
}

let cat = new Gameboard()
cat.generateShips()
// cat.placeShip([1, 1], 0, 4, 'y')
// cat.placeShip([5, 1], 1, 4, 'y')
// cat.placeShip([3, 2], 2, 1, 'y')
// cat.placeShip([3, 6], 3, 1, 'y')
// cat.placeShip([0, 9], 4, 1, 'y')
// cat.placeShip([3, 8], 5, 4, 'x')
// cat.printBoard()
// console.log(cat.isValidPosition([3, 4], 1, 'x'))
// console.log(cat.isValidPosition([0, 6], 4, 'x'))
// console.log(cat.isValidPosition([0, 6], 4, 'y'))