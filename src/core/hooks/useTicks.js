import { useCallback, useMemo, useRef } from "react";

const useTicks = () => {
	const ticksRef = useRef([]);

	const addTick = useCallback((tick) => {
		if (!ticksRef.current.includes(tick)) {
			ticksRef.current.push(tick);
		}
	}, []);

	const removeTick = useCallback((tick) => {
		const index = ticksRef.current.indexOf(tick);

		if (index !== -1) {
			ticksRef.current.splice(index, 1);
		}
	}, []);

	const applyTick = useCallback((...args) => {
		for (const tick of ticksRef.current) {
			tick(...args);
		}
	}, []);

	const value = useMemo(
		() => [addTick, removeTick, applyTick],
		[addTick, removeTick, applyTick]
	);

	return value;
};

export default useTicks;
