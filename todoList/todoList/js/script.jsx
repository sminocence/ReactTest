var TodoBox = React.createClass({
    getInitialState:function(){
        return {
            data:[
                {"id":"0001","task":"吃饭","complete":"false"},
                {"id":"0002","task":"睡觉","complete":"true"},
                {"id":"0003","task":"做作业","complete":"false"}
            ]
        };
    },

    //根据id删除一项任务，都是通过传入的id，
    //将state状态中的data进行遍历，筛选后删除，重置state的data
    handleTaskDelete:function(taskId){
        var data = this.state.data;
        data = data.filter(function(task){
            return task.id !== taskId;
        });
        this.setState({data});
    },

    //切换一项任务的完成状态
    handleToggleComplete:function(taskId){
        var data = this.state.data;
        for(var i in data){
            if(data[i].id === taskId){
                data[i].complete = data[i].complete === "true"?"false":"true";
                break;
            }
        }
        this.setState({data});
    },

    //给新增的任务一个随机的id
    generateId:function(){
        return Math.floor(Math.random()*9999)+1000;
    },
    //新增一项任务
    handleSubmit:function(task){
        var data = this.state.data;
        var id = this.generateId();
        var complete = "false";
        data = data.concat([{"id":id,"task":task,"complete":complete}]);
        this.setState({data});
    },

    render:function(){
        //统计要完成的及已经完成的任务数
        var statistics = {
            todoCount:this.state.data.length||0,
            todoComplete:this.state.data.filter(function(item){
                return item.complete === "true";
            }).length
        };

        return(
            <div className="well">
                <h1 className="text-center">React Todo</h1>
                <TodoList 
                    data={this.state.data}
                    deleteTask={this.handleTaskDelete}
                    toggleComplete={this.handleToggleComplete}
                    todoCount={statistics.todoCount}
                    todoComplete={statistics.todoComplete}
                />
                <TodoForm submitTask={this.handleSubmit} />
            </div>
        )

    }
});

var TodoList = React.createClass({
    render:function(){
        var taskList = this.props.data.map(function(listItem){
            return(
                <TodoItem
                    taskId={listItem.id}
                    key={listItem.id}
                    task={listItem.task}
                    complete={listItem.complete}
                    deleteTask={this.props.deleteTask}
                    toggleComplete={this.props.toggleComplete}
                />
            )
        },this);

        return(
            <ul className="list-group">
                {taskList}
                <TodoFooter 
                    todoCount={this.props.todoCount} 
                    todoComplete={this.props.todoComplete}
                />
            </ul>
        );
    }
});

var TodoItem = React.createClass({
    toggleComplete:function(){
        this.props.toggleComplete(this.props.taskId);
    },
    deleteTask:function(){
        this.props.deleteTask(this.props.taskId);
    },

    //鼠标滑入显示删除按钮
    handleMouseOver:function(){
        ReactDOM.findDOMNode(this.refs.deleteBn).style.display = "inline";
    },

    handleMouseOut:function(){
        ReactDOM.findDOMNode(this.refs.deleteBn).style.display = "none";
    },

    render:function(){
        var task = this.props.task;
        var classes = "list-group-item";
        var itemChecked;
        if(this.props.complete === "true"){
            task = <s>{task}</s>
            itemChecked=true;
            classes+=" list-group-item-success";
        }else{
            itemChecked=false;
        }

        return(
            <li className={classes} onMouseOver={this.handleMouseOver}
                onMouseOut = {this.handleMouseOut}>
                <input type="checkbox" checked={itemChecked} 
                    onChange={this.toggleComplete} className="pull-left"
                    />
                    {task}
                <div className="pull-right">
                    <button type="button" className="btn btn-xs close"
                        onClick={this.deleteTask} ref="deleteBn">
                        删除
                    </button>
                </div>
            </li>
        )
    }
});

var TodoFooter = React.createClass({
    render:function(){
        return(
            <li className="list-group-item">{this.props.todoComplete}
                已完成/{this.props.todoCount}总数</li>
        );
    }
});

var TodoForm = React.createClass({
    submitTask:function(e){
        e.preventDefault();
        var task = ReactDOM.findDOMNode(this.refs.task).value.trim();
        if(!task){
            return;
        }
        this.props.submitTask(task);
        ReactDOM.findDOMNode(this.refs.task).value = "";
    },
    render:function(){
        return(
            <div>
                <hr/>
                <form className="form-horizontal" onSubmit={this.submitTask}>
                    <div className="form-group">
                        <label for="task" className="col-md-2 control-label">Task</label>
                        <div className="col-md-10">
                            <input type="text" id="task" ref="task" 
                                placeholder="你想做点什么" className="form-control" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 text-right">
                            <input type="submit" value="Save Task" 
                            className="btn btn-primary"/>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
});
ReactDOM.render(
    <TodoBox />,
    document.getElementById('todoBox')
)