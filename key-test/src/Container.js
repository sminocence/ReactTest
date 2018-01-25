import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import LifeCycle from './LifeCycle';

class Container extends Component{
    constructor(props){
        super(props);
        this.state = {
            num: Math.random()*100
        };
    }

    propsChange(){
        this.setState({
            num: Math.random()*10
        });
    }

    setLifeCycleState(){
        this.refs.rLifeCycle.setTheState();
    }

    forceLifeCycleUpdate(){
        this.refs.rLifeCycle.forceItUpdate();
    }

    unmountLifeCycle(){
        //这里卸载父组件也会导致卸载子组件
        ReactDOM.unmountComponentAtNode(document.getElementById("root"));
    }

    parentForceUpdate(){
        this.forceUpdate();
    }

    render(){
        return (
            <div>
                <a href="javascript:;" className="but" onClick={this.propsChange.bind(this)}>propsChange</a>
                <a href="javascript:;" className="but" onClick={this.setLifeCycleState.bind(this)}>setState</a>
                <a href="javascript:;" className="but" onClick={this.forceLifeCycleUpdate.bind(this)}>forceUpdate</a>
                <a href="javascript:;" className="but" onClick={this.unmountLifeCycle.bind(this)}>unmount</a>
                <a href="javascript:;" className="but" onClick={this.parentForceUpdate.bind(this)}>parentForceUpdateWithoutChange</a>
                <LifeCycle ref="rLifeCycle" num={this.state.num} />
            </div>
        )
    }
}

export default Container;