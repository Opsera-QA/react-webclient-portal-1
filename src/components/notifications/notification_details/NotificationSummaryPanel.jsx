import React from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import NotificationSummaryPanelBase from "components/notifications/notification_details/NotificationSummaryPanelBase";
import pipelineNotificationConfigurationMetadata
  from "components/notifications/notification_details/configuration_forms/pipeline/pipeline-notification-configuration-metadata";
import metricNotificationConfigurationMetadata
  from "components/notifications/notification_details/configuration_forms/metric/metric-notification-configuration-metadata";
import EmailNotificationMethodSummaryCard
  from "components/notifications/notification_details/notification_method_forms/email/EmailNotificationMethodSummaryCard";
import emailNotificationMetadata
  from "components/notifications/notification_details/notification_method_forms/email/emailNotificationMetadata";
import slackNotificationMetadata
  from "components/notifications/notification_details/notification_method_forms/slack/slackNotificationMetadata";
import TeamsNotificationMethodSummaryCard
  from "components/notifications/notification_details/notification_method_forms/teams/TeamsNotificationMethodSummaryCard";
import teamsNotificationMetadata
  from "components/notifications/notification_details/notification_method_forms/teams/teamsNotificationMetadata";
import JiraNotificationMethodSummaryCard
  from "components/notifications/notification_details/notification_method_forms/jira/JiraNotificationMethodSummaryCard";
import jiraNotificationMetadata
  from "components/notifications/notification_details/notification_method_forms/jira/jiraNotificationMetadata";
import SlackNotificationMethodSummaryCard
  from "components/notifications/notification_details/notification_method_forms/slack/SlackNotificationMethodSummaryCard";
import MetricNotificationTypeSummaryCard
  from "components/notifications/notification_details/configuration_forms/metric/MetricNotificationTypeSummaryCard";
import PipelineNotificationTypeSummaryCard
  from "components/notifications/notification_details/configuration_forms/pipeline/PipelineNotificationTypeSummaryCard";
import GChatNotificationMethodSummaryCard
  from "components/notifications/notification_details/notification_method_forms/gchat/GChatNotificationMethodSummaryCard";
import gChatNotificationMetadata
  from "components/notifications/notification_details/notification_method_forms/gchat/gChatNotificationMetadata";

function NotificationSummaryPanel({ notificationData, setActiveTab }) {
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
    <NotificationSummaryPanelBase
      notificationData={notificationData}
      setActiveTab={setActiveTab}
      notificationTypeSummaryCard={getNotificationTypeSummaryPanel()}
      notificationMethodSummaryCard={getNotificationMethodSummaryPanel()}
    />
  );
}


NotificationSummaryPanel.propTypes = {
  notificationData: PropTypes.object,
  setActiveTab: PropTypes.func
};

export default NotificationSummaryPanel;
