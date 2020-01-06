import React from "react"
import { Row, Col } from 'react-bootstrap';

function UserInfo({user}) {
  return (
    <div className="grid-striped">
      <Row style={{ marginTop: 20 }}>
        <Col lg={4} style={{ fontWeight: 'bold' }}>User Info</Col>
        <Col lg={2}>Phone</Col>
        <Col lg={1}>Organization Name</Col>
        <Col lg={2}>Domain</Col>
      </Row>
      <Row>
        <Col lg={12}>{user.firstName} {user.lastName}</Col>
        <Col lg={12}>{user.phone}</Col>
        <Col lg={12}>{user.organizationName}</Col>
        <Col lg={12}>{user.domain}</Col>
      </Row>
    </div>
  )
}
export default UserInfo
