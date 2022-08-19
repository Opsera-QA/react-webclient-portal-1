import React from "react";
import PropTypes from "prop-types";
import PipelineStepNotificationBooleanToggle from "components/workflow/plan/step/notifications/PipelineStepNotificationBooleanToggle";
import OrchestrationNotificationLevelSelectInput from "components/workflow/plan/step/notifications/OrchestrationNotificationLevelSelectInput";
import GChatStepNotificationToolSelectInput
  from "components/workflow/plan/step/notifications/gchat/GChatStepNotificationToolSelectInput";
import ConnectToToolMessage from "components/common/fields/inventory/messages/ConnectToToolMessage";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function GChatStepNotificationEditorPanel(
  {
    gChatNotificationModel,
    setGChatNotificationModel,
  }) {

  if (gChatNotificationModel == null) {
    return null;
  }

  return (
    <Row>
      <Col xs={12}>
        <PipelineStepNotificationBooleanToggle
          model={gChatNotificationModel}
          setModel={setGChatNotificationModel}
        />
      </Col>
      <Col xs={12}>
        <ConnectToToolMessage toolFriendlyName={"Google Chat"}/>
      </Col>
      <Col xs={12}>
        <OrchestrationNotificationLevelSelectInput
          model={gChatNotificationModel}
          setModel={setGChatNotificationModel}
        />
      </Col>
      <Col xs={12}>
        <GChatStepNotificationToolSelectInput
          model={gChatNotificationModel}
          setModel={setGChatNotificationModel}
        />
      </Col>
    </Row>
);
}

GChatStepNotificationEditorPanel.propTypes = {
  gChatNotificationModel: PropTypes.object,
  setGChatNotificationModel: PropTypes.func,
};

export default GChatStepNotificationEditorPanel;
