import { Gameboard, Cell } from './game.js'
import { Events } from "./pubsub.js";

export class Player {
    constructor(name = 'player', robot = 'false') {
        this.name = name
        this.board = new Gameboard(this.name)
        this.board.generateShips()
    }

    attack = (player, x, y) => {
        player.board.receiveAttack(x, y)

        if (player.board.isShip(x, y)) {
            Events.emit('updateCell', [player.name, x, y, 'hit'])
            return true
        } else {
            Events.emit('updateCell', [player.name, x, y, 'miss'])
            return false
        }
    }
}
