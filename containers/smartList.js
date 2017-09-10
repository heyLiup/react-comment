import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import CommentList from '../components/CommentList'
import { initComments, deleteComment } from '../reducers/comments'


//把我们之前写的木偶组件导入进来  提前定义好的action样本导入
//开始写智能组件，来给木偶组件传输数据
class CommentListContainer extends Component {
	static propTypes = {
		comments: PropTypes.array,
		initComments: PropTypes.func,
		onDeleteComment: PropTypes.func
	}

	//组件挂载时
	componentWillMount(){
		//初始化comments
		this._loadComments();
	}
	_loadComments(){
		let comments=localStorage.getItem('comments');
		comments=comments?JSON.parse(comments):[]
		 // this.props.initComments 是 connect 传进来的
	    // 可以帮我们把数据初始化到 state 里面去
	    console.log(comments+"smartList");
	    this.props.initComments(comments)
	}

	//删除
	handleDeleteComment(index){
		const {comments} = this.props;
		// props 是不能变的，所以这里新建一个删除了特定下标的评论列表
		const newComments=[
			...comments.slice(0,index),
			...comments.slice(index+1)
		]
		localStorage.setItem('comments',JSON.stringify(newComments));
		if (this.props.onDeleteComment) {
	      // this.props.onDeleteComment 是 connect 传进来的
	      // 会 dispatch 一个 action 去删除评论
	      console.log(index);
	      this.props.onDeleteComment(index)
	    }

	}

//一开始传给 CommentListContainer 的 props.comments
// 其实是 reducer 里面初始化的空的 comments 数组，因为还没有从 localStorage 里面取数据。
	render(){
		return (

			<CommentList comments={this.props.comments}
				 onDelete={this.handleDeleteComment.bind(this)} />
		)
	}
}

//写两个方法

// 通过给 connect 函数传入 mapStateToProps 来告诉它如何获取、整合状态
const mapStateToProps=(state)=>{
	return {
		comments:state.comments
	}
}

//传入另外一个参数来告诉它我们的组件需要如何触发 dispatch
const mapDispatchToProps =(dispatch)=>{
	return{
		initComments:(comments)=>{
			dispatch(initComments(comments))
		},
		onDeleteComment:(commentIndex)=>{
			dispatch(deleteComment(commentIndex))
		}
	}
}

// 将 CommentListContainer connect 到 store
// 会把 comments、initComments、onDeleteComment 传给 CommentListContainer
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CommentListContainer)
