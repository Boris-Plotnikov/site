import { renderToString } from "react-dom/server";
import App from "./App";

export { PROFILE, PROJECTS, TEXT } from "./content";

export function render(): string {
  return renderToString(<App />);
}
