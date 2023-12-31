import React from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";


function UserInfo({ user }) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Organization</th>
          <th>Domain</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{user.firstName}</td>
          <td>{user.email}</td>
          <td>{user.organizationName}</td>
          <td>{user.domain}</td>
        </tr>
      </tbody>
    </Table>
  );
}

UserInfo.propTypes = {
  user: PropTypes.object,
};

export default UserInfo;
