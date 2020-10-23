import React from 'react';
import axios from 'axios';
import CommentAdder from '../components/CommentAdder';
import PictureDisplayer from '../components/PictureDisplayer';
import Header from '../components/Header'
import { Link } from '@reach/router';
import VoteUpdater from '../components/VoteUpdater';


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
                this.setState({
                    article: res[0].data.article,
                    comments: res[1].data.comments,
                    isLoading: false,
                });
            })
            .catch((res) => {
                this.setState({
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
            <main className="article-main">
                <Header small />
                <PictureDisplayer topic={this.state.article.topic} />
                <div className="article">
                    <Link to={`/topic/${this.state.article.topic}`}>
                        <p className={`article-topic-${this.state.article.topic}`}>{this.state.article.topic}</p>
                    </Link>
                    <h1>{this.state.article.title}</h1>
                    <div className='votes-and-comments'>
                        <p className="author">By {this.state.article.author}</p>
                        <VoteUpdater votes={this.state.article.votes} elementID={this.props.article_id} element='articles'/>
                    </div>
                    <p className='article-body'>{this.state.article.body}</p>
                    <CommentAdder addComment={this.addComment} articleID={this.props.article_id} />
                    <p>Comments: {this.state.article.comment_count}</p>
                    {this.state.comments.map((comment) => {
                        return (
                            <div key={comment.comment_id} className="comment-card">
                                <div className='comments-header'>
                                    <p>{comment.author}</p>
                                    <VoteUpdater votes={comment.votes} elementID={comment.comment_id} element='comments'/>
                                </div>
                                <p>{comment.body}</p>
                                {(comment.author === this.state.username) &&
                                    <button onClick={() => { this.deleteComment(comment.comment_id) }
                                    }>delete</button>
                                }
                            </div>
                        );
                    })}
                </div>
            </main>
        );
    }
}


export default SingleArticle;