import PropTypes from "prop-types";

import { createContext } from "react";

export const ContainerContext = createContext();

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
