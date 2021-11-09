import React from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import {Col, Row} from "react-bootstrap";
import H4FieldSubHeader from "components/common/fields/subheader/H4FieldSubHeader";

function SalesforceLogSummaryCodeCoverageOverview({ salesforceDeployResultsModel }) {
 
  const getBody = () => {
    if (salesforceDeployResultsModel?.getData("details")?.runTestResult?.codeCoverageWarnings?.length === 0) {
      return (
        <Col lg={12} className={"my-2"}>
          No Code Coverage information found.
        </Col>
      );
    }

    return (
      <>
        <Col lg={12}>
          <div className={"my-2"}>
            <div className="w-100 d-flex">
              <label className="mb-0 mr-2 text-muted"><span>Code Coverage Errors:</span></label>
              <span>{salesforceDeployResultsModel?.getData("details")?.runTestResult?.codeCoverageWarnings?.length}</span>
            </div>
          </div>
        </Col>
      </>
    );
  };

  if (salesforceDeployResultsModel == null) {
    return (
      <LoadingDialog
        message={"Loading Salesforce Code Coverage information"}
        size={'sm'}
      />
    );
  }

  return (
    <Row className={"my-3"}>
      <Col lg={12}><H4FieldSubHeader subheaderText={"Code Coverage Overview"}/></Col>
      {getBody()}
    </Row>
  );
}


SalesforceLogSummaryCodeCoverageOverview.propTypes = {
  salesforceDeployResultsModel: PropTypes.object,
};

export default SalesforceLogSummaryCodeCoverageOverview;