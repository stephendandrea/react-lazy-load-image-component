import { PropTypes } from 'prop-types';
import webPImage from './webPImage.jsx';
import LazyLoadComponent from './LazyLoadComponent.jsx';
import React from 'react';

class LazyLoadImage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loaded: false,
		};
	}

	onImageLoad() {
		if (this.state.loaded) {
			return null;
		}

		return () => {
			this.props.afterLoad();

			this.setState({
				loaded: true,
			});
		};
	}

	regularImg(props) {
		return <img onLoad={this.onImageLoad()} {...props} />;
	}

	webpImg(props, img) {
		const srcSplit = props.src.split('.');
		const cacheString = srcSplit[1].split('?');
		const webpSrc = `${srcSplit[0]}.webp${
			cacheString[1] ? `?${cacheString[1]}` : ''
		}`;

		return (
			<picture onLoad={this.onImageLoad()}>
				<source srcSet={webpSrc} type="image/webp" />
				{img()}
			</picture>
		);
	}

	getImg() {
		const {
			afterLoad,
			beforeLoad,
			delayMethod,
			delayTime,
			effect,
			placeholder,
			placeholderSrc,
			scrollPosition,
			threshold,
			useIntersectionObserver,
			visibleByDefault,
			wrapperClassName,
			wrapperProps,
			...imgProps
		} = this.props;

		return this.props.webp
			? webPImage(imgProps, this.regularImg(imgProps))
			: this.regularImg(imgProps);
	}

	getLazyLoadImage() {
		const {
			beforeLoad,
			className,
			delayMethod,
			delayTime,
			height,
			placeholder,
			scrollPosition,
			style,
			threshold,
			useIntersectionObserver,
			visibleByDefault,
			width,
		} = this.props;

		return (
			<LazyLoadComponent
				beforeLoad={beforeLoad}
				className={className}
				delayMethod={delayMethod}
				delayTime={delayTime}
				height={height}
				placeholder={placeholder}
				scrollPosition={scrollPosition}
				style={style}
				threshold={threshold}
				useIntersectionObserver={useIntersectionObserver}
				visibleByDefault={visibleByDefault}
				width={width}
			>
				{this.getImg()}
			</LazyLoadComponent>
		);
	}

	getWrappedLazyLoadImage(lazyLoadImage) {
		const {
			effect,
			height,
			placeholderSrc,
			width,
			wrapperClassName,
			wrapperProps,
		} = this.props;
		const { loaded } = this.state;

		const loadedClassName = loaded ? ' lazy-load-image-loaded' : '';

		return (
			<span
				className={
					wrapperClassName +
					' lazy-load-image-background ' +
					effect +
					loadedClassName
				}
				style={{
					backgroundImage:
						loaded || !placeholderSrc
							? ''
							: `url(${placeholderSrc})`,
					backgroundSize:
						loaded || !placeholderSrc ? '' : '100% 100%',
					color: 'transparent',
					display: 'inline-block',
					height: height,
					width: width,
				}}
				{...wrapperProps}
			>
				{lazyLoadImage}
			</span>
		);
	}

	render() {
		const {
			effect,
			placeholderSrc,
			visibleByDefault,
			wrapperClassName,
			wrapperProps,
		} = this.props;

		const lazyLoadImage = this.getLazyLoadImage();
		const needsWrapper = (effect || placeholderSrc) && !visibleByDefault;

		if (!needsWrapper && !wrapperClassName && !wrapperProps) {
			return lazyLoadImage;
		}

		return this.getWrappedLazyLoadImage(lazyLoadImage);
	}
}

LazyLoadImage.propTypes = {
	afterLoad: PropTypes.func,
	beforeLoad: PropTypes.func,
	delayMethod: PropTypes.string,
	delayTime: PropTypes.number,
	effect: PropTypes.string,
	placeholderSrc: PropTypes.string,
	threshold: PropTypes.number,
	useIntersectionObserver: PropTypes.bool,
	visibleByDefault: PropTypes.bool,
	wrapperClassName: PropTypes.string,
	wrapperProps: PropTypes.object,
};

LazyLoadImage.defaultProps = {
	afterLoad: () => ({}),
	beforeLoad: () => ({}),
	delayMethod: 'throttle',
	delayTime: 300,
	effect: '',
	placeholderSrc: null,
	threshold: 100,
	useIntersectionObserver: true,
	visibleByDefault: false,
	wrapperClassName: '',
};

export default LazyLoadImage;
