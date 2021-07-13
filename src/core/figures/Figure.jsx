import { useCanvas } from "../Canvas";

const Figure = (props) => {
	const { canvas, context } = useCanvas();
	props.children({ canvas, context });

	return null;
};

export default Figure;
