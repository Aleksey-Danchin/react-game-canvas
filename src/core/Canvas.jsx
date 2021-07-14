import PropTypes from "prop-types";

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

const CanvasContext = createContext();
export const useCanvas = () => useContext(CanvasContext);

const Canvas = (props) => {
	const { children, fullScreen } = props;

	const rendererState = useRenderer();

	const ref = useRef();

	const canvas = ref.current;
	const context = useMemo(() => canvas?.getContext("2d"), [canvas]);
	const [canvasState, setCanvasState] = useState({ canvas, context });

	const resize = useCallback(() => {
		if (ref.current && fullScreen) {
			ref.current.width = window.innerWidth;
			ref.current.height = window.innerHeight;

			setCanvasState({ canvas, context });
		}
	}, [canvas, context, fullScreen]);

	const tick = useCallback(() => {
		if (!canvas) {
			return;
		}

		canvas.width |= 0;
		setCanvasState({ canvas, context });
	}, [canvas, context]);

	useEffect(() => {
		if (ref.current && fullScreen) {
			resize();
			window.addEventListener("resize", resize);

			return () => {
				window.removeEventListener("resize", resize);
			};
		}
	}, [fullScreen, resize]);

	useEffect(tick, [tick, rendererState]);

	useEffect(() => setCanvasState({ canvas, context }), [canvas, context]);

	const content = useMemo(
		() => (canvasState.canvas && canvasState.context ? children : null),
		[canvasState.canvas, canvasState.context, children]
	);

	return (
		<CanvasContext.Provider value={canvasState}>
			<canvas ref={ref} />
			{content}
		</CanvasContext.Provider>
	);
};

export default Canvas;

Canvas.propTypes = {
	fullScreen: PropTypes.bool.isRequired,
};

Canvas.defaultProps = {
	fullScreen: false,
};
