import './styles.css'
import { Player } from './player.js'
import { render, renderAsHidden } from './render.js'
import { Events } from "./pubsub.js";

console.log('Welcome to Battleship')
let user = new Player('player')
let robot = new Player('enemy', true)
let turn = 'player'

user.board.printBoard()
render(user.board.cells)
renderAsHidden(robot.board.cells)
render(robot.board.cells)

export function attackEnemy(e) {
    let { column, row, x = +column, y = +row } = e.srcElement.dataset
    let cell = x + y * 9
    // let div = e.srcElement

    if (turn === 'player' && !robot.board.attackedCells.has(cell)) {
        user.attack(robot, x, y)

        let cell
        turn = 'enemy'
        while (true) {
            cell = Math.floor(Math.random() * 100)
            if (!user.board.attackedCells.has(cell)) break
        }
        setTimeout(() => {
            robot.attack(user, cell % 10, Math.floor(cell / 10))
            turn = 'player'
        }, Math.random() * 500 + 500)
    }
    
}