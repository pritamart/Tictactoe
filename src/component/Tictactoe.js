import React, { useState, useEffect } from 'react';
import './index.css';

const Tictactoe = () => {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [move, setMove] = useState('X');
  const [winner, setWinner] = useState(null);

  const click = (n) => {
    if (board[n] !== '' || winner) {
      return;
    }

    const updatedBoard = [...board];
    updatedBoard[n] = move;
    setBoard(updatedBoard);

    if (checkWin(updatedBoard)) {
      setWinner(move);
    } else if (checDraw(updatedBoard)) {
      setWinner('Draw');
    } else {
      setMove(move === 'X' ? 'O' : 'X');
    }
  };

  const checDraw = (board) => {
    let count = 0;
    board.forEach((element) => {
      if (element !== '') {
        count++;
      }
    });
    return count >= 9;
  };

  const checkWin = (board) => {
    const conditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const condition of conditions) {
      const [a, b, c] = condition;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    if (winner) {
      setTimeout(() => {
        setBoard(Array(9).fill(''));
        setWinner(null);
      }, 1000); // Delay of 5 seconds before resetting the board
    }
  }, [winner]);

  return (
    <div>
      <h1 className='text-center'>Tic Tac Toe</h1>
      {winner && (
        <div className="winner-message">
          {winner === 'Draw' ? <p>Draw</p> : <p>Winner: {winner}</p>}
        </div>
      )}
      <table>
        <tbody>
          <tr>
            <td onClick={() => click(0)}>{board[0]}</td>
            <td onClick={() => click(1)}>{board[1]}</td>
            <td onClick={() => click(2)}>{board[2]}</td>
          </tr>
          <tr>
            <td onClick={() => click(3)}>{board[3]}</td>
            <td onClick={() => click(4)}>{board[4]}</td>
            <td onClick={() => click(5)}>{board[5]}</td>
          </tr>
          <tr>
            <td onClick={() => click(6)}>{board[6]}</td>
            <td onClick={() => click(7)}>{board[7]}</td>
            <td onClick={() => click(8)}>{board[8]}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Tictactoe;
