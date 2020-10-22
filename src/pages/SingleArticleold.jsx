import React from 'react';
import axios from 'axios';
import CommentAdder from '../components/CommentAdder';


class SingleArticle extends React.Component {
    state = {
        article: {},
        isLoading: true,
        error: null,
        comments: [],
		newComment: null,
		username: 'jessjelly'
	};
	
	deleteComment = (commentId) => {
		this.setState((prevState) => {
			const updatedComments = prevState.comments.filter(comment => comment.comment_id !== commentId)
			return {
				comments: updatedComments
			}
		})
		axios.delete(`https://sarah-nc-news.herokuapp.com/api/comments/${commentId}`)
	}

    addComment = (newComment) => {
        this.setState((prevState) => {
			const updatedComments = [newComment, ...prevState.comments]
			return {
                article: {
                    ...prevState.article,
                    comment_count: +prevState.article.comment_count + 1
                },
                comments: updatedComments
            }
        })
    }


    componentDidMount() {
        return Promise.all([
            axios.get(`https://sarah-nc-news.herokuapp.com/api/articles/${this.props.article_id}`),
            axios.get(`https://sarah-nc-news.herokuapp.com/api/articles/${this.props.article_id}/comments`)
        ])
            .then((res) => {
                console.log(res, 'data')
                this.setState({
                    article: res[0].data.article,
                    comments: res[1].data.comments,
                    isLoading: false,
                });
            })
            .catch((res) => {
                this.setState ({
                    error: {
                        status: res.status,
                        message: res.data.msg,
                    }
                })
            })
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
                <CommentAdder addComment={this.addComment} articleID={this.props.article_id} />
                <p>Comments: {this.state.article.comment_count}</p>

                {/* /*{this.state.newComment &&
                    <div className="comment-card">
                        <div className='comments-header'>
                            <p>{this.state.newComment.username}</p>
                            <p>Votes: {0}</p>
                        </div>
                        <p>{this.state.newComment.body}</p>
						<button onClick={() => {this.deleteComment(this.state.newComment.comment_id)}
							 }>delete</button>
                    </div>}*/ }
                {this.state.comments.map((comment) => {
                    return (
                        <div className="comment-card">
                            <div className='comments-header'>
                                <p>{comment.author}</p>
                                <p>Votes: {comment.votes}</p>
                            </div>
                             <p>{comment.body}</p>
							 {(comment.author === this.state.username) && 
							 <button onClick={() => {this.deleteComment(comment.comment_id)}
							 }>delete</button>
							 }
                        </div>
                    );
                })}
            </div>
        );
    }
}


export default SingleArticle;