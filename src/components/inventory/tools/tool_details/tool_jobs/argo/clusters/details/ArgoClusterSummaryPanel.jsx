import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";

function ArgoClusterSummaryPanel({ argoClusterData } ) {
  if (argoClusterData == null) {
    return null;
  }

  return (
    <div className="scroll-y pt-3 px-3 hide-x-overflow">
      <div className="mb-3 flat-top-content-block p-3 detail-view-summary">
        <Row>
          <Col lg={12}>
            <TextFieldBase dataObject={argoClusterData} fieldName={"clusterName"} />
          </Col>
          <Col lg={6}>
            <TextFieldBase dataObject={argoClusterData} fieldName={"platform"} />
          </Col>
          <Col lg={6}>
            <TextFieldBase dataObject={argoClusterData} fieldName={"resourceGroup"} />
          </Col>
        </Row>
      </div>
    </div>
  );
}

ArgoClusterSummaryPanel.propTypes = {
  argoClusterData: PropTypes.object,
};


export default ArgoClusterSummaryPanel;
