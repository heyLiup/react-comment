//评论功能的组件之间共享的状态只有 comments

// action types  初始化  新增 删除
const INIT_COMMENTS = 'INIT_COMMENTS'
const ADD_COMMENT = 'ADD_COMMENT'
const DELETE_COMMENT = 'DELETE_COMMENT'

export default function(state,action){
	if(!state){
		state={comments:[]}
	}
	switch(action.type){
		case INIT_COMMENTS:
			//初始化
			console.log(action.comments+"初始数据");
			return {comments:action.comments}
		break;
		case ADD_COMMENT:
			console.log(action.comment+"添加数据");
			return {
				comments:[...state.comments,action.comment]
			}
		break;
		case DELETE_COMMENT:
			console.log(action.comments+"删除数据");
			return {
				comments:[
					...state.comments.slice(0,action.commentIndex),
					...state.comments.slice(action.commentIndex+1)
				]

			}
		break;
		default:return state;
	}
}


// action creators
//所谓 action creators 其实就是返回 action 的函数，这样我们 dispatch 的时候只需要传入数据就可以了
export const initComments = (comments) => {
  return { type: INIT_COMMENTS, comments }
}

export const addComment = (comment) => {
  return { type: ADD_COMMENT, comment }
}

export const deleteComment = (commentIndex) => {
  return { type: DELETE_COMMENT, commentIndex }
}