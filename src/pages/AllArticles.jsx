import React from 'react';
import axios from 'axios';
import { Link } from '@reach/router';

class AllArticles extends React.Component {
	state = {
		articles: [],
		isLoading: true
	};

	componentDidMount() {
		console.log(this.props, 'props')
		axios.get('https://sarah-nc-news.herokuapp.com/api/articles', {params : {topic: this.props.topic}})
			.then((res) => {
				console.log(res.data.articles, 'articles')
				this.setState({
					articles: res.data.articles,
					isLoading: false,
				});
			});
	};

	render() {
		if (this.state.isLoading) return <p>Articles loading...</p>
		return (
			<div>
				<ul>
					{this.state.articles.map((article) => {
						return (
							<div className="article-card">
							<li>
								<p className="topic">{article.topic}</p>
								<Link to={`/articles/${article.article_id}`}>
									<h2 className="title">{article.title}</h2>
								</Link>
								<div className="votes-and-comments">
									<p>{article.votes} votes</p>
									<p>{article.comment_count} comments</p>
								</div>
							</li>
							</div>
						);
					})}
				</ul>
			</div>
		);
	}

}

export default AllArticles;