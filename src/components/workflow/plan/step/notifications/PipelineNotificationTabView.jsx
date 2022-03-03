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
  const [activeTab, setTabSelection] = useState("slack");

  const getCurrentView = () => {
    switch (activeTab) {
      case "slack":
        return (
          <SlackStepNotificationEditorPanel
            slackNotificationModel={slackNotificationModel}
            setSlackNotificationModel={setSlackNotificationModel}
          />
        );
      case "teams":
        return (
          <MicrosoftTeamsStepNotificationEditorPanel
            teamsNotificationModel={teamsNotificationModel}
            setTeamsNotificationModel={setTeamsNotificationModel}
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
      case "service-now":
        return (
          <ServiceNowStepNotificationEditorPanel
            serviceNowNotificationModel={serviceNowNotificationModel}
            setServiceNowNotificationModel={setServiceNowNotificationModel}
          />
        );
      case "email":
        return (
          <EmailStepNotificationEditorPanel
            emailNotificationModel={emailNotificationModel}
            setEmailNotificationModel={setEmailNotificationModel}
          />
        );

    }
  };

  const getTableCardView = () => {
    return (
      <Row className={"mx-0"}>
        <Col sm={2} className={"px-0"}>
          <PipelineNotificationVerticalTabContainer
            handleTabClickFunction={setTabSelection}
            activeTab={activeTab}
          />
        </Col>
        <Col sm={10} className={"px-0"}>
          <div className={"m-3"}>
            {getCurrentView()}
          </div>
        </Col>
      </Row>
    );
  };

  return (
    <FilterContainer
      body={getTableCardView()}
      titleIcon={faEnvelope}
      title={"Pipeline Notifications"}
      className={"px-2 pb-2"}
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