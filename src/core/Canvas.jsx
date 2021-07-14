import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";

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

	const tick = useCallback(() => {
		if (!canvas) {
			return;
		}

		canvas.width |= 0;
		setCanvasState({ canvas, context });
	}, [canvas, context]);

	useEffect(tick, [tick, rendererState]);

	useEffect(() => setCanvasState({ canvas, context }), [canvas, context]);

	useEffect(() => {
		if (!canvas) {
			return;
		}

		canvas.width = rendererState.realWidth;
		canvas.height = rendererState.realHeight;

		setCanvasState({ canvas, context });
	}, [canvas, context, rendererState.realHeight, rendererState.realWidth]);

	const content = useMemo(
		() => (canvasState.canvas && canvasState.context ? children : null),
		[canvasState.canvas, canvasState.context, children]
	);

	return (
		<CanvasContext.Provider value={canvasState}>
			<canvas ref={ref} className={styles.canvas} />
			{content}
		</CanvasContext.Provider>
	);
};

export default Canvas;
