import React from 'react';
import axios from 'axios';


class SingleArticle extends React.Component {
    state = {
        article: {},
        isLoading: true
    };


    componentDidMount() {
        axios.get(`https://sarah-nc-news.herokuapp.com/api/articles/${this.props.article_id}`)
        .then((res) => {
			console.log(res.data.article)
            this.setState({
                article: res.data.article,
                isLoading: false,
            });
        });
	};
	
	
    render() {
        if (this.state.isLoading) return <p>Article loading...</p>
		return(
            <div>
                <h1>{this.state.article.title}</h1>
				<ul>
					<li>{this.state.article.body}</li>
					<li>Author: {this.state.article.author}</li>
					<li>Topic: {this.state.article.topic}</li>
					<li>Votes: {this.state.article.votes}</li>
                    <li>Comments: {this.state.article.comment_count}</li>
				</ul>
                
            </div>
        );
    }
}


export default SingleArticle;