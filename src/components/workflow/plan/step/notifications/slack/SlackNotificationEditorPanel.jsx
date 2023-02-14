import React from "react";
import PropTypes from "prop-types";
import EnabledNotificationBooleanToggle from "components/workflow/plan/step/notifications/EnabledNotificationBooleanToggle";
import OrchestrationNotificationLevelSelectInput from "components/workflow/plan/step/notifications/OrchestrationNotificationLevelSelectInput";
import SlackStepNotificationToolInput
  from "components/workflow/plan/step/notifications/slack/SlackStepNotificationToolInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import ConnectToToolMessage from "components/common/fields/inventory/messages/ConnectToToolMessage";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function SlackNotificationEditorPanel(
  {
    slackNotificationModel,
    setSlackNotificationModel,
  }) {

  if (slackNotificationModel == null) {
    return null;
  }

  return (
    <Row>
      <Col xs={12}>
        <EnabledNotificationBooleanToggle
          model={slackNotificationModel}
          setModel={setSlackNotificationModel}
        />
      </Col>
      <Col xs={12}>
        <ConnectToToolMessage toolFriendlyName={"Slack"}/>
      </Col>
      <Col xs={12}>
        <OrchestrationNotificationLevelSelectInput
          model={slackNotificationModel}
          setModel={setSlackNotificationModel}
        />
      </Col>
      <Col xs={12}>
        <SlackStepNotificationToolInput
          setDataObject={setSlackNotificationModel}
          dataObject={slackNotificationModel}
        />
      </Col>
      <Col xs={12}>
        <TextInputBase
          fieldName={"channel"}
          dataObject={slackNotificationModel}
          setDataObject={setSlackNotificationModel}
          disabled={slackNotificationModel?.getData("enabled") === false}
        />
      </Col>
      <Col xs={12}>
        <BooleanToggleInput
          dataObject={slackNotificationModel}
          setDataObject={setSlackNotificationModel}
          disabled={slackNotificationModel?.getData("enabled") === false}
          fieldName={"logEnabled"}
        />
      </Col>
    </Row>
  );
}

SlackNotificationEditorPanel.propTypes = {
  slackNotificationModel: PropTypes.object,
  setSlackNotificationModel: PropTypes.func,
};

export default SlackNotificationEditorPanel;