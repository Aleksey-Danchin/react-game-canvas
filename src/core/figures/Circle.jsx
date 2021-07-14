import { useEffect } from "react";
import PropTypes from "prop-types";
import { useCanvas } from "../Canvas";

const Circle = (props) => {
	const { x, y, r, lineWidth, stroke, fill } = props;

	const canvasState = useCanvas();

	useEffect(() => {
		const { context } = canvasState;

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
	}, [canvasState, fill, lineWidth, r, stroke, x, y]);

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
