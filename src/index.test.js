import { Ship } from './ship.js'
import { Gameboard } from './game.js'

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
    let test = new Gameboard(1)

    it('exists', () => expect(typeof test).toBe('object'))
    it('returns board', () => expect(Array.isArray(test.board)).toBe(true))
    it('detects collisions when populating', () => {
        test.placeShip([1, 1], 0, 4, 'x')
        expect(test.isValidPosition([1, 2], 4, 'x')).toBe(false)
        expect(test.isValidPosition([1, 3], 4, 'x')).toBe(true)
        expect(test.isValidPosition([6, 0], 4, 'y')).toBe(true)
        expect(test.isValidPosition([5, 2], 3, 'x')).toBe(false)
    })
})
