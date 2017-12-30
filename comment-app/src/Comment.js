import React from 'react';
import PropTypes from 'prop-types';
class Comment extends React.Component{

    static propTypes = {
        content:PropTypes.object.isRequired
    }

    //每个Comment组件实例都会保存一个timeString状态
    //用于该评论显示发布了多久
    constructor(){
        super();
        this.state = {
            timeString:''
        }
    }

    //这个生命周期函数在render方法之前执行，也就是说在render加载前
    componentWillMount(){
        this._updateTimeString();
        //需要设置一个定时器,每5秒调用一下_updateTimeString
        this._timer = setInterval(
            this._updateTimeString.bind(this),
            5000
        )
    }
    componentWillUnmount(){
        clearInterval(this._timer);
    }
    //计算当前时间和评论发布时间的时间差，如果已经发布60秒以上就显示分钟数，否则显示秒
    _updateTimeString(){
        const content = this.props.content;
        const duration = (+Date.now() - content.createdTime)/1000;
        this.setState({
            timeString: duration > 60?
            `${Math.round(duration/60)}分钟前`:
            `${Math.round(Math.max(duration,1))}秒前`
        });
    }
    handleDeleteContent(){
        if(this.props.onDeleteContent){
            this.props.onDeleteContent(this.props.index);
        }
    }
    //当用户点击发布按钮时，会将用户名和评论内容以及时间发送给父组件，
    //然后父组件将内容传递到Comment组件,此时调用componentWillMount()，设置时间戳。
    //但是发布之后，渲染到页面之后，也许这个时间不会有改变，需要设置一个定时器，
    //每5秒调用一个_updateTimeString
    render(){
        return(
            <div>
                <span>{this.props.content.username}</span>:
                <span>{this.props.content.content}</span>
                <br/>
                <span>{this.state.timeString}</span>
                <span onClick={this.handleDeleteContent.bind(this)}>删除</span>
            </div>
        );
    }
}
export default Comment;