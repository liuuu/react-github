//  @flow
import React from "react";
import { Card, Avatar, Col, Row, Spin } from "antd";
import axios from "axios";
import { getProfile } from "./api";
import { Link, Prompt } from "react-router-dom";

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
  state: {
    detail?: Show
  };
  props: {
    match: {
      params: {
        projectId: string
      }
    }
  };

  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    const name: string = this.props.match.params.projectId;

    getProfile(name).then(data =>
      this.setState({
        detail: data
      })
    );
  }

  render() {
    const detail = this.state.detail;
    if (!this.state.detail) {
      return <div />;
    }
    return (
      <div className="user-detail">
        <Row type="flex" justify="center" style={{ marginTop: 50 }}>
          <Col span={13}>
            <Card bodyStyle={{ padding: 0 }} bordered={false}>

              <ul className="space-list-item">
                <li>
                  <img
                    style={{ width: "70%" }}
                    className="avatar"
                    src={detail.avatar_url}
                    alt={detail.login}
                  />
                </li>
                <li><p>{detail.name}</p></li>

                <li>{detail.bio}</li>
                <li><Link to="/all">back to all</Link></li>

              </ul>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default UserDetail;
