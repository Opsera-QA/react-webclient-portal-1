import PropTypes from "prop-types";
import React from "react";
import Row from "react-bootstrap/Row";
import { Col } from "react-bootstrap";
import DescriptionField from "components/common/fields/text/DescriptionField";

export default function ToolIdentifierCardBody(
  {
    toolIdentifierModel,
  }) {

  if (toolIdentifierModel == null) {
    return undefined;
  }

  return (
    <div
      style={{
        minHeight: "57px",
      }}
    >
      <Row className={"small"}>
        <Col xs={12}>
          <DescriptionField
            dataObject={toolIdentifierModel}
            characterLimit={500}
            className={"dummy"}
          />
        </Col>
      </Row>
    </div>
  );
}

ToolIdentifierCardBody.propTypes = {
  toolIdentifierModel: PropTypes.object,
};