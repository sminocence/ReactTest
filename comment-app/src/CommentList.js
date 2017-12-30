import React from 'react';
import Comment from './Comment';
import PropTypes from 'prop-types';

class CommentList extends React.Component{

    static propTypes = {
        contentLists:PropTypes.array,
        onDeleteContent:PropTypes.func
    };

    static defaultProps = {
        contentLists:[]
    }

    handleDeleteContent(index){
        if(this.props.onDeleteContent){
            this.props.onDeleteContent(index);
        }
    }
    render(){
        console.log(this.props.contentLists);
        return(
            <div>
                {
                    this.props.contentLists.map((content,i) => 
                    <Comment 
                        content={content} 
                        key={i}
                        index={i}
                        onDeleteContent={this.handleDeleteContent.bind(this)} />
                    )}
            </div>
        )
    }
}
export default CommentList;