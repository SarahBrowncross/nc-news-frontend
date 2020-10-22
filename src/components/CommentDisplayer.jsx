import React from 'react';
import axios from 'axios';



class CommentDisplayer extends React.Component {
    state = {
        comments: [],
        newComment: null,
    };

    addComment = (username, body, votes) => {
        this.setState(() => {
            return {
                newComment: {
                    username,
                    body,
                    votes
                }
            }
        })
    }


    componentDidMount() {
            axios.get(`https://sarah-nc-news.herokuapp.com/api/articles/${this.props.article_id}/comments`)
            .then((res) => {
                console.log(res, 'data')
                this.setState({
                   comments: res.data.comments,
                });
            })
    };


    render() {
        return (
            <div className="comments">
               {this.state.newComment &&
                    <div className="comment-card">
                        <div className='comments-header'>
                            <p>{this.state.newComment.username}</p>
                            <p>Votes: {0}</p>
                        </div>
                        <p>{this.state.newComment.body}</p>
                    </div>}
                {this.state.comments.map((comment) => {
                    return (
                        <div className="comment-card">
                            <div className='comments-header'>
                                <p>{comment.author}</p>
                                <p>Votes: {comment.votes}</p>
                            </div>
                             <p>{comment.body}</p>
                        </div>
                    );
                })}
            </div>
        );
    }
}


export default CommentDisplayer;