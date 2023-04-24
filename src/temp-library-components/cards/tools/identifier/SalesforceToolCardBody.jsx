import PropTypes from "prop-types";
import React from "react";
import { Col } from "react-bootstrap";
import { hasStringValue } from "components/common/helpers/string-helpers";

export default function SalesforceToolCardBody(
  {
    toolModel,
  }) {
  const getUsernameField = () => {
    if (hasStringValue(toolModel?.getData("configuration.accountUsername")) === true) {
      return(
        <Col xs={12} className={"mb-2"}>
          <span className="mr-2 text-muted">Username</span>
          <div className={"force-text-wrap"}>{toolModel?.getData("configuration.accountUsername")}</div>
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

SalesforceToolCardBody.propTypes = {
  toolModel: PropTypes.object,
};