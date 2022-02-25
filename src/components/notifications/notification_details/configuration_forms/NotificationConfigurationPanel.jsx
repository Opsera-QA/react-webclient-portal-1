import React from "react";
import PropTypes from "prop-types";
import MetricNotificationConfigurationPanel
  from "components/notifications/notification_details/configuration_forms/metric/MetricNotificationConfigurationPanel";
import PipelineNotificationEditorPanel
  from "components/notifications/notification_details/configuration_forms/pipeline/PipelineNotificationConfigurationPanel";
import NotificationTypeSelectInput
  from "components/common/list_of_values_input/notifications/type/NotificationTypeSelectInput";

function NotificationConfigurationPanel({ notificationDataDto, setNotificationDataDto, notificationConfigurationData, setNotificationConfigurationData }) {
  const getConfigurationPanel = () => {
    switch (notificationDataDto?.getData("type")) {
      case "metric":
        return (
          <MetricNotificationConfigurationPanel
            notificationDataDto={notificationDataDto}
            setNotificationConfigurationData={setNotificationConfigurationData}
            notificationConfigurationData={notificationConfigurationData}
          />
        );
      case "pipeline":
        return (
          <PipelineNotificationEditorPanel
            notificationDataDto={notificationDataDto}
            setNotificationConfigurationData={setNotificationConfigurationData}
            notificationConfigurationData={notificationConfigurationData}
          />
        );
      case "":
      default:
        return <div className="text-center text-muted p-5">You must select a notification type before configuring notification type details.</div>;
    }
  };

  // TODO: This should be in a new select component made with NotificationTypeSelectInput
  const handleNotificationTypeChange = (fieldName, value) => {
    let newDataObject = notificationDataDto;
    newDataObject.setData("type", value.value);
    newDataObject.setData("configuration", {});
    setNotificationConfigurationData(undefined);
    setNotificationDataDto({...newDataObject});
  };

  return (
    <div>
      <div>
        <NotificationTypeSelectInput
          setDataFunction={handleNotificationTypeChange}
          model={notificationDataDto}
          setModel={setNotificationDataDto}
        />
      </div>
      {getConfigurationPanel()}
    </div>
  );
}

NotificationConfigurationPanel.propTypes = {
  notificationType: PropTypes.string,
  notificationDataDto: PropTypes.object,
  notificationConfigurationData: PropTypes.object,
  setNotificationConfigurationData: PropTypes.func,
  setNotificationDataDto: PropTypes.func
};

export default NotificationConfigurationPanel;
