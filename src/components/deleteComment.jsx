import axios from 'axios';

deleteComment = (commentId) => {
	axios.delete(`https://sarah-nc-news.herokuapp.com/api/comments/${commentId}`)
}