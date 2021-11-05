import React, { useContext } from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";


function GroupsHelpDocumentation() {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div>Group Management allows users to manage membership for existing groups and create new groups. These groups are the custom groups that users can create, manage and apply to individual items (Pipelines and Tools today). Once created, these groups can be used in individual Access Rules for pipelines or tools. Group Manager access is limited to Site Administrators or Power Users only. Users can either click on a group to manage membership OR create a new group.
        <div className={"mt-2 ml-2"}>
          <h5>Group Management</h5>
          <ol>
            <li>Click on the Group of which you’d like to add or remove a member.</li>
            <li>Navigate to the ‘Manage Members‘ tab.</li>
            <li>Locate a user by typing their name into the search box.</li>
            <li>To <b>add</b> a member to the group, select user‘s name from the column on the left to highlight it, then click the ‘Add Selected’ button. You should see the user name move into the ‘Members’ box on the right.</li>
            <li>To <b>remove</b> a member from the group, select user’s name from the column on the right to highlight it, then click the ‘Remove Selected‘ button. The user‘s name will move into the ‘Not Members’ column on the left.</li>
            <li>Click the ‘Save’ button.</li>
          </ol>
         Note: For Group membership changes go into effect, user must log out then log back into the portal.
        </div>
      </div>

    );
  };

  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      helpTopic={"Groups Management"}
      helpDocumentation={getHelpDocumentation()}
    >
    </HelpOverlayBase>
  );
}


export default React.memo(GroupsHelpDocumentation);