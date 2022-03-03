import React from "react";
import PropTypes from "prop-types";
import NotificationsToggle from "components/workflow/plan/step/notifications/NotificationsToggle";
import NotificationLevelInput from "components/workflow/plan/step/notifications/NotificationLevelInput";
import ServiceNowStepNotificationToolSelectInput
  from "components/workflow/plan/step/notifications/servicenow/ServiceNowStepNotificationToolSelectInput";
import ServiceNowGroupSelectInput
  from "components/common/list_of_values_input/tools/service_now/groups/ServiceNowGroupSelectInput";
import ConnectToToolMessage from "components/common/fields/inventory/messages/ConnectToToolMessage";

function ServiceNowStepNotificationEditorPanel(
  {
    serviceNowNotificationModel,
    setServiceNowNotificationModel,
  }) {
  
  if (serviceNowNotificationModel == null) {
    return null;
  }

  // TODO: Remove after updating the panel to use side tabs
  if (serviceNowNotificationModel?.getData("enabled") === false) {
    return (
      <div className="my-4">
        <NotificationsToggle
          dataObject={serviceNowNotificationModel}
          setDataObject={setServiceNowNotificationModel}
          fieldName={"enabled"}
        />
      </div>
    );
  }

  return (
    <div className="my-4">
      <NotificationsToggle
        dataObject={serviceNowNotificationModel}
        setDataObject={setServiceNowNotificationModel}
        fieldName={"enabled"}
      />
      <ConnectToToolMessage toolFriendlyName={"ServiceNow"} />
      <NotificationLevelInput dataObject={serviceNowNotificationModel} setDataObject={setServiceNowNotificationModel} fieldName={"event"} />
      <ServiceNowStepNotificationToolSelectInput
        setModel={setServiceNowNotificationModel}
        model={serviceNowNotificationModel}
      />
       {/*<ServiceNowUserSelectInput*/}
       {/*  fieldName={"serviceNowUserId"}*/}
       {/*  serviceNowId={serviceNowNotificationModel?.getData("toolId")}*/}
       {/*  model={serviceNowNotificationModel}*/}
       {/*  setModel={setServiceNowNotificationModel}*/}
       {/*/>*/}
      <ServiceNowGroupSelectInput
        fieldName={"serviceNowGroupId"}
        serviceNowId={serviceNowNotificationModel?.getData("toolId")}
        model={serviceNowNotificationModel}
        setModel={setServiceNowNotificationModel}
      />
    </div>
  );
}

ServiceNowStepNotificationEditorPanel.propTypes = {
  serviceNowNotificationModel: PropTypes.object,
  setServiceNowNotificationModel: PropTypes.func,
};

export default ServiceNowStepNotificationEditorPanel;