import PropTypes from "prop-types";
import { useCallback } from "react";

import { useCanvas, useContainer } from "./hooks";

const Line = (props) => {
	const { x1, y1, x2, y2, lineWidth, stroke, opacity } = props;

	const { context } = useCanvas();

	const withRestore = opacity !== 1 && opacity !== context.globalAlpha;

	const tick = useCallback(() => {
		context.beginPath();

		if (withRestore) {
			context.save();

			context.globalAlpha *= opacity;
		}

		context.moveTo(x1, y1);
		context.lineTo(x2, y2);
		context.lineWidth = lineWidth;

		if (stroke) {
			context.strokeStyle = stroke;
			context.stroke();
		}

		if (withRestore) {
			context.restore();
		}
	}, [context, lineWidth, opacity, stroke, withRestore, x1, x2, y1, y2]);

	useContainer(tick);

	return null;
};

export default Line;

Line.propTypes = {
	x1: PropTypes.number.isRequired,
	y1: PropTypes.number.isRequired,
	x2: PropTypes.number.isRequired,
	y2: PropTypes.number.isRequired,
	lineWidth: PropTypes.number.isRequired,
	stroke: PropTypes.string,
	opacity: PropTypes.number,
};

Line.defaultProps = {
	lineWidth: 1,
	opacity: 1,
};
