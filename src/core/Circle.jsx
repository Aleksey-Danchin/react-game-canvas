import { useCallback } from "react";
import PropTypes from "prop-types";
import { useCanvas } from "./Canvas";
import { useContainer } from "./Container";

const Circle = (props) => {
	const { x, y, r, lineWidth, stroke, fill } = props;

	const { context } = useCanvas();

	const tick = useCallback(() => {
		context.beginPath();
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
	}, [context, fill, lineWidth, r, stroke, x, y]);

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
};

Circle.defaultProps = {
	lineWidth: 1,
};
