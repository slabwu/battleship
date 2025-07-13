import { Gameboard, Cell } from './game.js'

export class Player {
    constructor(name = 'player') {
        this.name = name
        this.board = new Gameboard()
        this.board.generateShips()

        this.enemyBoard = []
        for (let i = 0; i < 10; i++) {
        this.enemyBoard[i] = [];
        for (let j = 0; j < 10; j++) {
            this.enemyBoard[i].push(new Cell('_'));
        }}
    }

    printEnemyBoard = () => {
        this.enemyBoard.forEach(row => {
            let output = ''
            row.forEach(cell => output += cell.value)
            console.log(output)
        })
    }
}
