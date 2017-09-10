import React, { Component } from 'react'
import CommentInput from './smartInput'
import CommentList from './smartList'

export default class CommentApp extends Component{
	render(){
		return (
			<div>
				<CommentInput/>
				<CommentList/>
			</div>
		)
	}
}