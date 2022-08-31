import PropTypes from "prop-types";
import React from "react";
import Row from "react-bootstrap/Row";
import { Col } from "react-bootstrap";
import { hasStringValue } from "components/common/helpers/string-helpers";

export default function GitlabToolCardBody(
  {
    toolModel,
  }) {
  const getUsernameField = () => {
    if (hasStringValue(toolModel?.getData("configuration.accountUsername")) === true) {
      return(
        <Col xs={12} className={"mb-2"}>
          <span className="mr-2 text-muted">Username</span>
          <div>{toolModel?.getData("configuration.accountUsername")}</div>
        </Col>
      );
    }
  };

  if (toolModel == null) {
    return undefined;
  }

  return (
    <>
      {getUsernameField()}
    </>
  );
}

GitlabToolCardBody.propTypes = {
  toolModel: PropTypes.object,
};