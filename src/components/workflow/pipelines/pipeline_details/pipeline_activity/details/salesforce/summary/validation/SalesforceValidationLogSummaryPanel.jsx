import React, {useState} from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import {Col, Row} from "react-bootstrap";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import DateTimeField from "components/common/fields/date/DateTimeField";

function SalesforceValidationLogSummaryPanel({ salesforceValidationLogModel }) {
  if (salesforceValidationLogModel == null) {
    return <LoadingDialog message={"Loading Pipeline"} size={'sm'} />;
  }

  return (
    <SummaryPanelContainer>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={salesforceValidationLogModel} fieldName={"name"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={salesforceValidationLogModel} fieldName={"scope"} />
        </Col>
        <Col lg={6}>
          <DateTimeField dataObject={salesforceValidationLogModel} fieldName={"createdAt"} />
        </Col>
        <Col lg={6}>
          <DateTimeField dataObject={salesforceValidationLogModel} fieldName={"expiration"} />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}


SalesforceValidationLogSummaryPanel.propTypes = {
  salesforceValidationLogModel: PropTypes.object,
};

export default SalesforceValidationLogSummaryPanel;