import React from 'react';
import axios from 'axios';
import { Link } from '@reach/router';
import Nav from '../components/Nav';
import Header from '../components/Header';
import VoteUpdater from '../components/VoteUpdater';

class AllArticles extends React.Component {
	state = {
		articles: [],
		isLoading: true,
		sortBy: undefined
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
				<Header>
					<Nav sortArticles={this.sortArticles} />
				</Header>

				<div className="all-articles">
					<ul>
						{this.state.articles.map((article) => {
							return (
								
									<li key={article.article_id} className="article-card">
										<Link to={`/topic/${article.topic}`}>
											<p className={`topic-${article.topic}`}>{article.topic}</p>
										</Link>
										<Link to={`/articles/${article.article_id}`}>
											<h2 className="title">{article.title}</h2>
										</Link>
										<div className="votes-and-comments">
											<VoteUpdater votes={article.votes} elementID={article.article_id} element='articles' />
											<p>{article.comment_count} comments</p>
										</div>
									</li>
								
							);
						})}
					</ul>
				</div>
			</main>
		);
	}

}

export default AllArticles;