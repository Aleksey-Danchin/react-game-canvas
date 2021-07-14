import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import Container, { useContainer } from "./Container";

import { useRenderer } from "./Renderer";
import styles from "./styles.module.css";
import PropTypes from "prop-types";

const CanvasContext = createContext();
export const useCanvas = () => useContext(CanvasContext);

const Canvas = (props) => {
	const { сleaning, children } = props;
	const rendererState = useRenderer();

	const ref = useRef();

	const canvas = ref.current;
	const context = useMemo(() => canvas?.getContext("2d"), [canvas]);
	const [canvasState, setCanvasState] = useState({ canvas, context });

	const [items, apply, reset] = useContainer();

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
			<Container items={items}>
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
