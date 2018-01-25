import React,{ Component } from 'react';

class LifeCycle extends Component{
    constructor(props){
        super(props);
        alert("Initial render");
        alert("constructor");
        this.state = {
            str:"hello"
        }
    }

    componentWillMount(){
        alert("componentWillMount");
    }

    componentDidMount(){
        alert("componentDidMount");
    }

    componentWillReceiveProps(nextProps){
        alert("componentWillRecieveProps");
    }

    shouldComponentUpdate(){
        alert("shouldComponentUpdate");
        return true;//这里假定它默认返回true
    }

    componentWillUpdate(){
        alert("componentWillUpdate");
    }

    componentDidUpdate(){
        alert("componentDidUpdate");
    }

    componentWillUnmount(){
        alert("componentWillUnmount");
    }

    setTheState(){
        let s = "hello";
        if(this.state.str === s){
            s = "HELLO";
        }

        this.setState({
            str:s
        });
    }

    forceItUpdate(){
        this.forceUpdate();
    }

    render(){
        alert("render");
        return (
            <div>
                <span>"Props:"<h2>{parseInt(this.props.num)}</h2></span>
                <span>"State:"<h2>{this.state.str}</h2></span>
            </div>
        );
    }
}

export default LifeCycle;

