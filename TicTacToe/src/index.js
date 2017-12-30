import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//用来渲染每一个小方格
function Square(props){
    return (
      <button 
          className="square" 
          onClick={props.onClick}
      >
        {props.value}
      </button>
    );
}

//用来渲染三行三列的正方形格子
class Board extends React.Component {
  
  renderSquare(i) {
    return <Square 
              value={this.props.squares[i]}
              onClick={() => this.props.onClick(i)}
              />;
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(){
    super();
    this.state={
      history:[{
        squares:Array(9).fill(null),
      }],
      stepNumber:0,
      xIsNext:true,
    };
  }
  handleClick(i){
      const history = this.state.history.slice(0,this.state.stepNumber+1);
      const current = history[history.length-1];
      const squares = current.squares.slice();
      if(calculateWinner(squares)|| squares[i]){
        return;
      }
      squares[i] = this.state.xIsNext?'X':'O';
      this.setState({
        history:history.concat([{
          squares:squares
        }]),
        stepNumber:history.length,
        xIsNext:!this.state.xIsNext,
      });
      //当事件处理函数触发棋盘父组件的状态数据改变时，格子组件会自动重新渲染
  }
  
  jumpTo(step){
    this.setState({
      stepNumber:step,
      xIsNext:(step%2)?false:true
    })
  }
  render() {
    const history= this.state.history.slice(0,this.state.stepNumber+1);
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Move #' + move :
        'Game start';
      return (
        <li key={move}>
          <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      );
    });

    let status;
    if(winner){
      status='Winner:'+winner;
    }else{
      status='Next Player:' + (this.state.xIsNext?'X':'O');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board 
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
function calculateWinner(squares) {
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
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


function NameBox(name){
  return {fontWeight:'bold',labelContent:name};
}

function FancyUserBox(user){
  return{
    borderStyle:'1px solid blue',
    childContent:[
      'name:',
      NameBox(user.firstName+' '+user.lastName)
    ]
  };
}

function FancyBox(children){
  return {
    borderStyle:'1px solid blue',
    children:children
  }
}

function UserBox(user){
  return FancyBox([
      'Name:',
      NameBox(user.firstName+' '+user.lastName)
    ])
}