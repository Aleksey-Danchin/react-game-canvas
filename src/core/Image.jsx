import { useCallback, useMemo } from "react";
import { useContainer } from "./Container";
import PropTypes from "prop-types";
import { useCanvas } from "./Canvas";
import useImage from "./hooks/useImage";

const Image = (props) => {
	const { x, y, frameX, frameY, src } = props;

	const image = useImage(src);

	const width = useMemo(
		() => props?.width ?? image?.width,
		[image?.width, props?.width]
	);

	const height = useMemo(
		() => props?.height ?? image?.height,
		[image?.height, props?.height]
	);

	const frameWidth = useMemo(
		() => props?.frameWidth ?? image?.width,
		[image?.width, props?.frameWidth]
	);

	const frameHeight = useMemo(
		() => props?.frameHeight ?? image?.height,
		[image?.height, props?.frameHeight]
	);

	const { context } = useCanvas();

	const tick = useCallback(() => {
		if (!image) {
			return;
		}

		context.beginPath();
		context.drawImage(
			image,

			frameX,
			frameY,
			frameWidth,
			frameHeight,
			x,
			y,
			width,
			height
		);
	}, [
		context,
		frameHeight,
		frameWidth,
		frameX,
		frameY,
		height,
		image,
		width,
		x,
		y,
	]);

	useContainer(tick);

	return null;
};

export default Image;

Image.propTypes = {
	src: PropTypes.string.isRequired,

	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired,
	width: PropTypes.number,
	height: PropTypes.number,

	frameX: PropTypes.number.isRequired,
	frameY: PropTypes.number.isRequired,
	frameWidth: PropTypes.number,
	frameHeight: PropTypes.number,
};

Image.defaultProps = {
	x: 0,
	y: 0,
	frameX: 0,
	frameY: 0,
};
