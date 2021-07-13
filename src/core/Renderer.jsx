import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

import useOnce from "./hooks/useOnce";
import useTicks from "./hooks/useTicks";

const RendererContext = createContext();
export const useRenderer = () => useContext(RendererContext);

const Renderer = (props) => {
	const { children } = props;

	const [addRendererTick, removeRendererTick, applyRendererTicks] =
		useTicks();

	const [state, setState] = useState({
		timestamp: 0,
		pTimestamp: 0,
		fps: 0,
		diff: 0,
		secondPart: 0,
	});

	const value = useMemo(
		() => ({ ...state, addRendererTick, removeRendererTick }),
		[state, addRendererTick, removeRendererTick]
	);

	const tick = useCallback((timestamp = 0) => {
		requestAnimationFrame(tick);

		setState((state) => {
			const diff = timestamp - state.pTimestamp;

			return {
				timestamp,
				pTimestamp: state.timestamp,
				diff,
				secondPart: diff / 1000,
				fps: 1000 / diff,
			};
		});
	}, []);

	useOnce(tick);
	useEffect(() => applyRendererTicks(), [applyRendererTicks, value]);

	return (
		<RendererContext.Provider value={value}>
			{children}
		</RendererContext.Provider>
	);
};

export default Renderer;
