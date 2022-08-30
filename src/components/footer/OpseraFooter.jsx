import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function OpseraFooter() {
  return (
    <Row className={"fixed-row-footer-bottom"}>
      <Col className={"text-center m-1 p-0"} style={{ fontSize: ".6em" }}>
        <span>{`© ${new Date().getFullYear()} Opsera, Inc. The Continuous Orchestration Platform™`}</span>
      </Col>
    </Row>
  );
}

OpseraFooter.propTypes = {};

export default React.memo(OpseraFooter);
