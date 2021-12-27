import React from 'react';

const webpImage = (webpSrc, fallbackImg) => {
	return (
		<picture>
			<source srcSet={webpSrc} type="image/webp" />
			{fallbackImg}
		</picture>
	);
};

export default webpImage;
