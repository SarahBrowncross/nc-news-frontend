import React from 'react';
import axios from 'axios';

class CommentAdder extends React.Component {
	state = {
		username: 'jessjelly',
		body: '',
	};

	handleCommentChange = (event) => {
		const body = event.target.value;
		this.setState(() => {
			return {
				body: body,
			};
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();
		const {
			username,
			body,
		} = this.state;
		axios.post(`https://sarah-nc-news.herokuapp.com/api/articles/${this.props.articleID}/comments`, {username, body})
		.catch((res) => {
			this.props.addComment(
				'',
				 'ERROR: could not post comment'
			)
		})
		this.setState({
			username: 'jessjelly',
			body: '',
		});
		this.props.addComment(
			username,
			body,
		);
		
		
	};

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label htmlFor="comment_body" class="text">
					Comment:
			</label>
				<input
					id="comment_body"
					name="comment_body"
					className="inputField"
					onChange={this.handleCommentChange}
					value={this.state.body}
				/>
				<button type="submit">Submit</button>
			</form>
		)
	}
}

export default CommentAdder