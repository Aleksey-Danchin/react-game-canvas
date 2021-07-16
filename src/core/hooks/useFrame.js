import { useEffect, useMemo, useState } from "react";
import { useRenderer } from "./";

const useFrame = (atlas, action) => {
	const { frames, duration } = atlas[action];

	const [frameState, setFrameState] = useState({
		cooldown: duration / frames.length,
		number: 0,
	});

	const renderer = useRenderer();

	useEffect(() => {
		const { diff } = renderer;

		setFrameState((frameState) => {
			let { cooldown, number } = frameState;

			cooldown -= diff;

			while (cooldown < 0) {
				cooldown += duration / frames.length;
				number = (number + 1) % frames.length;
			}

			return { cooldown, number };
		});
	}, [duration, frames.length, renderer]);

	return useMemo(
		() => frames[frameState.number],
		[frameState.number, frames]
	);
};

export default useFrame;
