import { useCallback, useRef } from "react";

const useContainerState = (item) => {
	const itemsRef = useRef([]);
	const items = itemsRef.current;

	const reset = useCallback(() => {
		itemsRef.current = [];
	}, []);

	const apply = useCallback((data) => {
		itemsRef.current.forEach((item) => item(data));
	}, []);

	return [items, apply, reset];
};

export default useContainerState;
