import React from "react";
import { Card, Avatar, Col, Row, Spin } from "antd";
import { Link } from "react-router-dom";

const UserDetails = ({ detail }) =>
  <div className="user-detail">
    <Row type="flex" justify="center" style={{ marginTop: 50 }}>
      <Col span={10}>
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
  </div>;

export default UserDetails;
