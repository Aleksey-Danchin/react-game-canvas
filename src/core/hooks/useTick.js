import { useEffect } from "react";
import { useRenderer } from "../Renderer";

const useTick = (callback) => {
	const { items } = useRenderer();

	useEffect(() => {
		if (items.includes(callback) || !(callback instanceof Function)) {
			return;
		}

		items.push(callback);

		return () => {
			const index = items.indexOf(callback);

			if (index !== -1) {
				items.splice(index);
			}
		};
	}, [callback, items]);
};

export default useTick;
