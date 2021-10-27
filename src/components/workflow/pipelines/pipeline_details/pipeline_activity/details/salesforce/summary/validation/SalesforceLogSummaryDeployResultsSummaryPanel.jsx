import React from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import {Col, Row} from "react-bootstrap";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import DateTimeField from "components/common/fields/date/DateTimeField";
import BooleanField from "components/common/fields/boolean/BooleanField";

function SalesforceLogSummaryDeployResultsSummaryPanel({ salesforceValidationLogModel }) {
  if (salesforceValidationLogModel == null) {
    return <LoadingDialog message={"Loading Pipeline"} size={'sm'} />;
  }

  const getJobDetails = () => {
    return (
      <div className={"m-3"}>
        Execution Details
        <Row>
          <Col lg={6}>
            <DateTimeField dataObject={salesforceValidationLogModel} fieldName={"createdDate"} />
          </Col>
          <Col lg={6}>
            <DateTimeField dataObject={salesforceValidationLogModel} fieldName={"lastModifiedDate"} />
          </Col>
          <Col lg={6}>
            <DateTimeField dataObject={salesforceValidationLogModel} fieldName={"startDate"} />
          </Col>
          <Col lg={6}>
            <DateTimeField dataObject={salesforceValidationLogModel} fieldName={"completedDate"} />
          </Col>
        </Row>
      </div>
    );
  };


  const getComponentDetails = () => {
    return (
      <div className={"m-3"}>
        Component Details
        <Row>
          <Col lg={12}>
            <TextFieldBase dataObject={salesforceValidationLogModel} fieldName={"numberComponentsTotal"} />
          </Col>
          <Col lg={12}>
            <TextFieldBase dataObject={salesforceValidationLogModel} fieldName={"numberComponentsDeployed"} />
          </Col>
          <Col lg={12}>
            <TextFieldBase dataObject={salesforceValidationLogModel} fieldName={"numberComponentErrors"} />
          </Col>
        </Row>
      </div>
    );
  };

  const getUnitTestDetails = () => {
    if (salesforceValidationLogModel?.getData("numberTestsTotal") === 0) {
      return (
        <div className={"m-3"}>
          Test Details
          <div className={"my-2"}>This execution did not include Unit Testing</div>
        </div>
      );
    }

    return (
      <div className={"m-3"}>
        Test Details
        <Row>
          <Col lg={12}>
            <TextFieldBase dataObject={salesforceValidationLogModel} fieldName={"numberTestsTotal"} />
          </Col>
          <Col lg={12}>
            <TextFieldBase dataObject={salesforceValidationLogModel} fieldName={"numberTestsCompleted"} />
          </Col>
          <Col lg={12}>
            <TextFieldBase dataObject={salesforceValidationLogModel} fieldName={"numberTestErrors"} />
          </Col>
        </Row>
      </div>
    );
  };

  // TODO: Make individual cards for each part
  return (
    <SummaryPanelContainer className={"mx-2"}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={salesforceValidationLogModel} fieldName={"id"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={salesforceValidationLogModel} fieldName={"status"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={salesforceValidationLogModel} fieldName={"createdBy"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={salesforceValidationLogModel} fieldName={"createdByName"} />
        </Col>
        <Col lg={6}>
          <BooleanField dataObject={salesforceValidationLogModel} fieldName={"done"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={salesforceValidationLogModel} fieldName={"messages"} />
        </Col>
        <Col lg={6}>
          <BooleanField dataObject={salesforceValidationLogModel} fieldName={"checkOnly"} />
        </Col>
        <Col lg={6}>
          <BooleanField dataObject={salesforceValidationLogModel} fieldName={"success"} />
        </Col>
        <Col lg={6}>
          <BooleanField dataObject={salesforceValidationLogModel} fieldName={"retrieveResult"} />
        </Col>
        <Col lg={6}>
          <BooleanField dataObject={salesforceValidationLogModel} fieldName={"rollbackOnError"} />
        </Col>
        <Col sm={12}>
          {getComponentDetails()}
        </Col>
        <Col sm={12}>
          {getJobDetails()}
        </Col>
        <Col sm={12}>
          {getUnitTestDetails()}
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}


SalesforceLogSummaryDeployResultsSummaryPanel.propTypes = {
  salesforceValidationLogModel: PropTypes.object,
};

export default SalesforceLogSummaryDeployResultsSummaryPanel;