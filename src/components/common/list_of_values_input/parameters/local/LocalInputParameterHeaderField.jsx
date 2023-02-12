import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function LocalInputParameterHeaderField() {

  return (
    <div className={"page-description"}>
      <Col sm={11}>
        <Row>
          <Col sm={6} className={"pl-2 pr-0 py-2"}>
            <span className="text-muted">Local Parameter Name</span>
          </Col>
          <Col sm={6} className={"pl-2 pr-0 py-2"}>
            <span className="text-muted">Value</span>
          </Col>
        </Row>
      </Col>
    </div>
  );
}

LocalInputParameterHeaderField.propTypes = {};
