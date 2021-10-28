import React from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import {Col, Row} from "react-bootstrap";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import FieldSubHeader from "components/common/fields/FieldSubHeader";

function SalesforceLogSummaryUnitTestOverview({ salesforceDeployResultsModel }) {

  const getBody = () => {
    if (salesforceDeployResultsModel?.getData("numberTestsTotal") === 0) {
      return (
        <Col lg={12} className={"my-2"}>
          This execution did not include Unit Testing
        </Col>
      );
    }

    return (
      <>
        <Col lg={12}>
          <TextFieldBase dataObject={salesforceDeployResultsModel} fieldName={"numberTestsTotal"}/>
        </Col>
        <Col lg={12}>
          <TextFieldBase dataObject={salesforceDeployResultsModel} fieldName={"numberTestsCompleted"}/>
        </Col>
        <Col lg={12}>
          <TextFieldBase dataObject={salesforceDeployResultsModel} fieldName={"numberTestErrors"}/>
        </Col>
      </>
    );
  };

  if (salesforceDeployResultsModel == null) {
    return (
      <LoadingDialog
        message={"Loading Salesforce Unit Test Overview"}
        size={'sm'}
      />
    );
  }

  return (
    <Row className={"my-3"}>
      <Col lg={12}><FieldSubHeader subheaderText={"Unit Test Overview"}/></Col>
      {getBody()}
    </Row>
  );
}


SalesforceLogSummaryUnitTestOverview.propTypes = {
  salesforceDeployResultsModel: PropTypes.object,
};

export default SalesforceLogSummaryUnitTestOverview;