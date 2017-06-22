// @flow
import React from "react";
import { Row, Span, Card, Col, Avatar, Input, Icon, Spin } from "antd";
import axios from "axios";
import { fetchPopularRepos } from "./api.js";
import { Link } from "react-router-dom";

import _ from "lodash";
import ReactLoading from "react-loading";

type User = {
  title: string,
  description: string,
  year: string,
  imdbID: string,
  poster: string,
  trailer: string,
  name: string,
  id: string,
  style: mixed,
  owner: {
    login: string,
    avatar_url: string
  },
  key: string,
  stargazers_count: string
};

type UserCardInfo = {
  ...User,
  index: number
};

class AllUser extends React.Component {
  state: {
    isLoading: boolean,
    repos: Array<User>,
    repos2: Array<User>
  };

  handleChange: () => void;
  filterItem: () => void;
  debouncedSearch: (value: string) => void;

  constructor() {
    super();
    this.state = {
      isLoading: true,
      repos: [],
      repos2: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.filterItem = this.filterItem.bind(this);
    this.debouncedSearch = _.debounce(this.filterItem, 1000);
  }

  componentDidMount() {
    if (this.state.repos.length === 0) {
      fetchPopularRepos("all").then((repos: Array<User>) => {
        this.setState({
          isLoading: false,
          repos: repos,
          repos2: repos
        });
      });
    }
  }

  handleChange(e: SyntheticKeyboardEvent & { target: HTMLInputElement }) {
    const value = e.target.value;
    console.log("value:", value);
    this.debouncedSearch(value);
  }

  filterItem(value: string) {
    const filtered = this.state.repos.filter(
      repo => repo.name.toUpperCase().indexOf(value.toUpperCase()) >= 0
    );
    this.setState({
      repos2: filtered
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div>
          <Input
            onChange={this.handleChange}
            style={{ display: "inline-block", width: "40%", marginTop: 30 }}
            addonBefore={<Icon type="search" />}
            size="large"
            placeholder="filter the projects"
          />
          <div style={{ marginTop: 150 }}>

            <Spin />
            <Spin />
            <Spin />
            <Spin />
            <Spin />
          </div>

        </div>
      );
    }
    return (
      <div>
        <div>
          <Input
            onChange={this.handleChange}
            style={{ display: "inline-block", width: "40%", marginTop: 30 }}
            addonBefore={<Icon type="search" />}
            size="large"
            placeholder="filter the projects"
          />
        </div>
        <Row style={{ padding: "40px" }}>
          {this.state.repos2.map((repo, index) =>
            <UserCard index={index} key={repo.id} {...repo} />
          )}
        </Row>
      </div>
    );
  }
}

const UserCard = (props: UserCardInfo) => {
  return (
    <Col span={8} style={props.style} style={{ padding: "20px" }}>
      <Link to={`/user/${props.owner.login}`} style={{ color: "black" }}>
        <Card>
          <div className="popular-rank">#{parseInt(`${props.index}`) + 1}</div>
          <ul className="space-list-item">
            <li>
              <Avatar
                className="avatar"
                src={props.owner.avatar_url}
                alt={props.owner.login}
              />
            </li>
            <li><p>{props.name}</p></li>
            <li>@{props.owner.login}</li>
            <li>Stars: {props.stargazers_count}</li>
          </ul>

        </Card>
      </Link>
    </Col>
  );
};

export default AllUser;
