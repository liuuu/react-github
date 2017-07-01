import React from "react";
import fs from "fs";
import path from "path";

import ReactDOM from "react-dom";
import App from "./App";
import { MemoryRouter } from "react-router-dom";

import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import Home from "./components/Home";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});
