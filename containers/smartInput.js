import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import CommentInput from '../components/CommentInput'
import { addComment } from '../reducers/comments'

class smartInput extends Component{
	constructor(props){
		super(props);
		this.state={
			username:""
		}
	}
	componentWillMount(){
		this._getState()
	}
	//初始化获取数据
	_getState(){

		//拿数据
		let name=localStorage.getItem('username')
		if(name){
			this.setState({username:JSON.parse(name)})
		}		
	}
	//用户提交
	handleSubmit(comment){
		console.log(comment);
		 // 评论数据的验证
	    if (!comment) return
	    if (!comment.username) return alert('请输入用户名')
	    if (!comment.comment) return alert('请输入评论内容')

	    const {comments}=this.props	
		const newComments=[...comments,comment]
		localStorage.setItem('comments',JSON.stringify(newComments));
		//向mapDispatchToProps 发请求
		if(this.props.HandleSubmit){
			this.props.HandleSubmit(comment);
		}
	}
	//用户输入完用户名后自动保存
	handlePreSubmit(name){
		localStorage.setItem('username',JSON.stringify(name));
	}
	render(){
		return(
			<CommentInput username={this.state.username} onSubmit={this.handleSubmit.bind(this)}
			onUserNameInputBlur={this.handlePreSubmit.bind(this)}/>
		)
	}
}
const mapStateToProps=(state)=>{
	return{
		comments:state.comments
	}
}
const mapDispatchToProps=(dispatch)=>{
	return {
		HandleSubmit:(comment)=>{
			console.log("新增的"+comment);
			dispatch(addComment(comment))
		}
	}
}
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(smartInput)