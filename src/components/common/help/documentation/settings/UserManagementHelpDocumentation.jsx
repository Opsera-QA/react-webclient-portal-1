import React, { useContext } from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";


function UserManagementHelpDocumentation() {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div>Users with Power User or Administrator access can manage membership for existing users and create new user accounts with targeted group access. Follow the instructions to create a new user:
        <div className={"mt-2 ml-2"}>
          <h5>Create New User:</h5>
          <ol>
            <li>Click the <b>+ New User</b> button.</li>
            <li>Fill out the <b>Create New User</b> form:
              <ul style={{listStyleType: "none"}}>
                <li><b>Email Address</b> - Must be unique or creation will fail.</li>
                <li><b>Groups</b> - This field provides a drop down list of pre-existing groups. Choose the group you wish to add the user to.</li>
              </ul></li>
            <li>Click the <b>Create</b> button. </li>
          </ol>
          <div className={"ml-4 mb-4"}>The new user has now been created. User will receive an invitation email upon completion of the form.</div>
          <div>Note: Users that were created with the old signup form that have not logged in for the first time yet will appear in Pending Users tab. If you are using the new signup form you will not see Pending Users and can disregard.</div>
        </div>
      </div>

    );
  };

  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      helpTopic={"Users Management"}
      helpDocumentation={getHelpDocumentation()}
    >
    </HelpOverlayBase>
  );
}


export default React.memo(UserManagementHelpDocumentation);