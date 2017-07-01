import React from "react";
import renderer from "react-test-renderer";
import Home from "./Home";

import { MemoryRouter } from "react-router-dom";

it("Home renders correctly", () => {
  const component = renderer.create(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
