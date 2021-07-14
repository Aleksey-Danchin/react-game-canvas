import PropTypes from "prop-types";
import { useCallback } from "react";
import { useCanvas } from "./Canvas";
import { Container, useContainer } from "./Container";

const Group = (props) => {
	const { x, y, scaleX, scaleY, pivotX, pivotY, angle, transform, children } =
		props;

	const { context } = useCanvas();

	const [items, apply, reset] = useContainer();

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
