import { useCallback, useMemo, useState } from "react";
import {
	Canvas,
	Circle,
	Rectangle,
	Group,
	Image,
	Line,
	AnimatedSprite,
} from "./core";

import { useRenderer, useTick } from "./core/hooks";

const App = () => {
	const [angle, setAngle] = useState(-Math.PI / 10);
	const [opacity, setOpacity] = useState(1);

	const tick = useCallback(({ secondPart, timestamp, fps }) => {
		setAngle((angle) => angle + (secondPart * Math.PI) / 9);
		setOpacity(Math.abs(Math.cos(timestamp / 1000)));

		console.log(fps);
	}, []);

	useTick(tick);

	const renderer = useRenderer();

	const atlasIdle = useMemo(
		() => ({
			idle: {
				duration: 1000,
				frames: [
					[0, 0, 250, 250],
					[250, 0, 250, 250],
					[500, 0, 250, 250],
					[750, 0, 250, 250],
					[1000, 0, 250, 250],
					[1250, 0, 250, 250],
					[1500, 0, 250, 250],
					[1750, 0, 250, 250],
				],
			},
		}),
		[]
	);

	const atlasAttack = useMemo(
		() => ({
			attack: {
				duration: 2000,
				frames: [
					[0, 0, 250, 250],
					[250, 0, 250, 250],
					[500, 0, 250, 250],
					[750, 0, 250, 250],
					[1000, 0, 250, 250],
					[1250, 0, 250, 250],
					[1500, 0, 250, 250],
					[1750, 0, 250, 250],
				],
			},
		}),
		[]
	);

	return (
		<>
			<Canvas>
				<Image
					src="/src/sun.jpg"
					width={renderer.width}
					height={renderer.height}
				/>

				<Line
					x1={0}
					y1={0}
					x2={renderer.width}
					y2={renderer.height}
					stroke="white"
					lineWidth={30}
				/>

				<AnimatedSprite
					src="/src/wizard/Sprites/Idle.png"
					atlas={atlasIdle}
					action="idle"
					width={500}
					height={500}
				/>
			</Canvas>

			<Canvas>
				<Group
					x={500}
					y={200}
					pivotX={50}
					pivotY={50}
					angle={angle}
					opacity={opacity}
				>
					<Circle
						x={250}
						y={250}
						r={100}
						stroke="yellow"
						fill="blue"
						lineWidth={10}
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

					<AnimatedSprite
						src="/src/wizard/Sprites/Attack1.png"
						atlas={atlasAttack}
						action="attack"
						width={500}
						height={500}
					/>
				</Group>
			</Canvas>
		</>
	);
};

export default App;
