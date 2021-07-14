import { createContext, useCallback, useContext, useState } from "react";

import useOnce from "./hooks/useOnce";

const RendererContext = createContext();
export const useRenderer = () => useContext(RendererContext);

const Renderer = (props) => {
	const { children } = props;

	const [rendererState, setRendererState] = useState({
		timestamp: 0,
		pTimestamp: 0,
		fps: 0,
		diff: 0,
		secondPart: 0,
	});

	const tick = useCallback((timestamp = 0) => {
		requestAnimationFrame(tick);

		setRendererState((state) => {
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

	return (
		<RendererContext.Provider value={rendererState}>
			{children}
		</RendererContext.Provider>
	);
};

export default Renderer;
