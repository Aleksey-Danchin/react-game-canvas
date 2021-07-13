import { useEffect } from "react";

// eslint-disable-next-line react-hooks/exhaustive-deps
const useOnce = (fun) => useEffect(fun, []);

export default useOnce;
