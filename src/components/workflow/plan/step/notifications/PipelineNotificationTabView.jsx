import React, {useState} from "react";
import PropTypes from "prop-types";
import FilterContainer from "components/common/table/FilterContainer";
import {faEnvelope} from "@fortawesome/pro-light-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PipelineNotificationVerticalTabContainer
  from "components/workflow/plan/step/notifications/PipelineNotificationVerticalTabContainer";
import SlackStepNotificationEditorPanel
  from "components/workflow/plan/step/notifications/slack/SlackStepNotificationEditorPanel";
import MicrosoftTeamsStepNotificationEditorPanel
  from "components/workflow/plan/step/notifications/teams/MicrosoftTeamsStepNotificationEditorPanel";
import JiraStepNotificationEditorPanel
  from "components/workflow/plan/step/notifications/jira/JiraStepNotificationEditorPanel";
import ServiceNowStepNotificationEditorPanel
  from "components/workflow/plan/step/notifications/servicenow/ServiceNowStepNotificationEditorPanel";
import EmailStepNotificationEditorPanel
  from "components/workflow/plan/step/notifications/email/EmailStepNotificationEditorPanel";
import RequiredFieldsMessage from "components/common/fields/editor/RequiredFieldsMessage";

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
    pipelineStep
  }) {
  const [activeTab, setTabSelection] = useState("email");

  const getCurrentView = () => {
    switch (activeTab) {
      case "email":
        return (
          <EmailStepNotificationEditorPanel
            emailNotificationModel={emailNotificationModel}
            setEmailNotificationModel={setEmailNotificationModel}
          />
        );
      case "jira":
        return (
          <JiraStepNotificationEditorPanel
            jiraNotificationModel={jiraNotificationModel}
            setJiraNotificationModel={setJiraNotificationModel}
            isApprovalStep={pipelineStep?.tool?.tool_identifier === "approval"}
          />
        );
      case "slack":
        return (
          <SlackStepNotificationEditorPanel
            slackNotificationModel={slackNotificationModel}
            setSlackNotificationModel={setSlackNotificationModel}
          />
        );
      case "service-now":
        return (
          <ServiceNowStepNotificationEditorPanel
            serviceNowNotificationModel={serviceNowNotificationModel}
            setServiceNowNotificationModel={setServiceNowNotificationModel}
          />
        );
      case "teams":
        return (
          <MicrosoftTeamsStepNotificationEditorPanel
            teamsNotificationModel={teamsNotificationModel}
            setTeamsNotificationModel={setTeamsNotificationModel}
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
          />
        </Col>
        <Col sm={10} className={"px-0 full-height-overlay-container-with-buttons-and-title-body"}>
          <div className={"mx-2 mt-1"}>
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
  pipelineStep: PropTypes.object,
};

export default PipelineNotificationTabView;