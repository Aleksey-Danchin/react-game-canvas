import { useCallback, useEffect, useMemo, useState } from "react";
import {
	Canvas,
	Circle,
	Rectangle,
	Group,
	Image,
	Line,
	AnimatedSprite,
	BackgroundTiles,
} from "./core";

import { useKeyboard, useRenderer, useTick } from "./core/hooks";

const App = () => {
	const [angle, setAngle] = useState(-Math.PI / 10);
	const [opacity, setOpacity] = useState(1);
	const keyboard = useKeyboard();
	const [position, setPosition] = useState({ x: 0, y: 0 });

	const tick = useCallback(
		({ secondPart, timestamp, fps }) => {
			setAngle((angle) => angle + (secondPart * Math.PI) / 9);
			setOpacity(Math.abs(Math.cos(timestamp / 1000)));

			if (keyboard.left) {
				setPosition((position) => ({ ...position, x: position.x - 1 }));
			}

			if (keyboard.right) {
				setPosition((position) => ({ ...position, x: position.x + 1 }));
			}

			if (keyboard.down) {
				setPosition((position) => ({ ...position, y: position.y + 1 }));
			}

			if (keyboard.up) {
				setPosition((position) => ({ ...position, y: position.y - 1 }));
			}
		},
		[keyboard.down, keyboard.left, keyboard.right, keyboard.up]
	);

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

	const atlasRun = useMemo(
		() => ({
			run: {
				duration: 1200,
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
		<Canvas>
			<BackgroundTiles
				x={50}
				y={50}
				map="/src/map.json"
				tiles="/src/autumn.png"
			/>

			<AnimatedSprite
				src="/src/wizard/Sprites/Run.png"
				atlas={atlasRun}
				action="run"
				width={256}
				height={256}
				{...position}
			/>
		</Canvas>
	);
};

export default App;
