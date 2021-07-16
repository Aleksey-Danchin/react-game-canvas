import { useContext } from "react";
import { CanvasContext } from "../Canvas";

const useCanvas = () => useContext(CanvasContext);

export default useCanvas;
