import PropTypes from "prop-types";
import { useCallback, useMemo } from "react";
import { useCanvas } from "./Canvas";
import { useContainer } from "./Container";

const Rectangle = (props) => {
	const { x, y, width, height, anchorX, anchorY, lineWidth, stroke, fill } =
		props;

	const positionX = useMemo(() => x + anchorX * width, [anchorX, width, x]);
	const positionY = useMemo(() => y + anchorY * height, [anchorY, height, y]);

	const { context } = useCanvas();

	const tick = useCallback(() => {
		context.beginPath();
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
	}, [context, fill, height, lineWidth, positionX, positionY, stroke, width]);

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
};

Rectangle.defaultProps = {
	anchorX: 0,
	anchorY: 0,
	lineWidth: 1,
};
