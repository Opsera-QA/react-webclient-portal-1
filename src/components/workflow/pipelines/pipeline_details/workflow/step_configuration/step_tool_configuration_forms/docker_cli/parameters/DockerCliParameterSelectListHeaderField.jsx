import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function DockerCliParameterSelectListHeaderField() {
  return (
    <div className="d-flex justify-content-between page-description">
      <Col sm={11}>
        <Row>
          <Col sm={6} className={"pl-2 pr-0 py-2"}>
            <label >
              <span>Parameter ID</span>
            </label>
          </Col>
          <Col sm={6} className={"pl-2 pr-0 py-2"}>
          <label >
              <span>Output Key</span>
            </label>
          </Col>
        </Row>
      </Col>
    </div>
  );
}
