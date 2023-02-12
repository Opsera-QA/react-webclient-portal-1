import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function EditableParameterMappingHeaderField() {
  return (
    <div className="d-flex py-1">
      <Col sm={11}>
        <Row>
          <Col sm={6} className={"mx-auto"}>
            <span className="text-muted">Parameter</span>
          </Col>
          <Col sm={6} className={"mx-auto"}>
            <span className="text-muted">Key</span>
          </Col>
        </Row>
      </Col>
      <Col sm={1} className={"pr-3 pl-0 delete-button"} />
    </div>
  );
}
