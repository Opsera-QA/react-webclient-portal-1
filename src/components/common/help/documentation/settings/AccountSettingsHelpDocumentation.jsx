import React, { useContext } from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";


function AccountSettingsHelpDocumentation() {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div>Administrators and Power Users can manage account settings from this dashboard.
        <div className={"mt-2"}>
          <ul style={{listStyleType: "none"}}>
            <li><b>Delete Tools</b> - Choose a registered application, view the active tools, and then delete them from the application. This will perform a complete end to end removal of all instances related to an application.</li>
            <li><b>Site Roles</b> - (Administrator access) Manage the following Site Roles levels: Administrators, Power Users and Users.  </li>
            <li><b>Groups</b> - Manage user groups and their Membership.</li>
            <li><b>Users</b> - Manage existing users and register new users for this account. The New User form allows owners to create new user accounts with targeted group access. Users will receive an invitation email upon completion of the form.</li>
          </ul>
        </div>
      </div>

    );
  };

  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      helpTopic={"Account Settings"}
      helpDocumentation={getHelpDocumentation()}
    >
    </HelpOverlayBase>
  );
}


export default React.memo(AccountSettingsHelpDocumentation);