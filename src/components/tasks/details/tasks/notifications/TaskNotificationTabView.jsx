import React, {useState} from "react";
import PropTypes from "prop-types";
import {faEnvelope} from "@fortawesome/pro-light-svg-icons";
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
import VanitySetTabAndViewContainer, {
  DEFAULT_TAB_AND_VIEW_CONTAINER_HEIGHT,
} from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import TaskNotificationVerticalTabContainer
  from "components/tasks/details/tasks/notifications/TaskNotificationVerticalTabContainer";
import GChatNotificationEditorPanel
  from "components/workflow/plan/step/notifications/gchat/GChatNotificationEditorPanel";

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
            isApprovalStep={false}
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
        slackEnabled={slackNotificationModel?.getData("enabled")}
        teamsEnabled={teamsNotificationModel?.getData("enabled")}
        jiraEnabled={jiraNotificationModel?.getData("enabled")}
        serviceNowEnabled={serviceNowNotificationModel?.getData("enabled")}
        emailEnabled={emailNotificationModel?.getData("enabled")}
        gChatEnabled={gChatNotificationModel?.getData("enabled")}
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
