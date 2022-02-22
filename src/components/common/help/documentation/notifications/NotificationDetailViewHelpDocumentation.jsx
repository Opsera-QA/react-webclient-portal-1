import React, { useContext } from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";
import {
  doesToolSupportTab,
  TOOL_DETAIL_PANEL_TABS
} from "components/inventory/tools/tool_details/tab_container/ToolDetailPanelTabContainer";
import {NOTIFICATION_TYPES} from "components/common/list_of_values_input/notifications/type/notificationTypes.constants";
import {NOTIFICATION_METHODS} from "components/common/list_of_values_input/notifications/method/notificationMethod.constants";

function NotificationDetailViewHelpDocumentation({type, method}) {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getNotificationTypeDocumentation = () => {
    switch (type) {
      case NOTIFICATION_TYPES.PIPELINE:
      case NOTIFICATION_TYPES.METRIC:
      default:
        return null;
    }
  };

  const getNotificationMethodDocumentation = () => {
    switch (method) {
      case NOTIFICATION_METHODS.EMAIL:
      case NOTIFICATION_METHODS.JIRA:
      case NOTIFICATION_METHODS.SERVICE_NOW:
      case NOTIFICATION_METHODS.SLACK:
      case NOTIFICATION_METHODS.TEAMS:
      default:
        return null;
    }
  };

  const getHelpDocumentation = () => {
    return (
      <div>
        <div>
          {getNotificationTypeDocumentation()}
        </div>
        <div>
          {getNotificationMethodDocumentation()}
        </div>
      </div>
    );
  };

  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      helpTopic={"Notification Details"}
      helpDocumentation={getHelpDocumentation()}
    />
  );
}

NotificationDetailViewHelpDocumentation.propTypes ={
  type: PropTypes.string,
  method: PropTypes.string,
};

export default React.memo(NotificationDetailViewHelpDocumentation);