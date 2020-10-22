import React from 'react';
import CommentAdder from '../components/CommentAdder';
import ArticleDisplayer from '../components/ArticleDisplayer';
import CommentDisplayer from '../components/CommentDisplayer';


class SingleArticle extends React.Component {
    state = {
        article: {},
        isLoading: true,
        error: null,
        comments: [],
        newComment: null,
        commentCount: 0
    };

    render() {
        return (
            <main>
                <ArticleDisplayer article_id={this.props.article_id}/>
                <CommentAdder 
                addComment={this.props.addComment} 
                articleID={this.props.article_id} 
                updateCount={this.props.updateCount}
                />
                <CommentDisplayer article_id={this.props.article_id}/>
                

                
            </main>
        );
    }
}


export default SingleArticle;