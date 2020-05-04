import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { Divider } from "antd";

import Home from "./views/home";
import Demo from "./views/demo";
// const Demo = lazy(() => import("./views/demo"));

const RouteView = () => {
  return (
    <Router basename={(window as any).__POWERED_BY_QIANKUN__ ? "/react" : "/"}>
      <nav>
        <Link to="/">Home</Link>
        <Divider type="vertical" />
        <Link to="/d">Demo</Link>
      </nav>
      <Suspense fallback={null}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/d" component={Demo} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default RouteView;
