import { useCallback, useState } from "react";
import { Canvas, Circle, Rectangle, Group, Image } from "./core";
import { useRenderer, useTick } from "./core/hooks";

const App = () => {
	const [angle, setAngle] = useState(-Math.PI / 10);
	const [opactiy, setOpacity] = useState(1);

	const tick = useCallback(({ secondPart, timestamp }) => {
		setAngle((angle) => angle + (secondPart * Math.PI) / 9);
		setOpacity(Math.abs(Math.cos(timestamp / 1000)));
	}, []);

	useTick(tick);

	const renderer = useRenderer();

	return (
		<>
			<Canvas>
				<Image
					src="/src/sun.jpg"
					width={renderer.width}
					height={renderer.height}
				/>
			</Canvas>

			<Canvas>
				<Group
					x={500}
					y={200}
					pivotX={50}
					pivotY={50}
					angle={angle}
					opactiy={opactiy}
				>
					<Circle
						x={250}
						y={250}
						r={100}
						stroke="yellow"
						fill="blue"
					/>

					<Rectangle
						x={0}
						y={0}
						width={500}
						height={250}
						fill="rgb(123, 233, 12)"
						stroke="green"
						lineWidth={5}
						angle={Math.PI / 12}
						pivotX={10}
						pivotY={10}
					/>

					<Circle
						x={100}
						y={100}
						r={50}
						stroke="green"
						fill="red"
						opacity={0.5}
					/>

					<Circle
						x={400}
						y={100}
						r={50}
						stroke="green"
						fill="red"
						opacity={0.5}
					/>

					<Circle x={0} y={0} r={15} fill="red" />
					<Circle x={50} y={50} r={15} fill="green" />
				</Group>
			</Canvas>
		</>
	);
};

export default App;
