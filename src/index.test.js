import { Ship } from './ship.js'
import { Gameboard } from './game.js'
import { Player } from './player.js'

describe('Ship class', () => {
    let boat = new Ship(1)

    it('exists', () => expect(typeof boat).toBe('object'))
    it('returns length', () => expect(boat.length).toBe(1))
    it('returns hits', () => expect(boat.hits).toBe(0))
    it('gets hit', () => {
        boat.hit()
        expect(boat.hits).toBe(1)
    })
    it('sinks', () => expect(boat.isSunk()).toBe(true))
})

describe('Gameboard class', () => {
    let board = new Gameboard()
    board.ships = [new Ship(1), new Ship(4)]

    it('exists', () => expect(typeof board).toBe('object'))
    it('returns board', () => expect(Array.isArray(board.cells)).toBe(true))
    it('places ship on board', () => {
        board.placeShip([9, 9], 0, 1, 'x')
        expect(board.getValue(9, 9)).toBe(0)
    })
    it('detects collisions when populating', () => {
        board.placeShip([1, 1], 1, 4, 'x')
        expect(board.isValidPosition([1, 2], 4, 'x')).toBe(false)
        expect(board.isValidPosition([1, 3], 4, 'x')).toBe(true)
        expect(board.isValidPosition([6, 0], 4, 'y')).toBe(true)
        expect(board.isValidPosition([5, 2], 3, 'x')).toBe(false)
    })
    it('hits ships', () => {
        board.receiveAttack(1, 1)
        expect(board.ships[1].hits).toBe(1)
    })
    it('hits each cell only once', () => {
        board.receiveAttack(1, 1)
        expect(board.attackedCells.size).toBe(1)
    })
    it('sinks ships', () => {
        board.receiveAttack(9, 9)
        expect(board.sunkShips.length).toBe(1)
    })
    it('reports if all ships sunk', () => {
        board.receiveAttack(2, 1)
        board.receiveAttack(3, 1)
        board.receiveAttack(4, 1)
        expect(board.allShipsSunk()).toBe(true)
    })
})

describe('Player class', () => {
    let test = new Player()
    console.log(test.board)

    it('exists', () => expect(typeof test).toBe('object'))
    it('has gameboard', () => expect(Array.isArray(test.board.cells)).toBe(true))
})