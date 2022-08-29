import PropTypes from "prop-types";
import React from "react";
import Row from "react-bootstrap/Row";
import { Col } from "react-bootstrap";

export default function GitlabToolCardBody(
  {
    toolModel,
  }) {
  if (toolModel == null) {
    return undefined;
  }

  return (
    <>
      <Col xs={12} className={"mb-2"}>
        <span className="mr-2">Username:</span>{toolModel?.getData("configuration.accountUsername")}
      </Col>
    </>
  );
}

GitlabToolCardBody.propTypes = {
  toolModel: PropTypes.object,
};