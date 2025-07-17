import { Gameboard, Cell } from './game.js'
import { Events } from "./pubsub.js";

export class Player {
    constructor(name = 'player') {
        this.name = name
        this.board = new Gameboard()
        this.board.generateShips()
    }
}
