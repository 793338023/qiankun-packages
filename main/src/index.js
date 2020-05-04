import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {
  registerMicroApps,
  setDefaultMountApp,
  runAfterFirstMounted,
  start,
} from "qiankun";

registerMicroApps(
  [
    {
      name: "demo-one",
      entry: "//localhost:7001",
      container: "#subapp-container",
      activeRule: "/react",
    },
    {
      name: "demo-two",
      entry: "//localhost:7101",
      container: "#subapp-container",
      activeRule: "/vue",
    },
  ],
  {
    beforeLoad: [
      (app) => {
        console.log("[LifeCycle] before load %c%s", "color: green;", app.name);
      },
    ],
    beforeMount: [
      (app) => {
        console.log("[LifeCycle] before mount %c%s", "color: green;", app.name);
      },
    ],
    afterUnmount: [
      (app) => {
        console.log(
          "[LifeCycle] after unmount %c%s",
          "color: green;",
          app.name
        );
      },
    ],
  }
);

// 设置默认进入的子应用
setDefaultMountApp("/vue");

// 关闭沙盒，由于加载antd的icon报错
start({ sandbox: false });

runAfterFirstMounted(() => {
  console.log("[MainApp] first app mounted");
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("p-root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
