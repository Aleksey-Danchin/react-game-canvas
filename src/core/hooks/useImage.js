import { useEffect, useState } from "react";

const useImage = (src) => {
	const [image, setImage] = useState(null);

	useEffect(() => {
		const image = new window.Image();
		image.onload = () => setImage(image);
		image.src = src;
	}, [src]);

	return image;
};

export default useImage;
