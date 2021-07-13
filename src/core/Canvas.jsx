import PropTypes from "prop-types";

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
} from "react";

import useTicks from "./hooks/useTicks";

import { useRenderer } from "./Renderer";

const CanvasContext = createContext();
export const useCanvas = () => useContext(CanvasContext);

const Canvas = (props) => {
	const { children, fullScreen } = props;

	const [addCanvasTick, removeCanvasTick, applyCanvasTicks] = useTicks();

	const { addRendererTick, removeRendererTick } = useRenderer();

	const ref = useRef();

	const canvas = ref.current;
	const context = useMemo(() => canvas?.getContext("2d"), [canvas]);

	const value = useMemo(
		() => ({ canvas, context, addCanvasTick, removeCanvasTick }),
		[canvas, context, addCanvasTick, removeCanvasTick]
	);

	const resize = useCallback(() => {
		if (ref.current && fullScreen) {
			ref.current.width = window.innerWidth;
			ref.current.height = window.innerHeight;

			applyCanvasTicks(value);
		}
	}, [applyCanvasTicks, fullScreen, value]);

	const tick = useCallback(() => {
		if (!canvas) {
			return;
		}

		canvas.width |= 0;

		applyCanvasTicks(value);
	}, [applyCanvasTicks, canvas, value]);

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
			addRendererTick(tick);

			return () => {
				removeRendererTick(tick);
			};
		}
	}, [addRendererTick, removeRendererTick, canvas, tick]);

	const content = useMemo(
		() => (canvas && context ? children : null),
		[canvas, children, context]
	);

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
