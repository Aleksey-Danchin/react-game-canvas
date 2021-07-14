import PropTypes from "prop-types";

import {
	useCallback,
	useRef,
	createContext,
	useEffect,
	useContext,
} from "react";

export const ContainerContext = createContext();

export const useContainer = (item) => {
	const itemsRef = useRef([]);
	const items = itemsRef.current;

	const reset = useCallback(() => {
		itemsRef.current = [];
	}, []);

	const apply = useCallback((data) => {
		itemsRef.current.forEach((item) => item(data));
	}, []);

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

	return [items, apply, reset];
};

export const Container = (props) => {
	const { items, children } = props;

	return (
		<ContainerContext.Provider value={items}>
			{children}
		</ContainerContext.Provider>
	);
};

export default Container;

Container.propTypes = {
	items: PropTypes.array.isRequired,
};

Container.defaultProps = {
	items: [],
};
