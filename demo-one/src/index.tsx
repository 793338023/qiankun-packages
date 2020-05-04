import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "./public-path";

function render(props: any) {
  const { container } = props;
  ReactDOM.render(
    <App />,
    container
      ? container.querySelector("#root")
      : document.querySelector("#root")
  );
}

if (!(window as any).__POWERED_BY_QIANKUN__) {
  render({});
}

export async function bootstrap() {
  console.log("react 启动...");
}

export async function mount(props: any) {
  console.log("主应用加载react微应用", props);
  render(props);
}

export async function unmount() {
  const oRoot = document.getElementById("root");
  oRoot && ReactDOM.unmountComponentAtNode(oRoot);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
