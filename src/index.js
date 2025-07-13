import { Player } from './player.js'
import { render } from './render.js'

console.log('Welcome to Battleship')
let user = new Player('Player 1')
let robot = new Player('Player 2')
user.board.printBoard()
render(user.board.cells)
user.printEnemyBoard()

robot.board.receiveAttack(1, 1)
robot.board.receiveAttack(1, 2)
robot.board.receiveAttack(1, 3)
console.log(robot.board.attackedCells)