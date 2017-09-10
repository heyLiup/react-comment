// CommentList.js
import React from 'react'
import ReactDOM from 'react-dom'


//每一条评论
class Comment extends React.Component{
    constructor(props){
        super(props);
        this.state={
            timeString:"",
            key:this.props.Key
        };
        this._updateTimeString=this._updateTimeString.bind(this);
        this._delComment=this._delComment.bind(this);
    }
    componentWillMount(){
        this._updateTimeString();
        //动态刷新评论时间
        var that=this;
        this._timer=setInterval(function(){
             that._updateTimeString();
             // console.log( that.state.timeString);
             
        },5000)

    }
    //在评论被删除后销毁组件
    componentWillUnmount (){
        clearInterval(this._timer);
    }
    _updateTimeString(){
        const comment=this.props.Comments;
        const duration=(+Date.now()-comment.createTime)/1000;
        this.setState({
            timeString:duration>60?
               ( duration/60/60>1? `${Math.round(duration / 60/60)} 小时前`:
               `${Math.round(duration / 60)} 分钟前`)
               : Math.round(Math.max(duration, 1))+ "秒前"
        })
    }
    //删除评论
    _delComment(key){  
        if(this.props.onDle){
            this.props.onDle(this.state.key)
        }
    }
    render(){
        return (
            <div key={this.state.key}  className="comment">
                <label>{this.props.Comments.username}:</label>
                <span>{this.props.Comments.comment}</span>
                <em>{this.state.timeString}</em>
                <a href="#" onClick={this._delComment.bind(this)}>删除</a>
            </div>  
        )
    }
}

//评论列表
 class CommentList extends React.Component{
    // constructor(props){
    //     super(props);

    // }
    //设置默认传入的值
    static defaultProps={
        comments:[]
    }
    handleDel(index){
        if(this.props.onDelete){
            this.props.onDelete(index)
        }
    }
    render() {
        return (
          

            //遍历所有的commen 渲染数据
            //大括号执行js语句
            //循环后要返回动态生成的div
            //Key 大写
            <div className="CommentList">
                 {
                    this.props.comments.map((v,i)=><Comment Key={i} Comments={v} onDle={this.handleDel.bind(this)}/>)
                 }
            </div>
            //这样就不要了return?  因为去掉了大括号? 
        )
      }
    }

export default CommentList