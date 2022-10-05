import React from "react";
import { Col, Row } from "react-bootstrap";

export default function GithubActionsWorkflowWarningMessage() {
  return (
    <Row>
      <Col xs={12} className={"w-100 d-flex"}>
        <div className={"ml-auto mr-2"}>
          {"* Average times may be higher than seen in GitHub due to workflow runs being re-tried or re-run. Duration is considered from the first run attempt to the final attempt."}
        </div>
      </Col>
    </Row>
  );
}

GithubActionsWorkflowWarningMessage.propTypes = {};
