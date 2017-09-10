import React from 'react'
import ReactDOM from 'react-dom'



//将用户输入的信息动态显示在受控组件上，点提交的额时候传递给父组件
class CommentInput extends React.Component{
	constructor(props){
		super(props);
		this.state={
			username:props.username,
			comment:""
		};
		this.setUsername=this.setUsername.bind(this);
		this.setComment=this.setComment.bind(this);
	}
	setUsername(e){
		this.setState({username:e.target.value})
	}
	setComment(e){
		this.setState({comment:e.target.value})
	}
	HandleSubmit(){
		if(this.props.onSubmit){
			//解构
			const {username,comment}=this.state;
			this.props.onSubmit({
				username,
				comment,
				createTime:+new Date()
			});
			//评论框清空
			this.setState({comment:""});
		}
	}
	//改成木偶组件就不能去拿，要通过props去请求
	//组件加载时从localstrage里拿用户名
	// componentWillMount () {
	//     this._loadUsername()
	// }

	//  _loadUsername () {
	//     const username = this.state.username;
	//     if (username) {
	//       this.setState({ username })
	//    }
	// }

	//用户输入完用户名后自动保存
	handleUsernameBlur(event){
		  if (this.props.onUserNameInputBlur) {
		      this.props.onUserNameInputBlur(event.target.value)
		    }
	}
	//组件挂载完毕文本框自动聚焦
	componentDidMount (){
		this.textarea.focus();
	}
	render(){
		return(
			<div className="CommentInput">
				<h2>[]==-[]? 谈谈你的想法</h2>
				<div>
					<label>用户名:</label>
					<input type="text" 
						onBlur={this.handleUsernameBlur.bind(this)}
						value={this.state.username} 
						onChange={this.setUsername}/>
				</div>
				<div>
					<label>评论内容:</label>
					<textarea value={this.state.comment} 
						onChange={this.setComment}  ref={(textarea) => this.textarea = textarea}>
					</textarea>
				</div>
				<div>
					<button onClick={this.HandleSubmit.bind(this)}>发布</button>
					
				</div>
			</div>
		);
	}
}
export default CommentInput