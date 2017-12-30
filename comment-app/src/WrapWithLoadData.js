import React,{Component} from 'react';

export default (WrappedComponent,name) => {
    class LocalStorageActions extends Component{
        constructor(){
            super();
            this.state = {
                data:null
            }
        }

        // getInitialState(){
        //     return {
        //         data: []
        //     }
        // }

        componentWillMount(){
            let data = localStorage.getItem(name);
            // console.log(data);
            try{
                //尝试将其解析成JSON对象
                this.setState({
                    data:JSON.parse(data)
                });
            }catch(e){
                //如果出错就当普通字符串读取
                this.setState({data});
            }
        }

        saveData(data){
            try{
                //尝试将其解析成JSON 字符串
                localStorage.setItem(name,JSON.stringify(data));
            }catch(e){
                localStorage.setItem(name,`${data}`);
            }
            
        }
        render(){
            return(
                <WrappedComponent 
                    data={this.state.data}
                    saveData={this.saveData.bind(this)}
                    {...this.props} />
            )
        }
    }
    return LocalStorageActions;
}