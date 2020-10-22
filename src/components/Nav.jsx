import React from 'react';
import { navigate } from '@reach/router';

class Nav extends React.Component {

	handleSortBy = (event) => {
		const sortBy = event.target.value
			this.props.sortArticles(sortBy)
	}

	render() {
		return (
			<nav>
				<select id="topic-selector" onChange={(event) => {
					const { value } = event.target;
					navigate(`${value}`)
				}}>
					<option value='/topic/all'>All topics</option>
					<option value='/topic/coding'>Coding</option>
					<option value='/topic/cooking'>Cooking</option>
					<option value='/topic/football'>Football</option>
				</select>
				<select id="sort-selector" onChange={this.handleSortBy}>
					<option value='created_at'>New</option>
					<option value='comment_count'>Comments</option>
					<option value='votes'>Votes</option>
				</select>
			</nav>
		)
	}
}

export default Nav;