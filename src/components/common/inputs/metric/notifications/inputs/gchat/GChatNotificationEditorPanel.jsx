import React from "react";
import PropTypes from "prop-types";
import PipelineStepNotificationBooleanToggle from "components/workflow/plan/step/notifications/PipelineStepNotificationBooleanToggle";
import GChatStepNotificationToolSelectInput
  from "components/workflow/plan/step/notifications/gchat/GChatStepNotificationToolSelectInput";
import ConnectToToolMessage from "components/common/fields/inventory/messages/ConnectToToolMessage";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function GChatNotificationEditorPanel(
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
        <GChatStepNotificationToolSelectInput
          model={gChatNotificationModel}
          setModel={setGChatNotificationModel}
        />
      </Col>
    </Row>
);
}

GChatNotificationEditorPanel.propTypes = {
  gChatNotificationModel: PropTypes.object,
  setGChatNotificationModel: PropTypes.func,
};

export default GChatNotificationEditorPanel;
