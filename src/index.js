import './styles.css'
import { Player } from './player.js'
import { render, renderAsHidden } from './render.js'
import { Events } from "./pubsub.js";

console.log('Welcome to Battleship')
let user = new Player('player')
let robot = new Player('enemy', true)
let turn = 'player'
let memory = false
let win = false
let queue = [[[+1, 0], 1, 'x'], [[-1, 0], 1, 'x'], [[0, -1], 1, 'y'], [[0, +1], 1, 'y']]
Events.on('win', () => {win = true})

user.board.printBoard()
render(user.board.cells)
renderAsHidden(robot.board.cells)
render(robot.board.cells)

export function attackEnemy(e) {
    let { x, y } = e.srcElement.dataset
    x = parseInt(x)
    y = parseInt(y)
    let hash = x + y * 10

    if (turn === 'player' && !robot.board.attackedCells.has(hash) && !win) {
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

    while (true) {
            x = getRandomInt(10)
            y = getRandomInt(10)
            if (!user.board.attackedCells.has(x + y * 10)) break
    }

    setTimeout(() => {
        let shipHit = robot.attack(user, x, y)
        if (shipHit) {
            if (win) return
            memory = {x: x, y: y, ship: user.board.getShip(x, y), orientation: false, queue: shuffle([...queue])}
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
            if (memory.orientation) {
                if (memory.orientation === direction[2]) break
            } else {
                break
            }
        }
    }

    setTimeout(() => {
        let shipHit = robot.attack(user, x, y)
        if (shipHit) {
            memory.queue.push([direction[0], direction[1] + 1, direction[2]])
            if (!memory.orientation) memory.orientation = direction[2]
            if (win) return
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

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = getRandomInt(i + 1);
        [array[i], array[j]] = [array[j], array[i]]
    }
    return array
}
