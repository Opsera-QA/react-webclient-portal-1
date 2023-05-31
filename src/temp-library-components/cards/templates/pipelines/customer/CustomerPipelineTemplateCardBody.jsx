import PropTypes from "prop-types";
import React from "react";
import Row from "react-bootstrap/Row";
import {Col} from "react-bootstrap";
import {truncateString} from "components/common/helpers/string-helpers";

export default function CustomerPipelineTemplateCardBody(
  {
    template,
  }) {
  if (template == null) {
    return undefined;
  }

  return (
    <div className={"mb-1"}>
      <Row className={"small"}>
        <Col xs={12}>
          <div
            className={"w-100 d-flex mt-2"}
            style={{
              minHeight: "50px",
              maxHeight: "50px",
            }}
          >
            {truncateString(template?.description, 150)}
          </div>
        </Col>
      </Row>
    </div>
  );
}

CustomerPipelineTemplateCardBody.propTypes = {
  template: PropTypes.object,
};
