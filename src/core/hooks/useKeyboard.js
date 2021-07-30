import { useCallback, useEffect, useState } from "react";

const ARROW_UP = "ArrowUp";
const ARROW_DOWN = "ArrowDown";
const ARROW_LEFT = "ArrowLeft";
const ARROW_RIGHT = "ArrowRight";

const useKeyboard = () => {
	const [state, setState] = useState({
		left: false,
		right: false,
		up: false,
		down: false,
	});

	const keydownHandler = useCallback((e) => {
		if (e.code === ARROW_UP) {
			setState((state) => ({ ...state, up: true }));
		} else if (e.code === ARROW_DOWN) {
			setState((state) => ({ ...state, down: true }));
		} else if (e.code === ARROW_LEFT) {
			setState((state) => ({ ...state, left: true }));
		} else if (e.code === ARROW_RIGHT) {
			setState((state) => ({ ...state, right: true }));
		}
	}, []);

	const keyupHandler = useCallback((e) => {
		if (e.code === ARROW_UP) {
			setState((state) => ({ ...state, up: false }));
		} else if (e.code === ARROW_DOWN) {
			setState((state) => ({ ...state, down: false }));
		} else if (e.code === ARROW_LEFT) {
			setState((state) => ({ ...state, left: false }));
		} else if (e.code === ARROW_RIGHT) {
			setState((state) => ({ ...state, right: false }));
		}
	}, []);

	useEffect(() => {
		document.addEventListener("keydown", keydownHandler);
		document.addEventListener("keyup", keyupHandler);

		return () => {
			document.removeEventListener("keydown", keydownHandler);
			document.removeEventListener("keyup", keyupHandler);
		};
	}, [keydownHandler, keyupHandler]);

	return state;
};

export default useKeyboard;
