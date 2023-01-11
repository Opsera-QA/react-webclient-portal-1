import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function RoleAccessInputHeaderField() {
  return (
    <div className={"d-flex py-1 filter-bg-white"}>
      <Col sm={10}>
        <Row>
          <Col sm={4} className={"d-flex"}>
            <div>Access Control Type</div>
          </Col>
          <Col sm={4} className={"d-flex"}>
            <div>Assignee</div>
          </Col>
          <Col sm={4} className={"d-flex"}>
            <div>Access Type</div>
          </Col>
        </Row>
      </Col>
      <Col sm={2} />
    </div>
  );
}

RoleAccessInputHeaderField.propTypes = {};
