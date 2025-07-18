import { Gameboard, Cell } from './game.js'
import { Events } from "./pubsub.js";

export class Player {
    constructor(name = 'player', robot = 'false') {
        this.name = name
        this.board = new Gameboard(this.name)
        this.board.generateShips()
    }

    attack = (enemy, x, y) => {
        enemy.board.receiveAttack(x, y)

        if (enemy.board.isShip(x, y)) {
            Events.emit('updateCell', [enemy.name, x, y, 'hit'])
            if (enemy.board.allShipsSunk()) Events.emit('win', this.name)
            return true
        } else {
            Events.emit('updateCell', [enemy.name, x, y, 'miss'])
            return false
        }
    }
}
