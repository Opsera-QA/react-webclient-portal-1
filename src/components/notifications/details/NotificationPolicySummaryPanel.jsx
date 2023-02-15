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
import {ORCHESTRATION_NOTIFICATION_TYPES} from "components/common/fields/notifications/notificationTypes.constants";
import modelHelpers from "components/common/model/modelHelpers";
import AuditLogNotificationTypeSummaryCard
  from "components/notifications/details/configuration/audit_log/AuditLogNotificationTypeSummaryCard";
import {
  auditLogNotificationConfigurationMetadata
} from "components/notifications/details/configuration/audit_log/auditLogNotificationConfigurationMetadata";

function NotificationPolicySummaryPanel({ notificationData, setActiveTab }) {
  // TODO: Make these panels more similar to the pipeline summary cards
  const getNotificationMethodSummaryPanel = () => {
    switch (notificationData.getData("method")) {
      case ORCHESTRATION_NOTIFICATION_TYPES.EMAIL:
        return (
          <EmailNotificationMethodSummaryCard
            notificationMethodData={modelHelpers.parseObjectIntoModel(notificationData.getData("configuration"), emailNotificationMetadata)}
            notificationData={notificationData}
          />
        );
      case ORCHESTRATION_NOTIFICATION_TYPES.SLACK:
        return (
          <SlackNotificationMethodSummaryCard
            notificationMethodData={modelHelpers.parseObjectIntoModel(notificationData.getData("configuration"), slackNotificationMetadata)}
            notificationData={notificationData}
          />
        );
      case ORCHESTRATION_NOTIFICATION_TYPES.TEAMS:
        return (
          <TeamsNotificationMethodSummaryCard
            notificationMethodData={modelHelpers.parseObjectIntoModel(notificationData.getData("configuration"), teamsNotificationMetadata)}
            notificationData={notificationData}
          />
        );
      case ORCHESTRATION_NOTIFICATION_TYPES.JIRA:
        return (
          <JiraNotificationMethodSummaryCard
            notificationMethodData={modelHelpers.parseObjectIntoModel(notificationData.getData("configuration"), jiraNotificationMetadata)}
            notificationData={notificationData}
          />
        );
      case ORCHESTRATION_NOTIFICATION_TYPES.GCHAT:
        return (
          <GChatNotificationMethodSummaryCard
            notificationMethodData={modelHelpers.parseObjectIntoModel(notificationData.getData("configuration"), gChatNotificationMetadata)}
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
      case "audit_log":
        return (
          <AuditLogNotificationTypeSummaryCard
            notificationConfigurationData={modelHelpers.parseObjectIntoModel(notificationData.getData("configuration"), auditLogNotificationConfigurationMetadata)}
            notificationData={notificationData}
          />
        );
      case "metric":
        return (
          <MetricNotificationTypeSummaryCard
            notificationConfigurationData={modelHelpers.parseObjectIntoModel(notificationData.getData("configuration"), metricNotificationConfigurationMetadata)}
            notificationData={notificationData}
          />
        );
      case "pipeline":
        return (
          <PipelineNotificationTypeSummaryCard
            notificationConfigurationData={modelHelpers.parseObjectIntoModel(notificationData.getData("configuration"), pipelineNotificationConfigurationMetadata)}
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
