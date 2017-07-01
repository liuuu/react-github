//  @flow
import React from "react";
import { Card, Avatar, Col, Row, Spin } from "antd";
import axios from "axios";
import * as Api from "../api";
import { Link, Prompt } from "react-router-dom";
import UserDetails from "../components/UserDetails";

type Show = {
  title: string,
  description: string,
  year: string,
  imdbID: string,
  poster: string,
  trailer: string
};

type User = {
  name: string,
  login: string,
  avatar_url: string,
  bio: string
};

class UserDetail extends React.Component {
  state: {};
  props: {
    match: {
      params: {
        projectId: string
      }
    }
  };

  constructor() {
    super();
    this.state = {
      detail: null
    };
  }

  componentDidMount() {
    // for the test so shotcut the get, don't know the conventions
    const name = this.props.match && this.props.match.params.projectId;

    Api.getProfile(name).then(({ data }) =>
      this.setState({
        detail: data
      })
    );
  }

  render() {
    console.log(this.state.detail === null);
    return (
      <div>
        {this.state.detail
          ? <UserDetails detail={this.state.detail} />
          : <div><Spin /></div>}
      </div>
    );
  }
}

export default UserDetail;
