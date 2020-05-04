import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  function push(subapp) {
    window.history.pushState(null, subapp, subapp);
  }
  return (
    <div className="App">
      <header className="App-header">主应用1</header>
      <div>
        <div
          onClick={() => {
            push("/react");
          }}
        >
          react
        </div>
        <div
          onClick={() => {
            push("/vue");
          }}
        >
          vue
        </div>
      </div>
    </div>
  );
}

export default App;
