import PropTypes from "prop-types";
import {
	createContext,
	useCallback,
	useContext,
	useRef,
	useState,
	useEffect,
} from "react";
import Container, { useContainer } from "./Container";

import useOnce from "./hooks/useOnce";
import styles from "./styles.module.css";

const RendererContext = createContext();
export const useRenderer = () => useContext(RendererContext);

const Renderer = (props) => {
	const { width, height, fullScreen, children } = props;

	const ref = useRef();

	const resize = useCallback(() => {
		if (ref.current && fullScreen) {
			ref.current.style.width = `${window.innerWidth}px`;
			ref.current.style.height = `${window.innerHeight}px`;

			setRendererState((state) => ({
				...state,
				realWidth: window.innerWidth,
				realHeight: window.innerHeight,
			}));
		}
	}, [fullScreen]);

	useEffect(() => {
		if (ref.current) {
			if (fullScreen) {
				resize();
				window.addEventListener("resize", resize);

				return () => {
					window.removeEventListener("resize", resize);
				};
			}

			if (width !== undefined) {
				ref.current.style.width = `${width}px`;
			}

			if (height !== undefined) {
				ref.current.style.height = `${height}px`;
			}

			const rect = ref.current.getClientBounding();

			setRendererState((state) => ({
				...state,
				realWidth: rect.width,
				realHeight: rect.height,
			}));
		}
	}, [fullScreen, height, resize, width]);

	const [items, apply, reset] = useContainer();

	const [rendererState, setRendererState] = useState({
		items,

		timestamp: 0,
		pTimestamp: 0,
		fps: 0,
		diff: 0,
		secondPart: 0,

		width,
		height,
		realWidth: width,
		realHeight: height,
	});

	const tick = useCallback((timestamp = 0) => {
		requestAnimationFrame(tick);

		setRendererState((state) => {
			const diff = timestamp - state.pTimestamp;

			return {
				...state,
				timestamp,
				pTimestamp: state.timestamp,
				diff,
				secondPart: diff / 1000,
				fps: 1000 / diff,
			};
		});
	}, []);

	useOnce(tick);

	useEffect(() => {
		apply(rendererState);
		reset((items) => setRendererState((state) => ({ ...state, items })));
	}, [rendererState, apply, reset]);
	return (
		<RendererContext.Provider value={rendererState}>
			<Container items={items}>
				<div ref={ref} className={styles.renderer}>
					{children}
				</div>
			</Container>
		</RendererContext.Provider>
	);
};

export default Renderer;

Renderer.propTypes = {
	fullScreen: PropTypes.bool.isRequired,

	width: PropTypes.number,
	height: PropTypes.number,
};

Renderer.defaultProps = {
	fullScreen: false,
};
