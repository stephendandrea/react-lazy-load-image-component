import React from 'react';

export const webpImage = (props, img) => {
	const srcSplit = props.src.split('.');
	const cacheString = srcSplit[1].split('?');
	const webpSrc = `${srcSplit[0]}.webp${
		cacheString[1] ? `?${cacheString[1]}` : ''
	}`;

	return (
		<picture>
			<source srcSet={webpSrc} type="image/webp" />
			{img}
		</picture>
	);
};
