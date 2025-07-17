import './styles.css'
import { Player } from './player.js'
import { render, renderAsHidden } from './render.js'
import { Events } from "./pubsub.js";

console.log('Welcome to Battleship')
let user = new Player('Player 1')
let robot = new Player('Player 2')
let turn = 'player'

user.board.printBoard()
render(user.board.cells)
renderAsHidden(robot.board.cells)
render(robot.board.cells)

export function attackEnemy(e) {
    let { column, row, x = +column, y = +row } = e.srcElement.dataset
    let cell = x + y * 9
    let div = e.srcElement
    if (turn === 'player' && !robot.board.attackedCells.has(cell)) {
        console.log(e.srcElement)
        robot.board.receiveAttack(x, y)
        if (robot.board.isShip(x, y)) {
            div.classList.add('hit')
        } else {
            div.classList.add('miss')
        }
        console.log(robot.board.sunkShips)
        // turn = 'robot'
    }
}