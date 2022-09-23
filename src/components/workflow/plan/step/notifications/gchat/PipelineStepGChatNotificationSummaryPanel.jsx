import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import BooleanField from "components/common/fields/boolean/BooleanField";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";

function PipelineStepGChatNotificationSummaryPanel({ gChatNotificationModel }) {
  if (gChatNotificationModel == null) {
    return (<LoadingDialog size={"sm"} message={"Loading Summary"} />);
  }

  return (
    <SummaryPanelContainer>
      <Row>
        <Col lg={6}>
          <BooleanField dataObject={gChatNotificationModel} fieldName={"enabled"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase fieldName={"event"} dataObject={gChatNotificationModel} />
        </Col>
        <Col lg={6}>
          <TextFieldBase fieldName={"toolId"} dataObject={gChatNotificationModel} />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

PipelineStepGChatNotificationSummaryPanel.propTypes = {
  gChatNotificationModel: PropTypes.object,
};

export default PipelineStepGChatNotificationSummaryPanel;
