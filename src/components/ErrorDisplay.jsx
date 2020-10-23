import React from 'react';
import Header from '../components/Header';

const ErrorDisplay = (props) => {
	return (
		<main className='error-main'>
		<Header />
		<div className='error'>
			<p>
				Error {props.status}: {props.message}
			</p>
		</div>
		</main>
	);
};

export default ErrorDisplay;