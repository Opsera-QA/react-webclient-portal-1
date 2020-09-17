import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import LoadingDialog from "../../../../../../../common/status_notifications/loading";

// TODO: Implement
function ArgoApplicationSummaryPanel({ argoApplicationData } ) {

  if (argoApplicationData == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <div className="scroll-y pt-3 px-3">
      <div className="mb-3 flat-top-content-block p-3 detail-view-summary">
        <Row>
          {/*<Col lg={6}>*/}
          {/*  <DtoTextField dataObject={argoApplicationData} fieldName={""} />*/}
          {/*</Col>*/}
        </Row>
      </div>
    </div>
  );
}

ArgoApplicationSummaryPanel.propTypes = {
  argoApplicationData: PropTypes.object,
};


export default ArgoApplicationSummaryPanel;
