import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";

function ArgoRepositorySummaryPanel({ argoRepositoryData } ) {
  if (argoRepositoryData == null) {
    return null;
  }

  return (
    <div className="scroll-y pt-3 px-3 hide-x-overflow">
      <div className="mb-3 flat-top-content-block p-3 detail-view-summary">
        <Row>
          <Col lg={12}>
            <TextFieldBase dataObject={argoRepositoryData} fieldName={"name"} />
          </Col>
          <Col lg={6}>
            <TextFieldBase dataObject={argoRepositoryData} fieldName={"service"} />
          </Col>
          <Col lg={6}>
            <TextFieldBase dataObject={argoRepositoryData} fieldName={"repository"} />
          </Col>
          <Col lg={6}>
            <TextFieldBase dataObject={argoRepositoryData} fieldName={"repositoryType"} />
          </Col>
        </Row>
      </div>
    </div>
  );
}

ArgoRepositorySummaryPanel.propTypes = {
  argoRepositoryData: PropTypes.object,
};


export default ArgoRepositorySummaryPanel;
