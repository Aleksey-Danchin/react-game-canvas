import Canvas from "./core/Canvas";
import Circle from "./core/Circle";
import Rectangle from "./core/Rectangle";
import Group from "./core/Group";
import Image from "./core/Image";
import { useCallback, useState } from "react";
import useTick from "./core/hooks/useTick";
import { useRenderer } from "./core/Renderer";

const App = () => {
	const [angle, setAngle] = useState(-Math.PI / 10);

	const tick = useCallback(({ secondPart }) => {
		setAngle((angle) => angle + (secondPart * Math.PI) / 9);
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
				<Group x={500} y={500} pivotX={50} pivotY={50} angle={angle}>
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
					/>

					<Circle
						x={100}
						y={100}
						r={50}
						stroke="green"
						fill="rgba(255, 0, 0, 0.5)"
					/>

					<Circle
						x={400}
						y={100}
						r={50}
						stroke="green"
						fill="rgba(255, 0, 0, 0.5)"
					/>

					<Circle x={0} y={0} r={15} fill="red" />
					<Circle x={50} y={50} r={15} fill="green" />
				</Group>
			</Canvas>
		</>
	);
};

export default App;
