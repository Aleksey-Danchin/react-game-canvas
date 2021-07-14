import PropTypes from "prop-types";
import { useCallback, useMemo } from "react";
import { useCanvas } from "./Canvas";
import { useContainer } from "./Container";

const Rectangle = (props) => {
	const {
		x,
		y,
		width,
		height,
		anchorX,
		anchorY,
		lineWidth,
		stroke,
		fill,
		opacity,
		pivotX,
		pivotY,
		transform,
		angle,
	} = props;

	const positionX = useMemo(() => x + anchorX * width, [anchorX, width, x]);
	const positionY = useMemo(() => y + anchorY * height, [anchorY, height, y]);

	const { context } = useCanvas();

	const withRestore = opacity !== 1 || pivotX || pivotY || angle || transform;

	const tick = useCallback(() => {
		context.beginPath();

		if (withRestore) {
			context.save();

			if (transform) {
				context.setTransform(...transform);
			} else {
				if (angle) {
					context.translate(pivotX, pivotY);
					context.rotate(angle);
					context.translate(-pivotX, -pivotY);
				}

				if (opacity !== undefined) {
					context.globalAlpha *= opacity;
				}
			}
		}

		context.moveTo(positionX, positionY);
		context.rect(positionX, positionY, width, height);
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
		angle,
		context,
		fill,
		height,
		lineWidth,
		opacity,
		pivotX,
		pivotY,
		positionX,
		positionY,
		stroke,
		transform,
		width,
		withRestore,
	]);

	useContainer(tick);

	return null;
};

export default Rectangle;

Rectangle.propTypes = {
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired,
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	anchorX: PropTypes.number.isRequired,
	anchorY: PropTypes.number.isRequired,
	lineWidth: PropTypes.number.isRequired,
	stroke: PropTypes.string,
	fill: PropTypes.string,
	opacity: PropTypes.number,
	angle: PropTypes.number.isRequired,
	pivotX: PropTypes.number.isRequired,
	pivotY: PropTypes.number.isRequired,
	transform: PropTypes.array,
};

Rectangle.defaultProps = {
	anchorX: 0,
	anchorY: 0,
	lineWidth: 1,
	pivotX: 0,
	pivotY: 0,
	angle: 0,
};
