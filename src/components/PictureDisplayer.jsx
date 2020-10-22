import React from 'react';

function PictureDisplayer(props) {
	let image = '';
	const width = window.innerWidth;
	if (width < 490) {
		if (props.topic === 'cooking') image = `https://picsum.photos/id/1080/${width}/200`;
		else if (props.topic === 'football') image = `https://picsum.photos/id/1058/${width}/200`;
		else if (props.topic === 'coding') image = `https://picsum.photos/id/180/${width}/200`;
	}
	else {
		if (props.topic === 'cooking') image = `https://picsum.photos/id/1080/${width}/200`;
		else if (props.topic === 'football') image = `https://picsum.photos/id/1058/${width}/200`;
		else if (props.topic === 'coding') image = `https://picsum.photos/id/180/${width}/200`;
	}
	return (
		<header className="article-header">
			<img src={image} alt={`photo of ${props.topic}`} />

		</header>
	)
}

export default PictureDisplayer;