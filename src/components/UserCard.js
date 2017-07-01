import React from "react";
import { Col, Card, Avatar } from "antd";
import { Link } from "react-router-dom";

const UserCard = props => {
  return (
    <div className="usercard">
      <Col span={8} style={props.style} style={{ padding: "20px" }}>
        <Link to={`/user/${props.owner.login}`} style={{ color: "black" }}>
          <Card>
            <div className="popular-rank">
              #{parseInt(`${props.index}`) + 1}
            </div>
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
    </div>
  );
};
UserCard.defaultProps = {
  owner: {
    login: "testing"
  }
};
export default UserCard;
