import React from 'react';
import PropTypes from 'prop-types';
import wrapWithLoadData from './WrapWithLoadData';
class CommentInput extends React.Component{
    //给参数添加组件参数验证
    static propTypes = {
        submit:PropTypes.func,
        data:PropTypes.any,
        saveData:PropTypes.func.isRequired
    }
    constructor(props){
        super(props);
        this.state={
            username:props.data,
            content:''
        }
    }
    //这个生命周期函数在组件挂载完（render方法）之后执行
    componentDidMount(){
        this.textarea.focus();
    }
    //这个生命周期函数在render方法执行之后再执行，
    //不依赖DOM操作的组件启动的操作都可以放在componentWillMount中进行
    // componentWillMount(){
        // this._loadUsername();
    // }
    //将用户名持久化，用户名保存在LocalStorage
    // _saveUsername(username){
    //     localStorage.setItem('username',username);
    // }
    //加载浏览器中LocalStorage中的用户名
    //组件的私有方法都用_开头
    // _loadUsername(){
    //     const username = localStorage.getItem('username');
    //     console.log(username);
    //     if(username){
    //         this.setState({
    //             username
    //         })
    //     }
    // }
    handleInputChange(event){
        this.setState({
            username:event.target.value
        })
    }
    handleTextChange(event){
        this.setState({
            content:event.target.value
        })
    }
    handleUsernameBlur(event){
        // this._saveUsername(event.target.value);
        this.props.saveData(event.target.value);
    }
    submit(){
        if(this.props.handleSubmit){
            this.props.handleSubmit({
                username:this.state.username,
                content:this.state.content,
                createdTime: +new Date()
            });
        }
        this.setState({content:''});
    }
    render(){
        return(
            <div>
                <div>
                        用户名：<input 
                         onBlur={this.handleUsernameBlur.bind(this)}
                         type="text" 
                         value={this.state.username}
                         onChange={this.handleInputChange.bind(this)}
                        />
                </div>
                <div>
                         评论区：<textarea 
                         ref={(textarea) => this.textarea=textarea}
                         value={this.state.content}
                         onChange={this.handleTextChange.bind(this)}
                        />
                </div>
                <button onClick={this.submit.bind(this)}>
                    发布
                </button>
            </div>
        );
    }
}
CommentInput = wrapWithLoadData(CommentInput,'username');
export default CommentInput;