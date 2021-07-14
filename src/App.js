import Canvas from "./core/Canvas";
import Circle from "./core/Circle";
import Rectangle from "./core/Rectangle";

const App = () => {
	return (
		<Canvas>
			<Circle x={250} y={250} r={100} stroke="yellow" fill="blue" />

			<Rectangle
				x={10}
				y={10}
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
		</Canvas>
	);
};

export default App;
