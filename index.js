import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import CommentApp from './containers/smartApp'
import commentsReducer from './reducers/comments'

const store=createStore(commentsReducer);
ReactDOM.render(
	<Provider store={store}>
		<CommentApp/>
	</Provider>,	
	document.getElementById('app')
)