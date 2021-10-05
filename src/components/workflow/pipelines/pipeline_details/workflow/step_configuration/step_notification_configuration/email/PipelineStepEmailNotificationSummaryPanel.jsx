import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import BooleanField from "components/common/fields/boolean/BooleanField";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import EmailAddressField from "components/common/fields/text/email/EmailAddressField";

function PipelineStepEmailNotificationSummaryPanel({ emailNotificationModel }) {
  if (emailNotificationModel == null) {
    return (<LoadingDialog size={"sm"} message={"Loading Summary"} />);
  }

  return (
    <SummaryPanelContainer>
      <Row>
        <Col lg={6}>
          <BooleanField dataObject={emailNotificationModel} fieldName={"enabled"} />
        </Col>
        <Col lg={6}>
          <EmailAddressField fieldName={"address"} dataObject={emailNotificationModel} />
        </Col>
        <Col lg={6}>
          <TextFieldBase fieldName={"event"} dataObject={emailNotificationModel} />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

PipelineStepEmailNotificationSummaryPanel.propTypes = {
  emailNotificationModel: PropTypes.object,
};

export default PipelineStepEmailNotificationSummaryPanel;
