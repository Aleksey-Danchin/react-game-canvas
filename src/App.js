import Canvas from "./core/Canvas";
import Circle from "./core/Circle";
import Rectangle from "./core/Rectangle";
import Group from "./core/Group";
import { useCallback, useState } from "react";
import useTick from "./core/hooks/useTick";

const App = () => {
	const [angle, setAngle] = useState(0);

	const tick = useCallback(({ secondPart }) => {
		setAngle((angle) => angle + (secondPart * Math.PI) / 9);
	}, []);

	useTick(tick);

	return (
		<Canvas сleaning={false}>
			<Group pivotX={300} pivotY={300} angle={angle}>
				<Circle x={250} y={250} r={100} stroke="yellow" fill="blue" />

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
			</Group>

			<Circle x={300} y={300} r={5} fill="red" />
		</Canvas>
	);
};

export default App;
