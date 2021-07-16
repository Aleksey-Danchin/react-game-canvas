import { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { useFrame } from "./hooks";

import { useImage, useCanvas, useContainer } from "./hooks";

const AnimatedSprite = (props) => {
	const { src, x, y, atlas, action } = props;

	const image = useImage(src);
	const frame = useFrame(atlas, action);

	const width = useMemo(
		() => props?.width ?? atlas[action].frames[0][2],
		[action, atlas, props?.width]
	);

	const height = useMemo(
		() => props?.height ?? atlas[action].frames[0][3],
		[action, atlas, props?.height]
	);

	const { context } = useCanvas();

	const tick = useCallback(() => {
		if (!image) {
			return;
		}

		context.beginPath();
		context.drawImage(
			image,

			...frame,

			x,
			y,
			width,
			height
		);
	}, [context, frame, height, image, width, x, y]);

	useContainer(tick);

	return null;
};

export default AnimatedSprite;

AnimatedSprite.propTypes = {
	src: PropTypes.string.isRequired,

	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired,
	width: PropTypes.number,
	height: PropTypes.number,

	atlas: PropTypes.object.isRequired,
	action: PropTypes.string.isRequired,
};

AnimatedSprite.defaultProps = {
	x: 0,
	y: 0,
};
