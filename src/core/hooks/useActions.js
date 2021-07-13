import { useCallback, useMemo, useRef } from "react";

const useActions = () => {
	const actionsRef = useRef([]);
	const actions = actionsRef.current;

	const addAction = useCallback(
		(action) => {
			if (!actions.includes(action)) {
				actions.push(action);
			}
		},
		[actions]
	);

	const removeAction = useCallback(
		(action) => {
			const index = actions.indexOf(action);

			if (index !== -1) {
				actions.splice(index, 1);
			}
		},
		[actions]
	);

	const runActions = useCallback(() => {
		for (const action of actions) {
			action();
		}
	}, [actions]);

	const value = useMemo(
		() => [addAction, removeAction, runActions],
		[addAction, removeAction, runActions]
	);

	return value;
};

export default useActions;
