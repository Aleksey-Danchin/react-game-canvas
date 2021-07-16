import { useContext } from "react";
import { RendererContext } from "../Renderer";

const useRenderer = () => useContext(RendererContext);

export default useRenderer;
