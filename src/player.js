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

        let div = document.querySelector(`.${[player.name]} [data-x="${x}"][data-y="${y}"]`)
        if (player.board.isShip(x, y)) {
            div.classList.add('hit')
        } else {
            div.classList.add('miss')
        }
    }
}
