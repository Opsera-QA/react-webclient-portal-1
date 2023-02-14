import React from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import NotificationPolicySummaryPanelBase from "components/notifications/details/NotificationPolicySummaryPanelBase";
import pipelineNotificationConfigurationMetadata
  from "components/notifications/details/configuration/pipeline/pipeline-notification-configuration-metadata";
import metricNotificationConfigurationMetadata
  from "components/notifications/details/configuration/metric/metric-notification-configuration-metadata";
import EmailNotificationMethodSummaryCard
  from "components/notifications/details/methods/email/EmailNotificationMethodSummaryCard";
import emailNotificationMetadata
  from "components/notifications/details/methods/email/emailNotificationMetadata";
import slackNotificationMetadata
  from "components/notifications/details/methods/slack/slackNotificationMetadata";
import TeamsNotificationMethodSummaryCard
  from "components/notifications/details/methods/teams/TeamsNotificationMethodSummaryCard";
import teamsNotificationMetadata
  from "components/notifications/details/methods/teams/teamsNotificationMetadata";
import JiraNotificationMethodSummaryCard
  from "components/notifications/details/methods/jira/JiraNotificationMethodSummaryCard";
import jiraNotificationMetadata
  from "components/notifications/details/methods/jira/jiraNotificationMetadata";
import SlackNotificationMethodSummaryCard
  from "components/notifications/details/methods/slack/SlackNotificationMethodSummaryCard";
import MetricNotificationTypeSummaryCard
  from "components/notifications/details/configuration/metric/MetricNotificationTypeSummaryCard";
import PipelineNotificationTypeSummaryCard
  from "components/notifications/details/configuration/pipeline/PipelineNotificationTypeSummaryCard";
import GChatNotificationMethodSummaryCard
  from "components/notifications/details/methods/gchat/GChatNotificationMethodSummaryCard";
import gChatNotificationMetadata
  from "components/notifications/details/methods/gchat/gChatNotificationMetadata";

function NotificationPolicySummaryPanel({ notificationData, setActiveTab }) {
  const wrapNotificationType = (metaData) => {
    return new Model(notificationData.getData("configuration"), metaData, false);
  };

  const wrapNotificationMethod = (metaData) => {
    return new Model(notificationData.getData("notification"), metaData, false);
  };

  // TODO: Make these panels more similar to the pipeline summary cards
  const getNotificationMethodSummaryPanel = () => {
    switch (notificationData.getData("method")) {
      case "email":
        return (
          <EmailNotificationMethodSummaryCard
            notificationMethodData={wrapNotificationMethod(emailNotificationMetadata)}
            notificationData={notificationData}
          />
        );
      case "slack":
        return (
          <SlackNotificationMethodSummaryCard
            notificationMethodData={wrapNotificationMethod(slackNotificationMetadata)}
            notificationData={notificationData}
          />
        );
      case "teams":
        return (
          <TeamsNotificationMethodSummaryCard
            notificationMethodData={wrapNotificationMethod(teamsNotificationMetadata)}
            notificationData={notificationData}
          />
        );
      case "jira":
        return (
          <JiraNotificationMethodSummaryCard
            notificationMethodData={wrapNotificationMethod(jiraNotificationMetadata)}
            notificationData={notificationData}
          />
        );
      case "gchat":
        return (
          <GChatNotificationMethodSummaryCard
            notificationMethodData={wrapNotificationMethod(gChatNotificationMetadata)}
            notificationData={notificationData}
          />
        );
      default:
        return (<div>No notification method associated with this Notification</div>);
    }
  };

  // TODO: Make these panels more similar to the pipeline summary cards
  const getNotificationTypeSummaryPanel = () => {
    switch (notificationData.getData("type")) {
      case "metric":
        return (
          <MetricNotificationTypeSummaryCard
            notificationConfigurationData={wrapNotificationType(metricNotificationConfigurationMetadata)}
            notificationData={notificationData}
          />
        );
      case "pipeline":
        return (
          <PipelineNotificationTypeSummaryCard
            notificationConfigurationData={wrapNotificationType(pipelineNotificationConfigurationMetadata)}
            notificationData={notificationData}
          />
        );
      default:
        return (<div>No notification type associated with this Notification</div>);
    }
  };

  return (
    <NotificationPolicySummaryPanelBase
      notificationData={notificationData}
      setActiveTab={setActiveTab}
      notificationTypeSummaryCard={getNotificationTypeSummaryPanel()}
      notificationMethodSummaryCard={getNotificationMethodSummaryPanel()}
    />
  );
}


NotificationPolicySummaryPanel.propTypes = {
  notificationData: PropTypes.object,
  setActiveTab: PropTypes.func
};

export default NotificationPolicySummaryPanel;
