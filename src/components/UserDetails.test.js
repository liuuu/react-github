import React from "react";
import UserDetails from "./UserDetails";
import { render } from "enzyme";
import toJson from "enzyme-to-json";
import { MemoryRouter } from "react-router-dom";
const props = {
  detail: {
    avatar_url: "any",
    login: "any",
    name: "any",
    bio: "any"
  }
};
it("should match snapshot", () => {
  const tree = render(
    <MemoryRouter>
      <UserDetails {...props} />
    </MemoryRouter>
  );
  expect(toJson(tree)).toMatchSnapshot();
});
