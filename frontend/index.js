import { h, render } from "preact";
import App from "./src/App";
import Header from "./src/Header";
import Home from "./src/Home";

render(<Home />, document.getElementById("home"));
render(<App />, document.getElementById("root"));
render(<Header />, document.getElementById("header"));

