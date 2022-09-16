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
import VanitySetTabAndViewContainer, {
  DEFAULT_TAB_AND_VIEW_CONTAINER_HEIGHT,
} from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import TaskNotificationVerticalTabContainer
  from "components/tasks/details/tasks/notifications/TaskNotificationVerticalTabContainer";
import GChatStepNotificationEditorPanel 
  from "components/workflow/plan/step/notifications/gchat/GChatStepNotificationEditorPanel";

const tabAndViewContainerHeight =`calc(${DEFAULT_TAB_AND_VIEW_CONTAINER_HEIGHT} - 50px)`;

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
    gChatNotificationModel,
    setGChatNotificationModel,
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
      case "gchat":
        return (
          <GChatStepNotificationEditorPanel
            gChatNotificationModel={gChatNotificationModel}
            setGChatNotificationModel={setGChatNotificationModel}
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

  const getVerticalTabContainer = () => {
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
      verticalTabContainer={getVerticalTabContainer()}
      currentView={getCurrentView()}
      minimumHeight={tabAndViewContainerHeight}
      maximumHeight={tabAndViewContainerHeight}
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
  gChatNotificationModel: PropTypes.object,
  setGChatNotificationModel: PropTypes.func,
};

export default TaskNotificationTabView;
