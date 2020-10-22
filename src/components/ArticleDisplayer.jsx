import React from 'react';
import axios from 'axios';

class ArticleDisplayer extends React.Component {
	state = {
		article: {},
		isLoading: true,
		error: null,
	};

	updateCount = () => {
		this.setState((prevState) => {
			return {
				article: {
					...prevState.article,
					comment_count: +prevState.article.comment_count + 1
				}
			}
		})
	}

	componentDidMount() {
		axios.get(`https://sarah-nc-news.herokuapp.com/api/articles/${this.props.article_id}`)
			.then((res) => {
				console.log(res, 'data')
				this.setState({
					article: res.data.article,
					isLoading: false,
				});
			})
			/*.catch((res) => {
				this.setState({
					error: {
						status: res.status,
						message: res.data.msg,
					}
				})
			})*/
	};


	render() {
		if (this.state.isLoading) return <p>Article loading...</p>
		return (
			<div className="article">
				<p>{this.state.article.topic}</p>
				<h1>{this.state.article.title}</h1>
				<div className='votes-and-comments'>
					<h2>By {this.state.article.author}</h2>
					<p>Votes: {this.state.article.votes}</p>
				</div>
				<p>{this.state.article.body}</p>
				<p>Comments: {this.state.article.comment_count}</p>



			</div>
		);
	}
}


export default ArticleDisplayer;