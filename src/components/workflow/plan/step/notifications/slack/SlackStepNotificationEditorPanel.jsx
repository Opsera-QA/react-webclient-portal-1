import React from "react";
import PropTypes from "prop-types";
import PipelineStepNotificationBooleanToggle from "components/workflow/plan/step/notifications/PipelineStepNotificationBooleanToggle";
import PipelineStepNotificationLevelSelectInput from "components/workflow/plan/step/notifications/PipelineStepNotificationLevelSelectInput";
import SlackStepNotificationToolInput
  from "components/workflow/plan/step/notifications/slack/SlackStepNotificationToolInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import ConnectToToolMessage from "components/common/fields/inventory/messages/ConnectToToolMessage";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function SlackStepNotificationEditorPanel(
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
        <PipelineStepNotificationBooleanToggle
          model={slackNotificationModel}
          setModel={setSlackNotificationModel}
        />
      </Col>
      <Col xs={12}>
        <ConnectToToolMessage toolFriendlyName={"Slack"}/>
      </Col>
      <Col xs={12}>
        <PipelineStepNotificationLevelSelectInput
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
        />
      </Col>
    </Row>
  );
}

SlackStepNotificationEditorPanel.propTypes = {
  slackNotificationModel: PropTypes.object,
  setSlackNotificationModel: PropTypes.func,
};

export default SlackStepNotificationEditorPanel;