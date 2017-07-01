import React from "react";
import UserCard from "./UserCard";
// import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import { shallow, mount, render } from "enzyme";
import { Col } from "antd";
import renderer from "react-test-renderer";
import toJson from "enzyme-to-json";

const props = {
  title: "string",
  description: "string",
  year: "string",
  imdbID: "string",
  poster: "string",
  trailer: "string",
  name: "string",
  id: "string",
  style: "mixed",
  owner: {
    login: "string",
    avatar_url: "string"
  },
  key: "string",
  stargazers_count: "string"
};

it("render UserCard correctly", () => {
  const component = render(
    <MemoryRouter>
      <UserCard {...props} />
    </MemoryRouter>
  );
  expect(toJson(component)).toMatchSnapshot();
});
//
// it("render UserCard correctly", () => {
//   const component = render(<UserCard {...props} />);
//   expect(toJson(component)).toMatchSnapshot();
// });
