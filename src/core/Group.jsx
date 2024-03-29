import PropTypes from "prop-types";
import { useCallback } from "react";

import { Container } from "./";
import { useCanvas, useContainerState, useContainer } from "./hooks";

const Group = (props) => {
	const {
		x,
		y,
		scaleX,
		scaleY,
		pivotX,
		pivotY,
		angle,
		transform,
		opacity,
		children,
	} = props;

	const { context } = useCanvas();

	const [items, apply, reset] = useContainerState();

	const tick = useCallback(() => {
		context.save();

		if (transform) {
			context.setTransform(...transform);
		} else {
			if (x || y) {
				context.translate(x, y);
			}

			if (angle) {
				context.translate(pivotX, pivotY);
				context.rotate(angle);
				context.translate(-pivotX, -pivotY);
			}

			if (scaleX !== 1 || scaleY !== 1) {
				context.scale(scaleX, scaleY);
			}

			if (opacity !== undefined) {
				context.globalAlpha *= opacity;
			}
		}

		apply();
		reset();

		context.restore();
	}, [
		angle,
		apply,
		context,
		pivotX,
		pivotY,
		reset,
		scaleX,
		scaleY,
		transform,
		x,
		y,
		opacity,
	]);

	useContainer(tick);

	return <Container items={items}>{children}</Container>;
};

export default Group;

Group.propTypes = {
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired,
	scaleX: PropTypes.number.isRequired,
	scaleY: PropTypes.number.isRequired,
	pivotX: PropTypes.number.isRequired,
	pivotY: PropTypes.number.isRequired,
	angle: PropTypes.number.isRequired,
	transform: PropTypes.array,
	opacity: PropTypes.number,
};

Group.defaultProps = {
	x: 0,
	y: 0,
	scaleX: 1,
	scaleY: 1,
	pivotX: 1,
	pivotY: 1,
	angle: 0,
};
