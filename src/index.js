import './styles.css'
import { Player } from './player.js'
import { render, renderAsHidden } from './render.js'
import { Events } from "./pubsub.js";

console.log('Welcome to Battleship')
let user = new Player('player')
let robot = new Player('enemy', true)
let turn = 'player'
let robotMemory = []

user.board.printBoard()
render(user.board.cells)
renderAsHidden(robot.board.cells)
render(robot.board.cells)

export function attackEnemy(e) {
    let { x, y } = e.srcElement.dataset
    x = parseInt(x)
    y = parseInt(y)
    let hash = x + y * 10

    if (turn === 'player' && !robot.board.attackedCells.has(hash)) {
        let shipHit = user.attack(robot, x, y)
        if (shipHit) return
        turn = 'enemy'
        letEnemyAttack()
    }
}

function letEnemyAttack() {
    let cell
    while (true) {
        cell = Math.floor(Math.random() * 100)
        if (!user.board.attackedCells.has(cell)) break
    }
    
    setTimeout(() => {
        let shipHit = robot.attack(user, cell % 10, Math.floor(cell / 10))
        if (shipHit) {
            letEnemyAttack()
            return
        }
        turn = 'player'
    }, Math.random() * 500 + 500)
}