var ToggleBox = React.createClass({
    getInitialState:function(){
        return {
            showed:true
        }
    },

    hide:function(){
        this.setState({
            showed:false
        });
    },

    show:function(){
        this.setState({
            showed:true
        });
    },
    render:function(){
        return(
            <div>
                <ContentShow show={this.state.showed}/>
                <Toggle hide={this.hide} show={this.show}/>
            </div>
        );
    } 
})
var ContentShow = React.createClass({
    var show = this.props.show;
    if(show === false){
        ReactDOM.findDOMNode(this.refs.pp).style.display="none";
    }else{
        ReactDOM.findDOMNode(this.refs.pp).style.display="block";
    }
    render:function(){
        return (
            <p ref="pp">hello</p>
        );
    }
});
var Toggle = React.createClass({

    hide:function(){
        this.props.hide;
    },

    show:function(){
        this.props.show;
    },

    render:function(){
        return(
            <div>
                <input type="button" value="隐藏" onClick={this.hide} />
                <input type="button" value="显示" onClick={this.show} />
            </div>
        );
    }
});

ReactDOM.render(
    <ToggleBox />,
    document.getElementById('root')
    )

