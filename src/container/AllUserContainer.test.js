import React from "react";
import AllUserContainer from "./AllUserContainer";
import UserCard from "../components/UserCard";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import { mount, render, shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { Row, Input, Spin } from "antd";
import * as Api from "../__mocks__/api";
// import * as Api from "../api";
import SearchField from "../components/SearchField";

// //需要mount个fetch数据的request
// it("AllUser exclude the life cycle snapshot test", () => {
//   const component = mount(<AllUser />);
//   const tree = toJson(component);
//   expect(tree).toMatchSnapshot();
// });
//
// // it("AllUser exclude renderer", () => {
// //   const component = renderer(<AllUser />);
// //   const tree = component.toJSON();

// //   expect(tree).toMatchSnapshot();
// // });
//
// it("should have 5 Spins", () => {
//   const wrapper = mount(<AllUser />);
//   expect(wrapper.find(Spin)).toHaveLength(5);
// });
//
// it("AllUser setState test after mount", () => {
//   const wrapper = mount(<AllUser />);
//   wrapper.setState({
//     isLoading: false
//   });
//
//   expect(wrapper.find(Input).exists()).toBe(true);
//   expect(wrapper.find(Row).exists()).toBe(true);
//   expect(wrapper.find(UserCard).exists()).toBe(false);
//   expect(wrapper.find(Spin).exists()).toBe(false);
// });

// refactor

// const wrapper = shallow(<MyComponent />, { lifecycleExperimental: true });
// return fooAPI().then(() => {
//   expect(wrapper.state('happy')).toEqual('i-am-now-happy');
// });
// it("shallow snapshot", () => {
//   const component = shallow(<AllUser />);
//   expect(toJson(component)).toMatchSnapshot("shallow");
// });

jest.mock("../api.js");

// const  setItem  = spyOn(global.localStorage.setItem);

it("state.isLoading should be true when componentDidMount not invoked", () => {
  const wrapper = shallow(<AllUserContainer />);
  expect(wrapper.state("isLoading")).toEqual(true);
});

it("state.isLoading should be false when componentDidMount invoked ", () => {
  const wrapper = shallow(<AllUserContainer />, { lifecycleExperimental: true });
  const setItem = spyOn(localStorage, "setItem");
  return Api.fetchPopularRepos().then(() => {
    expect(wrapper.state("isLoading")).toEqual(false);
    expect(wrapper.find(Row)).toHaveLength(1);
    expect(wrapper.find(UserCard)).toHaveLength(3);
    expect(localStorage.setItem).toHaveBeenCalled();
  });
});

it("should update the UI after handleChange is called", () => {
  const wrapper = shallow(<AllUserContainer />);
  wrapper.setState({
    isLoading: false,
    repos: [
      { id: "first", name: "leo" },
      { id: "second", name: "nick" },
      { id: "third", name: "andy" }
    ],
    filtered: [
      { id: "first", name: "leo" },
      { id: "second", name: "nick" },
      { id: "third", name: "andy" }
    ]
  });

  expect(wrapper.find(UserCard)).toHaveLength(3);
  //handlechange已经被子组件测试能够调用了
  wrapper.instance().handleChange({ target: { value: "leo" } });
  expect(wrapper.state("filtered")).toHaveLength(1);
});

it("should the dom input invoke the parent handler", () => {
  const handleChange = jest.fn();
  const wrapper = mount(<MemoryRouter><AllUserContainer /></MemoryRouter>);
  wrapper.find("input").simulate("change", { target: { value: "testing" } });
  expect(wrapper.find("input").node.value).toEqual("testing");
});
