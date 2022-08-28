import React from "react";
import PropTypes from "prop-types";
import LaunchHelpIcon from "components/common/icons/help/LaunchHelpIcon";
import EditIcon from "components/common/icons/field/EditIcon";
import OrchestrationNotificationsField from "components/common/fields/notifications/orchestration/OrchestrationNotificationsField";
import useComponentStateReference from "hooks/useComponentStateReference";
import IconBase from "components/common/icons/IconBase";
import { faPencilAlt } from "@fortawesome/pro-light-svg-icons";
import ButtonTooltip from "components/common/tooltip/ButtonTooltip";
import OverlayIconBase from "components/common/icons/OverlayIconBase";

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
  const {
    isOpseraAdministrator,
  } = useComponentStateReference();

  if (visible === false || launchOverlayFunction == null) {
    return null;
  }

  const getEditIcon = () => {
    if (isOpseraAdministrator === true) {
      return (
        <EditIcon
          className={"ml-2 mt-2 text-muted"}
          handleEditFunction={launchOverlayFunction}
          disabled={disabled}
          tooltipBody={"Edit Notification Settings"}
        />
      );
    }

    return (
      <div className={"ml-2 mt-2 "}>
        <OverlayIconBase
          className={"text-muted pointer"}
          icon={faPencilAlt}
          overlayBody={"In the main Opsera offering you can set notifications to trigger to email, Microsoft Teams, Slack, GoogleTalk, based on success or failure states"}
        />
      </div>
    );
  };

  const getHelpIcon = () => {
    if (isOpseraAdministrator === true) {
      return (
        <LaunchHelpIcon
          visible={disabled !== true}
          helpComponent={helpComponent}
          className={"mt-2 ml-2 text-muted"}
        />
      );
    }
  };

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
          {getEditIcon()}
          {getHelpIcon()}
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