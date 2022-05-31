import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


function Square(props) {
  return (
    <button className="square" onClick={props.play}>
      {props.value}
    </button>
  );
}

function Board(props) {
  const renderSq = (i) => (
    <Square
      value={props.squares[i]}
      play={() => props.play(i)}
    />
  );
  return (
    <div>
      <div className="board-row">
        {renderSq(0)}
        {renderSq(1)}
        {renderSq(2)}
      </div>
      <div className="board-row">
        {renderSq(3)}
        {renderSq(4)}
        {renderSq(5)}
      </div>
      <div className="board-row">
        {renderSq(6)}
        {renderSq(7)}
        {renderSq(8)}
      </div>
    </div>
  );
}

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  // 回调函数，改变状态
  onPlayStep(i) {
    const squares = this.state.squares.slice();
    if (this.calculateWinner(squares) || squares[i]) {
      return
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares,
      xIsNext: !this.state.xIsNext,
    })
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }

  render() {
    const winner = this.calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }
    return (
      <div className="game">
        <div className="game-board">
          {/*<div className="status">{status}</div>*/}
          <Board
            squares={this.state.squares}
            play={(i) => this.onPlayStep(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game/>);

