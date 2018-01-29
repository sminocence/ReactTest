### 遇到的问题

CommentApp.js中的
```
constructor(props){
        super(props);
        this.state = {
            contents:props.data
	    解决方法：
            // 这里的数据是从浏览器中的缓存中得到的，所以每次要先运行下面注释的代码，让浏览器中存储有东西，才不会出现Cannot read property 'map' of null
            // contents: [
            //     {
            //         "username":"xiao",
            //         "content":"ghrhr"
            //     },
            //     {
            //         "username":"xiao",
            //         "content":"rhrrhr"
            //     }
            // ]
        }
    }
```
