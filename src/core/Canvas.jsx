import PropTypes from "prop-types";

import {
	createContext,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";

import styles from "./styles.module.css";

import { Container } from "./";
import { useRenderer, useContainerState, useContainer } from "./hooks";

export const CanvasContext = createContext();

const Canvas = (props) => {
	const { сleaning, children, ...data } = props;
	const rendererState = useRenderer();

	const ref = useRef();

	const canvas = ref.current;
	const context = useMemo(() => canvas?.getContext("2d"), [canvas]);
	const [canvasState, setCanvasState] = useState({ canvas, context });

	const [items, apply, reset] = useContainerState();

	const tick = useCallback(
		(data) => {
			if (!canvas) {
				return;
			}

			if (сleaning) {
				canvas.width |= 0;
			}

			data = { ...data, ...canvasState };

			apply(data);
			reset();
		},
		[apply, canvas, canvasState, reset, сleaning]
	);

	useContainer(tick);

	useEffect(() => setCanvasState({ canvas, context }), [canvas, context]);

	const { width, height } = rendererState;

	useEffect(() => {
		if (!canvas) {
			return;
		}

		canvas.width = width;
		canvas.height = height;

		apply(canvasState);
	}, [apply, canvas, canvasState, context, height, width]);

	const content = useMemo(
		() => (canvasState.canvas && canvasState.context ? children : null),
		[canvasState.canvas, canvasState.context, children]
	);

	return (
		<CanvasContext.Provider value={canvasState}>
			<Container {...data} items={items}>
				<canvas ref={ref} className={styles.canvas} />
				{content}
			</Container>
		</CanvasContext.Provider>
	);
};

export default Canvas;

Canvas.propTypes = {
	сleaning: PropTypes.bool.isRequired,
};

Canvas.defaultProps = {
	сleaning: true,
};
