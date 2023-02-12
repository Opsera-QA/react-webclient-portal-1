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
      <div>Site Administrators can manage Site Roles from this dashboard. Site Roles determine a user’s level of accessibility. There are  different levels: Site Administrators, Power Users, Users, Security Managers and Auditors. For detailed on each Site Role, view the <b><a href="https://docs.opsera.io/role-based-access-pipelines-and-tool-registry" target="_blank" rel="noreferrer">Site Roles Help Documentation</a></b>
        <div className={"mt-2 ml-2"}>
          <h5>Site Roles Management</h5>
          <ol>
            <li>Click on the Site Role of which you’d like to add or remove a member (Site Administrators, Power Users, Users, Security Managers or Auditors).</li>
            <li>Navigate to the <b>Manage Members</b> tab.</li>
            <li>Locate a user by typing their name into the search box.</li>
            <li>To <b>add</b> a member to the Site Role, select user‘s name from the column on the left to highlight it, then click <b>Add Selected</b>. You should see the user name move into the <b>Members</b> box on the right.</li>
            <li>To <b>remove</b> a member from the Site Role, select user’s name from the column on the right to highlight it, then click <b>Remove Selected</b>. The user‘s name will move into the <b>Not Members</b> column on the left.</li>
            <li>Click <b>Save</b>.</li>
          </ol>
          <div>Note: For any Site Role membership changes go into effect, member must log out then log back into the portal. Alternatively, member can navigate to User Profile and click <b>Re-sync Profile</b>.</div>
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
    />
  );
}


export default React.memo(SiteRolesHelpDocumentation);