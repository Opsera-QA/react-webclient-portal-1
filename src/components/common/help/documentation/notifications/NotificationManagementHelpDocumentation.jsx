import React, { useContext } from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";



function NotificationManagementHelpDocumentation() {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div>Manage and create new Pipeline and Metric notification policies to tailor activity logging to your needs. Set up notification policies using the following methods: Jira, Slack, Email, Microsoft Teams and Service Now.
      </div>
    );
  };

  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      helpTopic={"Notification Management"}
      helpDocumentation={getHelpDocumentation()}
    >
    </HelpOverlayBase>
  );
}


export default React.memo(NotificationManagementHelpDocumentation);