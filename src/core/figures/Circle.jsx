import { useCallback, useEffect } from "react";
import { useCanvas } from "../Canvas";
import PropTypes from "prop-types";

const Circle = (props) => {
	const { x, y, r, lineWidth, stroke, fill } = props;
	const { context, addCanvasAction, removeCanvasAction } = useCanvas();

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

	useEffect(() => {
		addCanvasAction(tick);
		return () => removeCanvasAction(tick);
	}, [addCanvasAction, removeCanvasAction, tick]);

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
