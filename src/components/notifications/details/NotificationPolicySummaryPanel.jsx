import React from "react";
import PropTypes from "prop-types";
import NotificationPolicySummaryPanelBase from "components/notifications/details/NotificationPolicySummaryPanelBase";
import pipelineNotificationConfigurationMetadata
  from "components/notifications/details/configuration/pipeline/pipeline-notification-configuration-metadata";
import metricNotificationConfigurationMetadata
  from "components/notifications/details/configuration/metric/metric-notification-configuration-metadata";
import MetricNotificationTypeSummaryCard
  from "components/notifications/details/configuration/metric/MetricNotificationTypeSummaryCard";
import PipelineNotificationTypeSummaryCard
  from "components/notifications/details/configuration/pipeline/PipelineNotificationTypeSummaryCard";
import modelHelpers from "components/common/model/modelHelpers";
import AuditLogNotificationTypeSummaryCard
  from "components/notifications/details/configuration/audit_log/AuditLogNotificationTypeSummaryCard";
import {
  auditLogNotificationConfigurationMetadata
} from "components/notifications/details/configuration/audit_log/auditLogNotificationConfigurationMetadata";

function NotificationPolicySummaryPanel({ notificationData, setActiveTab }) {
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
    />
  );
}


NotificationPolicySummaryPanel.propTypes = {
  notificationData: PropTypes.object,
  setActiveTab: PropTypes.func
};

export default NotificationPolicySummaryPanel;
