import React from "react";
import { Input, Icon } from "antd";

const SearchField = props =>
  <Input
    style={{ display: "inline-block", width: "40%", marginTop: 30 }}
    addonBefore={<Icon type="search" />}
    size="large"
    placeholder="filter the projects"
    value={props.value}
    onChange={props.handleChange}
  />;

export default SearchField;
