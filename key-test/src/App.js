import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

class App extends Component {

  //constructor构造函数在创建组件的时候调用一次
  constructor(props){
    super(props);
    this.state = {
      user:[{id:1,name:'zhangsan'},{id:2,name:'lisi'}]
    }
    this.handleClickAdd = this.handleClickAdd.bind(this);
    console.log("constructor");
  }

  componentWillMount(){
    //在组件挂载之前调用一次，如果在这个函数里面调用setState，本次的render函数可以看到更新后的state，并且只渲染一次
    console.log("componentWillMount");
  }

  componentDidMount(){
    //在组件挂载之后调用一次，这个时候，子组件也都挂载好了，可以在这里使用refs
    console.log("componentDidMount");
  }

  handleClickAdd(){
    let arr = [],max;
    for(let i=0,len=this.state.user.length;i<len;i++){
      arr.push(this.state.user[i].id);
    }
    for(let j=0,leng=arr.length;j<leng;j++){
      max = arr[0];
      if(arr[j] > arr[0]){
        max = arr[j];
      }
    }
    max++;
    let stu = {
      id:max,
      name:max
    } 
    this.state.user.push(stu);
    this.setState(prevState => ({
      user: this.state.user
    }));
  }

  render() {
    return (
      <div className="App">
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <ul>
          {this.state.user.map(u => 
              <li key={u.id}>index{u.id},{u.name}</li>
          )
          }
        </ul>
        <button onClick={this.handleClickAdd}>add</button>
      </div>
    );
  }
}

export default App;
