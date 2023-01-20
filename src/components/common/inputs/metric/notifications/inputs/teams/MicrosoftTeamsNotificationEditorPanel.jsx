import React from "react";
import PropTypes from "prop-types";
import PipelineStepNotificationBooleanToggle from "components/workflow/plan/step/notifications/PipelineStepNotificationBooleanToggle";
import TeamsStepNotificationTeamsToolSelectInput
  from "components/workflow/plan/step/notifications/teams/TeamsStepNotificationTeamsToolSelectInput";
import ConnectToToolMessage from "components/common/fields/inventory/messages/ConnectToToolMessage";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function MicrosoftTeamsNotificationEditorPanel(
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
        <TeamsStepNotificationTeamsToolSelectInput
          model={teamsNotificationModel}
          setModel={setTeamsNotificationModel}
        />
      </Col>
    </Row>
);
}

MicrosoftTeamsNotificationEditorPanel.propTypes = {
  teamsNotificationModel: PropTypes.object,
  setTeamsNotificationModel: PropTypes.func,
};

export default MicrosoftTeamsNotificationEditorPanel;
