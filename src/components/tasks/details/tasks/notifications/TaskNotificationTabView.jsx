import React, {useState} from "react";
import PropTypes from "prop-types";
import {faEnvelope} from "@fortawesome/pro-light-svg-icons";
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
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import TaskNotificationVerticalTabContainer
  from "components/tasks/details/tasks/notifications/TaskNotificationVerticalTabContainer";

function TaskNotificationTabView(
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
  }) {
  const [activeTab, setTabSelection] = useState("email");

  const getViewForTab = () => {
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
            isApprovalStep={false}
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

  const getCurrentView = () => {
    return (
      <div className={"mx-3"}>
        {getViewForTab()}
        <RequiredFieldsMessage />
      </div>
    );
  };

  const getVerticalTablContainer = () => {
    return (
      <TaskNotificationVerticalTabContainer
        handleTabClickFunction={setTabSelection}
        activeTab={activeTab}
      />
    );
  };

  return (
    <VanitySetTabAndViewContainer
      icon={faEnvelope}
      title={"Task Notification Configuration"}
      verticalTabContainer={getVerticalTablContainer()}
      currentView={getCurrentView()}
    />
  );
}

TaskNotificationTabView.propTypes = {
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
};

export default TaskNotificationTabView;