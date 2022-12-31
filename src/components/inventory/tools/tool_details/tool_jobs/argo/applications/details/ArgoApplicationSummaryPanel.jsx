import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";

function ArgoApplicationSummaryPanel({ argoApplicationData } ) {
  if (argoApplicationData == null) {
    return null;
  }

  return (
    <div className="scroll-y pt-3 px-3 hide-x-overflow">
      <div className="mb-3 flat-top-content-block p-3 detail-view-summary">
        <Row>
          <Col lg={12}>
            <TextFieldBase dataObject={argoApplicationData} fieldName={"Project Name"} />
          </Col>
          <Col lg={6}>
            <TextFieldBase dataObject={argoApplicationData} fieldName={"Project Name"} />
          </Col>
          <Col lg={6}>
            <TextFieldBase dataObject={argoApplicationData} fieldName={"Project Name"} />
          </Col>
          <Col lg={6}>
            <TextFieldBase dataObject={argoApplicationData} fieldName={"Project Name"} />
          </Col>
        </Row>
      </div>
    </div>
  );
}

ArgoApplicationSummaryPanel.propTypes = {
  argoApplicationData: PropTypes.object,
};


export default ArgoApplicationSummaryPanel;
