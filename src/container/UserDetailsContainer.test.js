import React from "react";
import UserDetailsContainer from "./UserDetailsContainer";
import UserDetails from "../components/UserDetails";
import { shallow } from "enzyme";
import * as Api from "../__mocks__/api";
import { Spin } from "antd";

jest.mock("../api.js");
// it("should not render the UserDetails after initial render", () => {
//   const component = shallow(<UserDetailsContainer />);
//   console.log(component.find(UserDetails).length);
//   expect(component.find(UserDetails)).toHaveLength(0);
// });

it("should render the UserDetails components after componentDidMount", () => {
  const wrapper = shallow(<UserDetailsContainer />, {
    lifecycleExperimental: true
  });
  return Api.getProfile("any").then(() => {
    expect(wrapper.find(UserDetails)).toHaveLength(1);
  });
});
