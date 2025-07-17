import { Gameboard, Cell } from './game.js'
import { Events } from "./pubsub.js";

export class Player {
    constructor(name = 'player', robot = 'false') {
        this.name = name
        this.board = new Gameboard()
        this.board.generateShips()
        if (robot) Events.on('robotTurn', this.attackPlayer)
    }

    attack = (player, x, y) => {
        player.board.receiveAttack(x, y)

        let div = document.querySelector(`.${[player.name]} [data-x="${x}"][data-y="${y}"]`);
        if (player.board.isShip(x, y)) {
            div.classList.add('hit')
        } else {
            div.classList.add('miss')
        }
    }

    attackPlayer = (player) => {
        let cell
        while (true) {
            cell = this.getRandomInt(100)
            if (!player.board.attackedCells.has(cell)) break
        }
        player.board.receiveAttack(cell % 10, Math.floor(cell / 10))
        console.log(player.board.attackedCells)
    }

    getRandomInt = (max) => Math.floor(Math.random() * max)
}
