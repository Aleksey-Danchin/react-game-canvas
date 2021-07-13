import PropTypes from "prop-types";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
} from "react";
import { useRenderer } from "./Renderer";
import useActions from "./hooks/useActions";

const CanvasContext = createContext();
export const useCanvas = () => useContext(CanvasContext);

const Canvas = (props) => {
	const { children, fullScreen } = props;

	const [addCanvasAction, removeCanvasAction, runCanvasActions] =
		useActions();
	const { addRendererAction, removeRendererAction } = useRenderer();

	const ref = useRef();

	const canvas = ref.current;
	const context = useMemo(() => canvas?.getContext("2d"), [canvas]);

	const content = useMemo(
		() => (canvas && context ? children : null),
		[canvas, children, context]
	);

	const resize = useCallback(() => {
		if (ref.current && fullScreen) {
			ref.current.width = window.innerWidth;
			ref.current.height = window.innerHeight;
			runCanvasActions();
		}
	}, [fullScreen, runCanvasActions]);

	const value = useMemo(
		() => ({ canvas, context, addCanvasAction, removeCanvasAction }),
		[canvas, context, addCanvasAction, removeCanvasAction]
	);

	const tick = useCallback(() => {
		if (!canvas) {
			return;
		}

		canvas.width |= 0;
		runCanvasActions();
	}, [canvas, runCanvasActions]);

	useEffect(() => {
		if (ref.current && fullScreen) {
			resize();
			window.addEventListener("resize", resize);

			return () => {
				window.removeEventListener("resize", resize);
			};
		}
	}, [fullScreen, resize]);

	useEffect(() => {
		if (canvas) {
			addRendererAction(tick);

			return () => {
				removeRendererAction(tick);
			};
		}
	}, [addRendererAction, canvas, removeRendererAction, tick]);

	return (
		<CanvasContext.Provider value={value}>
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
