import React from 'react';
import axios from 'axios';
import { Link } from '@reach/router';
import Nav from '../components/Nav';

class AllArticles extends React.Component {
	state = {
		articles: [],
		isLoading: true,
		sortBy: ''
	};

	componentDidMount() {
		axios.get('https://sarah-nc-news.herokuapp.com/api/articles', { params: { topic: this.props.topic_slug } })
			.then((res) => {
				this.setState({
					articles: res.data.articles,
					isLoading: false,
				});
			});
	};

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.topic_slug !== this.props.topic_slug || prevState.sortBy !== this.state.sortBy) {
			if (this.props.topic_slug === 'all') {
				axios.get(`https://sarah-nc-news.herokuapp.com/api/articles`, { params: { sort_by: this.state.sortBy } })
					.then((res) => {
						this.setState({
							articles: res.data.articles
						})
					})
			}
			else {
				axios.get(`https://sarah-nc-news.herokuapp.com/api/articles`, { params: { topic: this.props.topic_slug, sort_by: this.state.sortBy } })
					.then((res) => {
						this.setState({
							articles: res.data.articles
						})
					})
			}
		}
	}

	sortArticles = (sortBy) => {
		this.setState(() => {
			return {
				sortBy: sortBy
			}
		})
	}

	render() {
		if (this.state.isLoading) return <p>Articles loading...</p>
		return (
			<main>
			<Nav sortArticles={this.sortArticles} />
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
			</main>
		);
	}

}

export default AllArticles;