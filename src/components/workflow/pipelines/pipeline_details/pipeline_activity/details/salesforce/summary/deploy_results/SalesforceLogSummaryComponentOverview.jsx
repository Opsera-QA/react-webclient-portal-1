import React from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import {Col, Row} from "react-bootstrap";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import H4FieldSubHeader from "components/common/fields/subheader/H4FieldSubHeader";

function SalesforceLogSummaryComponentOverview({ salesforceDeployResultsModel }) {

  const getBody = () => {
    if (salesforceDeployResultsModel?.getData("numberComponentsTotal") === 0) {
      return (
        <Col lg={12} className={"my-2"}>
          This execution did not include Components
        </Col>
      );
    }

    return (
      <>
        <Col lg={12}>
          <TextFieldBase dataObject={salesforceDeployResultsModel} fieldName={"numberComponentsTotal"}/>
        </Col>
        <Col lg={12}>
          <TextFieldBase dataObject={salesforceDeployResultsModel} fieldName={"numberComponentsDeployed"}/>
        </Col>
        <Col lg={12}>
          <TextFieldBase dataObject={salesforceDeployResultsModel} fieldName={"numberComponentErrors"}/>
        </Col>
      </>
    );
  };

  if (salesforceDeployResultsModel == null) {
    return (
      <LoadingDialog
        message={"Loading Salesforce Component Overview"}
        size={'sm'}
      />
    );
  }

  return (
    <Row className={"my-3"}>
      <Col lg={12}><H4FieldSubHeader subheaderText={"Component Overview"}/></Col>
      {getBody()}
    </Row>
  );
}


SalesforceLogSummaryComponentOverview.propTypes = {
  salesforceDeployResultsModel: PropTypes.object,
};

export default SalesforceLogSummaryComponentOverview;