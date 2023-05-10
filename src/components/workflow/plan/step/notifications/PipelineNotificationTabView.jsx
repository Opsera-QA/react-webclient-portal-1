import React, {useState} from "react";
import PropTypes from "prop-types";
import FilterContainer from "components/common/table/FilterContainer";
import {faEnvelope} from "@fortawesome/pro-light-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PipelineNotificationVerticalTabContainer
  from "components/workflow/plan/step/notifications/PipelineNotificationVerticalTabContainer";
import SlackNotificationEditorPanel
  from "components/workflow/plan/step/notifications/slack/SlackNotificationEditorPanel";
import MicrosoftTeamsNotificationEditorPanel
  from "components/workflow/plan/step/notifications/teams/MicrosoftTeamsNotificationEditorPanel";
import JiraNotificationEditorPanel
  from "components/workflow/plan/step/notifications/jira/JiraNotificationEditorPanel";
import ServiceNowNotificationEditorPanel
  from "components/workflow/plan/step/notifications/servicenow/ServiceNowNotificationEditorPanel";
import EmailNotificationEditorPanel
  from "components/workflow/plan/step/notifications/email/EmailNotificationEditorPanel";
import RequiredFieldsMessage from "components/common/fields/editor/RequiredFieldsMessage";
import GChatNotificationEditorPanel
  from "components/workflow/plan/step/notifications/gchat/GChatNotificationEditorPanel";

function PipelineNotificationTabView(
  {
    slackNotificationModel,
    setSlackNotificationModel,
    teamsNotificationModel,
    setTeamsNotificationModel,
    jiraNotificationModel,
    setJiraNotificationModel,
    serviceNowNotificationModel,
    setServiceNowNotificationModel,
    emailNotificationModel,
    setEmailNotificationModel,
    gChatNotificationModel,
    setGChatNotificationModel,
    pipelineStep
  }) {
  const [activeTab, setTabSelection] = useState("email");
  
  const getCurrentView = () => {
    switch (activeTab) {
      case "email":
        return (
          <EmailNotificationEditorPanel
            emailNotificationModel={emailNotificationModel}
            setEmailNotificationModel={setEmailNotificationModel}
          />
        );
      case "jira":
        return (
          <JiraNotificationEditorPanel
            jiraNotificationModel={jiraNotificationModel}
            setJiraNotificationModel={setJiraNotificationModel}
            isApprovalStep={pipelineStep?.tool?.tool_identifier === "approval"}
          />
        );
      case "slack":
        return (
          <SlackNotificationEditorPanel
            slackNotificationModel={slackNotificationModel}
            setSlackNotificationModel={setSlackNotificationModel}
          />
        );
      case "service-now":
        return (
          <ServiceNowNotificationEditorPanel
            serviceNowNotificationModel={serviceNowNotificationModel}
            setServiceNowNotificationModel={setServiceNowNotificationModel}
          />
        );
      case "teams":
        return (
          <MicrosoftTeamsNotificationEditorPanel
            teamsNotificationModel={teamsNotificationModel}
            setTeamsNotificationModel={setTeamsNotificationModel}
          />
        );
      case "gchat":
        return (
          <GChatNotificationEditorPanel
            gChatNotificationModel={gChatNotificationModel}
            setGChatNotificationModel={setGChatNotificationModel}
          />
        );
    }
  };

  const getPipelineStepNotificationContainer = () => {
    return (
      <Row className={"full-height-overlay-container-with-buttons-and-title mx-0"}>
        <Col sm={2} className={"px-0 full-height-overlay-container-with-buttons-and-title-tabs"}>
          <PipelineNotificationVerticalTabContainer
            handleTabClickFunction={setTabSelection}
            activeTab={activeTab}
            slackEnabled={slackNotificationModel?.getData("enabled")}
            teamsEnabled={teamsNotificationModel?.getData("enabled")}
            jiraEnabled={jiraNotificationModel?.getData("enabled")}
            serviceNowEnabled={serviceNowNotificationModel?.getData("enabled")}
            emailEnabled={emailNotificationModel?.getData("enabled")}
            gChatEnabled={gChatNotificationModel?.getData("enabled")}
          />
        </Col>
        <Col sm={10} className={"px-0 full-height-overlay-container-with-buttons-and-title-body"}>
          <div className={"mx-3 mt-1"}>
            {getCurrentView()}
            <RequiredFieldsMessage />
          </div>
        </Col>
      </Row>
    );
  };

  return (
    <FilterContainer
      body={getPipelineStepNotificationContainer()}
      titleIcon={faEnvelope}
      title={"Pipeline Step Notifications"}
    />
  );
}

PipelineNotificationTabView.propTypes = {
  slackNotificationModel: PropTypes.object,
  setSlackNotificationModel: PropTypes.func,
  teamsNotificationModel: PropTypes.object,
  setTeamsNotificationModel: PropTypes.func,
  jiraNotificationModel: PropTypes.object,
  setJiraNotificationModel: PropTypes.func,
  serviceNowNotificationModel: PropTypes.object,
  setServiceNowNotificationModel: PropTypes.func,
  emailNotificationModel: PropTypes.object,
  setEmailNotificationModel: PropTypes.func,
  gChatNotificationModel: PropTypes.object,
  setGChatNotificationModel: PropTypes.func,
  pipelineStep: PropTypes.object,
};

export default PipelineNotificationTabView;