import React from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import {Col, Row} from "react-bootstrap";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import FieldSubHeader from "components/common/fields/FieldSubHeader";
import BooleanField from "components/common/fields/boolean/BooleanField";
import DateTimeField from "components/common/fields/date/DateTimeField";

function SalesforceLogSummaryExecutionOverview({ salesforceDeployResultsModel }) {
  if (salesforceDeployResultsModel == null) {
    return (
      <LoadingDialog
        message={"Loading Salesforce Execution Overview"}
        size={'sm'}
      />
    );
  }

  return (
    <Row className={"my-3"}>
      <Col lg={12}><FieldSubHeader subheaderText={"Execution Overview"}/></Col>
      <Col lg={6}>
        <TextFieldBase dataObject={salesforceDeployResultsModel} fieldName={"createdByName"} />
      </Col>
      <Col lg={6}>
        <TextFieldBase dataObject={salesforceDeployResultsModel} fieldName={"id"} />
      </Col>
      <Col lg={6}>
        <DateTimeField dataObject={salesforceDeployResultsModel} fieldName={"startDate"} />
      </Col>
      <Col lg={6}>
        <DateTimeField dataObject={salesforceDeployResultsModel} fieldName={"completedDate"} />
      </Col>
      <Col lg={6}>
        <TextFieldBase dataObject={salesforceDeployResultsModel} fieldName={"status"} />
      </Col>
      <Col lg={6}>
        <BooleanField dataObject={salesforceDeployResultsModel} fieldName={"done"} />
      </Col>
      <Col lg={6}>
        <BooleanField dataObject={salesforceDeployResultsModel} fieldName={"checkOnly"} />
      </Col>
      <Col lg={6}>
        <BooleanField dataObject={salesforceDeployResultsModel} fieldName={"success"} />
      </Col>
      <Col lg={6}>
        <BooleanField dataObject={salesforceDeployResultsModel} fieldName={"retrieveResult"} />
      </Col>
      <Col lg={6}>
        <BooleanField dataObject={salesforceDeployResultsModel} fieldName={"rollbackOnError"}/>
      </Col>
    </Row>
  );
}


SalesforceLogSummaryExecutionOverview.propTypes = {
  salesforceDeployResultsModel: PropTypes.object,
};

export default SalesforceLogSummaryExecutionOverview;