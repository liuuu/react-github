import React from "react";
import SearchField from "./SearchField";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import renderer from "react-test-renderer";

it("SearchField snapshot", () => {
  const tree = renderer.create(<SearchField />).toJSON();
  expect(tree).toMatchSnapshot();
});

const handleChange = jest.fn();
it("change should have value as props passed", () => {
  const component = mount(
    <SearchField handleChange={handleChange} value="inputTesting" />
  );
  expect(component.find("input").node.value).toBe("inputTesting");
});

it("change should invoke the handleChange function", () => {
  const component = mount(
    <SearchField handleChange={handleChange} value="inputTesting" />
  );
  component.find("input").simulate("change");
  expect(handleChange).toHaveBeenCalledTimes(1);
  expect(handleChange).toHaveBeenCalled();
});
