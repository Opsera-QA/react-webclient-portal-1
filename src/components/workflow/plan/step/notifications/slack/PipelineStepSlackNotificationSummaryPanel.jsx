import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import BooleanField from "components/common/fields/boolean/BooleanField";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";

function PipelineStepSlackNotificationSummaryPanel({ slackNotificationModel }) {
  if (slackNotificationModel == null) {
    return (<LoadingDialog size={"sm"} message={"Loading Summary"} />);
  }

  return (
    <SummaryPanelContainer>
      <Row>
        <Col lg={6}>
          <BooleanField dataObject={slackNotificationModel} fieldName={"enabled"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase fieldName={"event"} dataObject={slackNotificationModel} />
        </Col>
        <Col lg={6}>
          <TextFieldBase fieldName={"channel"} dataObject={slackNotificationModel} />
        </Col>
        <Col lg={6}>
          <TextFieldBase fieldName={"toolId"} dataObject={slackNotificationModel} />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

PipelineStepSlackNotificationSummaryPanel.propTypes = {
  slackNotificationModel: PropTypes.object,
};

export default PipelineStepSlackNotificationSummaryPanel;
