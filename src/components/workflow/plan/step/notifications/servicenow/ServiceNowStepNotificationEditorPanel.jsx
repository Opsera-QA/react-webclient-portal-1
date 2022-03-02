import React from "react";
import PropTypes from "prop-types";
import NotificationsToggle from "components/workflow/plan/step/notifications/NotificationsToggle";
import {Link} from "react-router-dom";
import IconBase from "components/common/icons/IconBase";
import {faClipboardList} from "@fortawesome/pro-light-svg-icons";
import NotificationLevelInput from "components/workflow/plan/step/notifications/NotificationLevelInput";
import ServiceNowStepNotificationToolSelectInput
  from "components/workflow/plan/step/notifications/servicenow/ServiceNowStepNotificationToolSelectInput";
import ServiceNowGroupSelectInput
  from "components/common/list_of_values_input/tools/service_now/groups/ServiceNowGroupSelectInput";

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
      <NotificationsToggle dataObject={serviceNowNotificationModel} setDataObject={setServiceNowNotificationModel} fieldName={"enabled"} />
      <small className="form-text text-muted px-2">
        Please Note: You must connect to ServiceNow on the
        <Link to="/inventory/tools"><IconBase icon={faClipboardList} className={"mx-1"}/>Tool Registry</Link> page in order to use this feature.
      </small>
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