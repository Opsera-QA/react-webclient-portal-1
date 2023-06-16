import React, { useContext } from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";


function PolicyManagementHelpDocumentation() {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div>Site Admins have the ability to manage policies for the Organization users. Upon activation of a policy, specify the Site Roles for which the policy will be visible. For more information, view the <b><a href="https://docs.opsera.io/role-based-access-pipelines-and-tool-registry/set-policies-for-user" target="_blank" rel="noreferrer">Set Policies for User Help Documentation</a></b>.
      </div>

    );
  };

  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      helpTopic={"Policies Management"}
      helpDocumentation={getHelpDocumentation()}
    >
    </HelpOverlayBase>
  );
}


export default React.memo(PolicyManagementHelpDocumentation);