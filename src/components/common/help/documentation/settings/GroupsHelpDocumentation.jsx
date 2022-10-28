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
      <div>
        <div>Group Management allows Site Administrators or Power Users to manage membership of existing groups and create new groups. These are custom groups that users can create, manage and apply to individual resources like pipelines, tools, tasks and parameters using RBAC Access Rules. All group members will have access if a group is assigned RBAC Access Rules. For more information on group management, view the <b><a href="https://docs.opsera.io/role-based-access-pipelines-and-tool-registry#rolebasedaccess-pipelines-and-toolregistry-groupmanagement" target="_blank" rel="noreferrer">Group Management Help Documentation</a></b>. Use the following instructions to manage group membership.</div>
        <div className={"mt-2 ml-2"}>
          <ol>
            <li>Select the Group where you will add or remove a member.</li>
            <li>Navigate to the <b>Manage Members</b> tab.</li>
            <li>Locate a user by typing their name in the search box.</li>
            <li>To <b>add</b> a member to the group, select user from the <b>Not Members</b> table on left and select <b>Add Selected</b> button. User will move into the <b>Members</b> table on the right.</li>
            <li>To <b>remove</b> a member from the group, select user from the <b>Not Members</b> on right and select <b>Remove Selected</b> button. User will move into the <b>Not Members</b> table on the left.</li>
            <li>Select the <b>Save</b> button.</li>
          </ol>
          <div className={"mb-2"}><b>* For Group membership changes to take effect, member must log out and log back into the portal.</b></div>
          <div>
            <ul>
              <li>If a Group is assigned specific RBAC Access Rules to a resource and a group member is already a member of Site Administrators or Power User <b>Site Role</b>, the <b>Site Role</b> privileges supersede the RBAC Access Rules.</li>
              <li>If a non-Site Administrator or non-Owner has RBAC Access to a resource and re-assigns RBAC Access to a group they are NOT a member of, they will forfeit their access. </li>
            </ul>
          </div>
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