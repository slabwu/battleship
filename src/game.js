import { Ship } from './ship.js'

export class Gameboard {
    #board = []
    #attacked = new Map()
    #sunkShips = []
    #shipLocations = []

    constructor(name) {
        const ROWS = 10
        const COLUMNS = 10
        this.ships = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1]
        this.name = name

        for (let i = 0; i < ROWS; i++) {
        this.#board[i] = [];
        for (let j = 0; j < COLUMNS; j++) {
            this.#board[i].push(new Cell());
        }}
    }

    get cells() {
        return this.#board
    }

    get attackedCells() {
        return this.#attacked
    }

    get sunkShips() {
        return this.#sunkShips
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

    isShip = (x, y) => Number.isInteger(this.getValue(x, y))

    populate = ([x, y], value) => {
        if (this.isOnBoard(x, y) && !this.isShip(x, y)) this.#board[y][x].value = value
    } 

    getValue = (x, y) => this.#board[y][x].value

    isValidPosition([x, y], length, orientation) {
        for (let i = 0; i < length; i++) {
            if (orientation === 'x') {
                if (this.getValue(x + i, y) !== '_') return false
            } else {
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
                if (this.isValidPosition([x, y], length, orientation)) {
                    this.placeShip([x, y], index, length, orientation)
                    this.#shipLocations[index] = { x, y, length, orientation }
                    break
                }
            }
            // this.printBoard()
            // console.log()
        })
    }

    getRandomInt = (max) => Math.floor(Math.random() * max)

    receiveAttack = (x, y) => {
        let hash = x + 9 * y
        if (this.#attacked.has(hash)) return
        this.#attacked.set(parseInt(hash), this.getValue(x, y))
        if (this.isShip(x, y)) {
            let attackedShip = this.getShip(x, y)
            attackedShip.hit()
            if (attackedShip.isSunk()) {
                this.#sunkShips.push(attackedShip)
                this.clearNeighbourCells(this.getValue(x, y))
            }
        }
    }

    clearNeighbourCells = (index) => {
        let { x, y, length, orientation } = this.#shipLocations[index]
        if (orientation === 'x') {
            for (let i = 0; i < length; i++) {
                this.clear(x + i, y - 1)
                this.clear(x + i, y + 1)
                for (let j = -1; j < 2; j++) {
                    this.clear(x - 1, y + j)
                    this.clear(x + length, y + j)
                }
            }
        } else {
            for (let i = 0; i < length; i++) {
                this.clear(x - 1, y + i)
                this.clear(x + 1, y + i)
                for (let j = -1; j < 2; j++) {
                    this.clear(x + j, y - 1)
                    this.clear(x + j, y + length)
                }
            }
        }
    }

    getShip = (x, y) => this.ships[this.getValue(x, y)]

    getDOM = (x, y) => document.querySelector(`.${[this.name]} [data-x="${x}"][data-y="${y}"]`)
    
    clear = (x, y) => {
        let hash = x + 9 * y
        if (this.isOnBoard(x, y) && !this.#attacked.has(hash)) {
            this.getDOM(x, y).classList.add('cleared')
            this.#attacked.set(hash, this.getValue(x, y))
        }
    }

    allShipsSunk = () => this.#sunkShips.length === this.ships.length
}

export class Cell {
    constructor() {
        this.value = '_'
    }
}

let cat = new Gameboard()
cat.generateShips()
