import { useEffect, useState } from "react";

const useJSON = (src) => {
	const [json, setJSON] = useState(null);

	useEffect(() => {
		(async () => {
			const result = await fetch(src);
			const json = await result.json();
			setJSON(json);
		})();
	}, [src]);

	return json;
};

export default useJSON;
