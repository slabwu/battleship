import { Ship } from './ship'

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
