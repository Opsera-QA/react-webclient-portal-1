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
  from "components/workflow/plan/step/notifications/servicenow/ServiceNowGroupSelectInput";

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
      {/* <ServiceNowUserSelectInput serviceNowId={serviceNowDto.getData("toolId")} setDataObject={setServiceNowDto} dataObject={serviceNowDto} /> */}
      <ServiceNowGroupSelectInput serviceNowId={serviceNowNotificationModel.getData("toolId")} setDataObject={setServiceNowNotificationModel} dataObject={serviceNowNotificationModel} />
    </div>
  );
}

ServiceNowStepNotificationEditorPanel.propTypes = {
  serviceNowNotificationModel: PropTypes.object,
  setServiceNowNotificationModel: PropTypes.func,
};

export default ServiceNowStepNotificationEditorPanel;