import { useCallback, useEffect, useMemo } from "react";
import PropTypes from "prop-types";

import { useImage, useCanvas, useContainer, useJSON } from "./hooks";

const BackgroundTiles = (props) => {
	const map = useJSON(props.map);
	const tiles = useImage(props.tiles);
	const { context } = useCanvas();

	const columns = useMemo(
		() => tiles?.width / map?.tilewidth,
		[map?.tilewidth, tiles?.width]
	);

	const layers = useMemo(
		() => map?.layers?.slice().sort((a, b) => a.id - b.id),
		[map?.layers]
	);

	const tick = useCallback(() => {
		if (!layers || !tiles) {
			return;
		}

		for (const layer of layers) {
			for (let y = 0; y < layer.height; y++) {
				for (let x = 0; x < layer.width; x++) {
					let item = layer.data[y * layer.width + x];

					if (!item) {
						continue;
					}

					item -= 1;

					context.beginPath();
					context.drawImage(
						tiles,
						parseInt(item % columns) * map.tilewidth,
						parseInt(item / columns) * map.tileheight,
						map.tilewidth,
						map.tileheight,
						props.x + x * map.tilewidth,
						props.y + y * map.tileheight,
						map.tilewidth,
						map.tileheight
					);
				}
			}
		}
	}, [
		columns,
		context,
		layers,
		map?.tileheight,
		map?.tilewidth,
		props.x,
		props.y,
		tiles,
	]);

	useContainer(tick);

	return null;
};

export default BackgroundTiles;

BackgroundTiles.propTypes = {
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired,
	map: PropTypes.string.isRequired,
	tiles: PropTypes.object.isRequired,
};

BackgroundTiles.defaultProps = {
	x: 0,
	y: 0,
};
