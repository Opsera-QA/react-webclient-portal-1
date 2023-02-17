import React from "react";
import PropTypes from "prop-types";
import MetricNotificationConfigurationPanel
  from "components/notifications/details/configuration/metric/MetricNotificationConfigurationPanel";
import PipelineNotificationEditorPanel
  from "components/notifications/details/configuration/pipeline/PipelineNotificationConfigurationPanel";
import NotificationTypeSelectInput
  from "components/common/list_of_values_input/notifications/type/NotificationTypeSelectInput";
import {
  NOTIFICATION_TYPES
} from "components/common/list_of_values_input/notifications/type/notificationTypes.constants";
import AuditLogNotificationConfigurationPanel
  from "components/notifications/details/configuration/audit_log/AuditLogNotificationConfigurationPanel";

export default function NotificationConfigurationPanel(
  {
    notificationModel,
    setNotificationModel,
    notificationConfigurationModel,
    setNotificationConfigurationModel,
  }) {
  const updateModelFunction = (newNotificationConfigurationModel) => {
    notificationModel.setData("configuration", newNotificationConfigurationModel?.getPersistData(false));
    setNotificationConfigurationModel({...newNotificationConfigurationModel});
    setNotificationModel({...notificationModel});
  };

  const getConfigurationPanel = () => {
    switch (notificationModel?.getData("type")) {
      case NOTIFICATION_TYPES.AUDIT_LOG:
        return (
          <AuditLogNotificationConfigurationPanel
            notificationModel={notificationModel}
            setNotificationModel={setNotificationModel}
            notificationConfigurationModel={notificationConfigurationModel}
            setNotificationConfigurationModel={updateModelFunction}
          />
        );
      case NOTIFICATION_TYPES.METRIC:
        return (
          <MetricNotificationConfigurationPanel
            notificationModel={notificationModel}
            notificationConfigurationModel={notificationConfigurationModel}
            setNotificationConfigurationModel={updateModelFunction}
          />
        );
      case NOTIFICATION_TYPES.PIPELINE:
        return (
          <PipelineNotificationEditorPanel
            notificationModel={notificationModel}
            notificationConfigurationModel={notificationConfigurationModel}
            setNotificationConfigurationModel={updateModelFunction}
          />
        );
      default:
        return (
          <div className="text-center text-muted p-5">
            You must select a notification type before configuring notification type details.
          </div>
        );
    }
  };

  // TODO: This should be in a new select component made with NotificationTypeSelectInput
  const handleNotificationTypeChange = (fieldName, value) => {
    notificationModel.setData("type", value.value);
    notificationModel.setDefaultValue("configuration");
    notificationModel.setDefaultValue("method");
    notificationModel.setDefaultValue("target");
    setNotificationConfigurationModel(undefined);
    setNotificationModel({...notificationModel});
  };

  return (
    <div>
      <div>
        <NotificationTypeSelectInput
          setDataFunction={handleNotificationTypeChange}
          model={notificationModel}
          setModel={setNotificationModel}
        />
      </div>
      {getConfigurationPanel()}
    </div>
  );
}

NotificationConfigurationPanel.propTypes = {
  notificationModel: PropTypes.object,
  setNotificationModel: PropTypes.func,
  notificationConfigurationModel: PropTypes.object,
  setNotificationConfigurationModel: PropTypes.func,
};
