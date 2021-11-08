import React, { useContext } from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";


function SiteRolesHelpDocumentation() {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div>Administrators can manage Site Roles from this dashboard. Site Roles determine a user’s level of accessibility. There are 3 different levels: Administrators, Power Users and Users. Users with Administrator access have full portal access, users with Power User Access have less access, and users with User Access have the least amount of access.
        <div className={"mt-2 ml-2"}>
          <h5>Site Roles Management</h5>
          <ol>
            <li>Click on the Site Role of which you’d like to add or remove a member (Administrators, PowerUsers or Users).</li>
            <li>Navigate to the ‘Manage Members‘ tab.</li>
            <li>Locate a user by typing their name into the search box.</li>
            <li>To <b>add</b> a member to the Site Role, select user‘s name from the column on the left to highlight it, then click the ‘Add Selected’ button. You should see the user name move into the ‘Members’ box on the right.</li>
            <li>To <b>remove</b> a member from the Site Role, select user’s name from the column on the right to highlight it, then click the ‘Remove Selected‘ button. The user‘s name will move into the ‘Not Members’ column on the left.</li>
            <li>Click the ‘Save’ button.</li>
          </ol>
         Note: For any Site Role membership changes go into effect, user must log out then log back into the portal.
        </div>
      </div>

    );
  };

  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      helpTopic={"Site Roles Management"}
      helpDocumentation={getHelpDocumentation()}
    >
    </HelpOverlayBase>
  );
}


export default React.memo(SiteRolesHelpDocumentation);