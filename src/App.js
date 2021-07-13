import Canvas from "./core/Canvas";
import Circle from "./core/figures/Circle";
import Rectangle from "./core/figures/Rectangle";
import { useEffect, useState } from "react";
import { useRenderer } from "./core/Renderer";

const App = () => {
	return (
		<Canvas fullScreen>
			<MovedCircle
				x={250}
				y={250}
				r={100}
				stroke="yellow"
				fill="blue"
				centerX={400}
				centerY={300}
				angle={0}
				rotateSpeed={-90}
				R={200}
			/>

			<Rectangle
				x={10}
				y={10}
				width={500}
				height={250}
				fill="rgba(123, 233, 12, 0.5)"
				stroke="green"
				lineWidth={5}
			/>

			<MovedCircle
				x={100}
				y={100}
				r={50}
				stroke="green"
				fill="rgba(255, 0, 0, 0.5)"
				centerX={400}
				centerY={300}
				angle={0}
				rotateSpeed={60}
				R={100}
			/>
		</Canvas>
	);
};

export default App;

function MovedCircle(props) {
	const { children, ...data } = props;
	const renderer = useRenderer();

	const [circle, setCircle] = useState(data);

	useEffect(() => {
		const { secondPart } = renderer;

		setCircle((circle) => {
			const angle = circle.angle + circle.rotateSpeed * secondPart;
			const a = (angle / 180) * Math.PI;
			const x = circle.centerX + circle.R * Math.cos(a);
			const y = circle.centerY + circle.R * Math.sin(a);

			return {
				...circle,
				angle,
				x,
				y,
			};
		});
	}, [renderer]);

	return <Circle {...circle} />;
}
