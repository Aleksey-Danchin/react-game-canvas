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

const CanvasContext = createContext();
export const useCanvas = () => useContext(CanvasContext);

const Canvas = (props) => {
	const { children } = props;
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

			canvas.width |= 0;

			data = { ...data, ...canvasState };

			apply(data);
			reset();
		},
		[apply, canvas, canvasState, reset]
	);

	useContainer(tick);

	useEffect(() => setCanvasState({ canvas, context }), [canvas, context]);

	const { realWidth, realHeight } = rendererState;

	useEffect(() => {
		if (!canvas) {
			return;
		}

		canvas.width = realWidth;
		canvas.height = realHeight;

		apply(canvasState);
	}, [apply, canvas, canvasState, context, realHeight, realWidth]);

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
