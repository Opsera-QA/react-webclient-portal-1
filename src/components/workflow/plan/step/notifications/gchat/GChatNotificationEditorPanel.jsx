import React from "react";
import PropTypes from "prop-types";
import EnabledNotificationBooleanToggle from "components/workflow/plan/step/notifications/EnabledNotificationBooleanToggle";
import OrchestrationNotificationLevelSelectInput from "components/workflow/plan/step/notifications/OrchestrationNotificationLevelSelectInput";
import GChatStepNotificationToolSelectInput
  from "components/workflow/plan/step/notifications/gchat/GChatStepNotificationToolSelectInput";
import ConnectToToolMessage from "components/common/fields/inventory/messages/ConnectToToolMessage";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function GChatNotificationEditorPanel(
  {
    gChatNotificationModel,
    setGChatNotificationModel,
    showOrchestrationFields,
  }) {
  const getOrchestrationFields = () => {
    if (showOrchestrationFields !== false) {
      return (
        <>
          <Col xs={12}>
            <OrchestrationNotificationLevelSelectInput
              model={gChatNotificationModel}
              setModel={setGChatNotificationModel}
            />
          </Col>
          <Col xs={12}>
            <BooleanToggleInput
              dataObject={gChatNotificationModel}
              setDataObject={setGChatNotificationModel}
              disabled={gChatNotificationModel?.getData("enabled") === false}
              fieldName={"logEnabled"}
            />
          </Col>
        </>
      );
    }
  };

  if (gChatNotificationModel == null) {
    return null;
  }

  return (
    <Row>
      <Col xs={12}>
        <EnabledNotificationBooleanToggle
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
      {getOrchestrationFields()}
    </Row>
);
}

GChatNotificationEditorPanel.propTypes = {
  gChatNotificationModel: PropTypes.object,
  setGChatNotificationModel: PropTypes.func,
  showOrchestrationFields: PropTypes.bool,
};

export default GChatNotificationEditorPanel;
