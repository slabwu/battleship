import './styles.css'
import { Player } from './player.js'
import { render, renderAsHidden } from './render.js'
import { Events } from "./pubsub.js";

console.log('Welcome to Battleship')
let user = new Player('player')
let robot = new Player('enemy', true)
let turn = 'player'
let memory = false
let go = {right: [+1, 0], left: [-1, 0], up: [0, -1], down: [0, +1]}

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
    let x
    let y

    if (memory) {
        letEnemyTargetShip()
        return
    }
    console.log('aiming yolo', memory)
    while (true) {
            x = getRandomInt(10)
            y = getRandomInt(10)
            if (!user.board.attackedCells.has(x + y * 10)) break
    }

    setTimeout(() => {
        let shipHit = robot.attack(user, x, y)
        if (shipHit) {
            memory = {x: x, y: y, ship: user.board.getShip(x, y), queue: [
                [go.right, 1], [go.left, 1], [go.up, 1], [go.down, 1]
            ]}
            if (memory.ship.isSunk()) {
                memory = false
                letEnemyAttack()
            } else {
                letEnemyTargetShip()
            }
            return
        }
        turn = 'player'
    }, Math.random() * 500 + 500)
}

function letEnemyTargetShip() {
    let direction, x, y
    while(true) {
        direction = memory.queue.shift()
        x = memory.x + direction[0][0] * direction[1]
        y = memory.y + direction[0][1] * direction[1]
        if (user.board.isOnBoard(x, y) && !user.board.attackedCells.has(x + y * 10)) {
            break;
        }
    }

    setTimeout(() => {
        let shipHit = robot.attack(user, x, y)
        if (shipHit) {
            memory.queue.push([direction[0], direction[1] + 1])
            if (memory.ship.isSunk()) {
                memory = false
                letEnemyAttack()
            } else {
                letEnemyTargetShip()
            }
            return
        }
        turn = 'player'
    }, Math.random() * 500 + 500)
}

let getRandomInt = (max) => Math.floor(Math.random() * max)