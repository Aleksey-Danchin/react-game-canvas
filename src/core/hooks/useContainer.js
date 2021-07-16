import { useEffect, useContext } from "react";

import { ContainerContext } from "../Container";

const useContainer = (item) => {
	const parentContainer = useContext(ContainerContext);

	useEffect(() => {
		if (!(item instanceof Function) || parentContainer.includes(item)) {
			return;
		}

		parentContainer.push(item);

		return () => {
			const index = parentContainer.indexOf(item);

			if (index !== -1) {
				parentContainer.splice(index, 1);
			}
		};
	}, [item, parentContainer]);
};

export default useContainer;
