import { useState } from 'react'
import Squares from './Squares'
import History from './History'
export default function Board(props){
    let [squares, setSquares] = useState(new Array(9).fill(' '))
    let [turn, setTurn] = useState(true)
    let [status, setStatus] = useState('')
    let [history, setHistory] = useState([])
    let [movesCounter, setMovesCounter] = useState(0)

    let checkEqual = (row, grid) => row.every(cell => grid[cell] === 'X') || row.every(cell => grid[cell] === 'O')

    let checkStatus = (grid) => {
        let rows = [[0, 1, 2], [3,4,5], [6,7,8]]
        let columns = [[0,3,6], [1,4,7], [2,5,8]]
        let diagonals = [[0,4,8], [2,4,6]]
        for(let row of rows){
            if(checkEqual(row, grid)){
                setStatus(grid[row[0]] + ' Wins')
                return
            }
        }
        for(let column of columns){
            if(checkEqual(column, grid)){
                setStatus(grid[column[0]] + ' Wins')
                return
            }
        }
        for(let diagonal of diagonals){
            if(checkEqual(diagonal, grid)){
                setStatus(grid[diagonal[0]] + ' Wins')
                return
            }
        }
        if(grid.every(cell => cell==='X' || cell === 'O')){
            setStatus('Draw')
        }
    }
    let clickHandler = (index) => {
        if(squares[index] !== ' ' || status!==''){
            return
        }
        let copy = [...squares]
        let historyCopy = history.slice(0, movesCounter)
        historyCopy.push({squares: squares, moves: movesCounter, turn: turn, status:status})
        setHistory(historyCopy)
        copy[index] = turn ? 'X' : 'O'
        checkStatus(copy)
        setSquares(copy)
        setTurn(!turn)
        setMovesCounter(movesCounter+1)
    }

    let displayHistory = (index) => {
        setSquares(history[index].squares)
        setTurn(history[index].turn)
        setStatus(history[index].status)
        setMovesCounter(history[index].moves)  
    }

    return (
        <div className="game">
        <div className="board">
            <div className="turn"><span>CURRENT TURN</span> : Player - {turn?'X':'O'}</div>
        <div className = 'grid'>
            
        {squares.map((value, index) => <Squares value = {value} index = {index} method = {clickHandler} key = {index}/>
        )}
        </div>
        <div className="game-status">{status}</div>
        </div>
        <div className="history">
            <h3>History</h3>
            <div className="display-history">
                {history.map((value, index) => <History index = {index} method = {displayHistory} key = {index}/>)}
            </div>
        </div>
        </div>
    )
}