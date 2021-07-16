import { useCallback } from "react";
import PropTypes from "prop-types";

import { useCanvas, useContainer } from "./hooks";

const Circle = (props) => {
	const { x, y, r, lineWidth, stroke, fill, opacity, transform } = props;

	const { context } = useCanvas();

	const withRestore = opacity !== 1 || transform;

	const tick = useCallback(() => {
		context.beginPath();

		if (withRestore) {
			context.save();

			if (transform) {
				context.setTransform(...transform);
			}

			if (opacity !== undefined) {
				context.globalAlpha *= opacity;
			}
		}

		context.arc(x, y, r, 0, Math.PI * 2);
		context.lineWidth = lineWidth;

		if (fill) {
			context.fillStyle = fill;
			context.fill();
		}

		if (stroke) {
			context.strokeStyle = stroke;
			context.stroke();
		}

		if (withRestore) {
			context.restore();
		}
	}, [
		context,
		fill,
		lineWidth,
		opacity,
		r,
		stroke,
		transform,
		withRestore,
		x,
		y,
	]);

	useContainer(tick);

	return null;
};

export default Circle;

Circle.propTypes = {
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired,
	r: PropTypes.number.isRequired,
	lineWidth: PropTypes.number.isRequired,
	stroke: PropTypes.string,
	fill: PropTypes.string,
	scaleX: PropTypes.number.isRequired,
	scaleY: PropTypes.number.isRequired,
	opacity: PropTypes.number,
	transform: PropTypes.array,
};

Circle.defaultProps = {
	lineWidth: 1,
	scaleX: 1,
	scaleY: 1,
};
