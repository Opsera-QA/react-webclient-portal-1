import React from "react";
import PropTypes from "prop-types";
import LaunchHelpIcon from "components/common/icons/help/LaunchHelpIcon";
import EditIcon from "components/common/icons/field/EditIcon";
import OrchestrationNotificationsField from "components/common/fields/notifications/orchestration/OrchestrationNotificationsField";

function OrchestrationNotificationInlineInputBase(
  {
    model,
    fieldName,
    disabled,
    visible,
    noDataMessage,
    helpComponent,
    launchOverlayFunction,
  }) {
  if (visible === false || launchOverlayFunction == null) {
    return null;
  }

  return (
    <div className="role-access">
      <div className="d-flex">
        <div>
          <OrchestrationNotificationsField
            model={model}
            fieldName={fieldName}
            noDataMessage={noDataMessage}
          />
        </div>
        <div className="edit-button d-flex">
          <EditIcon
            className={"ml-2 mt-2 text-muted"}
            handleEditFunction={launchOverlayFunction}
            disabled={disabled}
            tooltipBody={"Edit Notification Settings"}
          />
          <LaunchHelpIcon
            visible={disabled !== true}
            helpComponent={helpComponent}
            className={"mt-2 ml-2 text-muted"}
          />
        </div>
      </div>
    </div>
  );
}

OrchestrationNotificationInlineInputBase.propTypes = {
  helpComponent: PropTypes.object,
  fieldName: PropTypes.string,
  model: PropTypes.object,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  noDataMessage: PropTypes.any,
  launchOverlayFunction: PropTypes.func,
};

export default OrchestrationNotificationInlineInputBase;