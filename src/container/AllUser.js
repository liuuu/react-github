// @flow
import React from "react";
import { Row, Span, Card, Col, Avatar, Input, Icon, Spin } from "antd";
import axios from "axios";
import * as Api from "../api.js";
import { Link } from "react-router-dom";
import SearchField from "../components/SearchField";

import _ from "lodash";
import UserCard from "../components/UserCard";

// type User = {
//   title: string,
//   description: string,
//   year: string,
//   imdbID: string,
//   poster: string,
//   trailer: string,
//   name: string,
//   id: string,
//   style: mixed,
//   owner: {
//     login: string,
//     avatar_url: string
//   },
//   key: string,
//   stargazers_count: string
// };
//
// type UserCardInfo = {
//   ...User,
//   index: number
// };

class AllUser extends React.Component {
  state: {
    isLoading: boolean,
    repos: Array<User>,
    filtered: Array<User>,
    value: ""
  };

  handleChange: () => void;
  filterItem: () => void;
  debouncedSearch: (value: string) => void;

  constructor() {
    super();
    this.state = {
      isLoading: true,
      repos: [],
      filtered: [],
      value: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.filterItem = this.filterItem.bind(this);
    this.debouncedSearch = _.debounce(this.filterItem, 1000);
  }

  componentDidMount() {
    const localData = localStorage.getItem("AllUserData");

    if (!localData) {
      Api.fetchPopularRepos().then(data => {
        this.setState({
          isLoading: false,
          repos: data,
          filtered: data
        });
        localStorage.setItem("AllUserData", JSON.stringify(data));
      });
    } else {
      this.setState({
        isLoading: false,
        repos: JSON.parse(localData),
        filtered: JSON.parse(localData)
      });
    }
  }

  handleChange(e: SyntheticKeyboardEvent & { target: HTMLInputElement }) {
    const value = e.target.value;
    this.setState({
      value: value
    });
    this.filterItem(value);
    // this.debouncedSearch(value);
  }

  filterItem(value: string) {
    const filtered = this.state.repos.filter(
      repo => repo.name.toUpperCase().indexOf(value.toUpperCase()) >= 0
    );
    this.setState({
      filtered: filtered
    });
  }

  render() {
    return (
      <div>
        <SearchField
          handleChange={this.handleChange}
          value={this.state.value}
        />
        {this.state.isLoading
          ? <div style={{ marginTop: 150 }} className="women">
              <Spin />
              <Spin />
            </div>
          : <Row style={{ padding: "40px" }}>
              {this.state.filtered.map((repo, index) =>
                <UserCard index={index} key={repo.id} {...repo} />
              )}
            </Row>}
      </div>
    );
  }
}

export default AllUser;
