import React from 'react';

const webPImage = (webpSrc, fallbackImg) => {
	return (
		<picture>
			<source srcSet={webpSrc} type="image/webp" />
			{fallbackImg}
		</picture>
	);
};

export default webPImage;
