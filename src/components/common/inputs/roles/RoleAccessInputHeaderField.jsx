import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function RoleAccessInputHeaderField() {
  return (
    <div className={"d-flex py-1 filter-bg-white"}>
      <Col sm={11}>
        <Row>
          <Col sm={4}>
            {/*<span className="text-muted ml-5">Type</span>*/}
          </Col>
          <Col sm={4} className={"mx-auto"}>
            <span className={"text-muted"}>Assignee</span>
          </Col>
          <Col sm={4} className={"mx-auto"}>
            <span className={"text-muted"}>Access Type</span>
          </Col>
        </Row>
      </Col>
      <Col sm={1} className={"pr-3 pl-0 delete-button"} />
    </div>
  );
}

RoleAccessInputHeaderField.propTypes = {};
