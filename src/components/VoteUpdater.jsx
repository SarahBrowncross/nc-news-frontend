import React from 'react';
import axios from 'axios';

class VoteUpdater extends React.Component {
	state = {
		userVoteCount: 0
	};

	handleVote = (voteValue) => {
		this.setState((currentState) => {
			return {userVoteCount: currentState.userVoteCount + voteValue};
		});
		axios.patch(`https://sarah-nc-news.herokuapp.com/api/${this.props.element}/${this.props.elementID}`,
		{inc_votes: voteValue}
		)
		.then(() => {
		})
		.catch(() => {
			this.setState((currentState) => {
				return {userVoteCount: currentState.userVoteCount - voteValue};
			});
		})
	};

	render () {
		return (
			<div className='votes'>
				<div className='vote-buttons'>
				<button disabled={this.state.userVoteCount === 1} onClick={() => this.handleVote(1)} value={1}>^</button>
				<button disabled={this.state.userVoteCount === -1} onClick={() => this.handleVote(-1)} value={-1}>v</button>
				</div>
				<p>Votes: {this.props.votes + this.state.userVoteCount}</p>
			</div>
		)
	}
}

export default VoteUpdater;