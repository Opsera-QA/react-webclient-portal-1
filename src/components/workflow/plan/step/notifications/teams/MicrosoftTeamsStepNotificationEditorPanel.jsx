import React from "react";
import PropTypes from "prop-types";
import PipelineStepNotificationBooleanToggle from "components/workflow/plan/step/notifications/PipelineStepNotificationBooleanToggle";
import OrchestrationNotificationLevelSelectInput from "components/workflow/plan/step/notifications/OrchestrationNotificationLevelSelectInput";
import TeamsStepNotificationTeamsToolSelectInput
  from "components/workflow/plan/step/notifications/teams/TeamsStepNotificationTeamsToolSelectInput";
import ConnectToToolMessage from "components/common/fields/inventory/messages/ConnectToToolMessage";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

function MicrosoftTeamsStepNotificationEditorPanel(
  {
    teamsNotificationModel,
    setTeamsNotificationModel,
  }) {

  if (teamsNotificationModel == null) {
    return null;
  }

  return (
    <Row>
      <Col xs={12}>
        <PipelineStepNotificationBooleanToggle
          model={teamsNotificationModel}
          setModel={setTeamsNotificationModel}
        />
      </Col>
      <Col xs={12}>
        <ConnectToToolMessage toolFriendlyName={"Microsoft Teams"}/>
      </Col>
      <Col xs={12}>
        <OrchestrationNotificationLevelSelectInput
          model={teamsNotificationModel}
          setModel={setTeamsNotificationModel}
        />
      </Col>
      <Col xs={12}>
        <TeamsStepNotificationTeamsToolSelectInput
          model={teamsNotificationModel}
          setModel={setTeamsNotificationModel}
        />
      </Col>
      <Col xs={12}>
        <BooleanToggleInput
          dataObject={teamsNotificationModel}
          setDataObject={setTeamsNotificationModel}
          disabled={teamsNotificationModel?.getData("enabled") === false}
          fieldName={"logEnabled"}
        />
      </Col>
    </Row>
);
}

MicrosoftTeamsStepNotificationEditorPanel.propTypes = {
  teamsNotificationModel: PropTypes.object,
  setTeamsNotificationModel: PropTypes.func,
};

export default MicrosoftTeamsStepNotificationEditorPanel;