// @flow
import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button } from "antd";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import Nav from "./components/Nav";
import Home from "./components/Home";
import AllUser from "./components/AllUser";
import UserDetail from "./components/UserDetail";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Nav />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/all" component={AllUser} />
              <Route
                path="/user/:projectId"
                render={props => <UserDetail {...props} />}
              />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
