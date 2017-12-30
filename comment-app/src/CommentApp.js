import React from 'react';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
import wrapWithLoadData from './WrapWithLoadData';
import PropTypes from 'prop-types';

class CommentApp extends React.Component{
    static propTypes = {
        data:PropTypes.any.isRequired,
        saveData:PropTypes.func.isRequired
    }
    constructor(props){
        super(props);
        this.state = {
            // contents:props.data
            // 这里的数据是从浏览器中的缓存中得到的，所以每次要先运行下面注释的代码，让浏览器中存储有东西，才不会出现Cannot read property 'map' of null
            contents: [
                {
                    "username":"xiao",
                    "content":"ghrhr"
                },
                {
                    "username":"xiao",
                    "content":"rhrrhr"
                }
            ]
        }
    }
    // componentWillMount(){
    //     this._loadContents();
    // }
    //从LocalStorage中加载评论列表数据
    //为了能够在刷新浏览器的时候，还是能够显示之前的评论数据
    // _loadContents(){
    //     let contents = localStorage.getItem('contents');
    //     console.log(contents);
    //     if(contents !== 'undefined'){
    //         contents = JSON.parse(contents);
    //         console.log(contents);
    //         this.setState({contents});
    //     }
    // }
    //保存评论列表数据到浏览器中
    //为了能够在刷新浏览器的时候，还是能够显示之前的评论数据
    // _saveContents(contents){
    //     localStorage.setItem('contents',JSON.stringify(contents));
    // }
    handleContentSubmit(data){
        if(!data) return;
        if(!data.username) return alert('请输入用户名');
        if(!data.content) return alert('请输入评论内容');
        const contents = this.state.contents;
        contents.push(data);
        this.setState({
            contents
        });
        this.props.saveData(contents);
    }
    handleDeleteContent(index){
        const contents = this.state.contents;
        contents.splice(index,1);
        this.setState({contents});
        this.props.saveData(contents);
    }
    render(){
        return(
            <div>
                <CommentInput handleSubmit={this.handleContentSubmit.bind(this)}/>
                <CommentList 
                    contentLists={this.state.contents}
                    onDeleteContent={this.handleDeleteContent.bind(this)}
                />
            </div>
        );
    }
}
CommentApp = wrapWithLoadData(CommentApp,'contents');
export default CommentApp;