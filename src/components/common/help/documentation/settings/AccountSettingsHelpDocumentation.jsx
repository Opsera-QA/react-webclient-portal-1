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
      <div>Administrators and Power Users can manage the following account setings from this dashboard:
        <div className={"mt-2"}>
          <ul style={{listStyleType: "none"}}>
            <li><b>Analytics Data Entry</b> - Manage analytics data manually and see it reflected in corresponding dashboard KPIs for specific charts. </li>
            <li><b>Delete Tools</b> - Choose a registered application, view the active tools, and then delete them from the application. This will perform a complete end to end removal of all instances related to an application.</li>
            <li><b>Site Roles</b> - Manage Site Roles in the following levels: Administrators, Power Users and Users.  </li>
            <li><b>My User Record</b> - Review and manage your user profile information as well as platform settings from this page. Please note, profile details are stored in your identify provider so some changes may not be possible from this portal at this time.</li>
            <li><b>Departments</b> - Manage Departments and their Membership. </li>
            <li><b>Analytics Profile</b> - Manage Opsera Analytics Engine Settings.</li>
            <li><b>Groups</b> - Manage user groups and their Membership.</li>
            <li><b>Tags</b> - Manage tags and view tag usage in Tools, Pipeline and Dashboards.</li>
            <li><b>Data Mapping</b> - Apply and connect tags to incoming external data with Opsera.</li>
            <li><b>Organizations</b> - Manage organizations.</li>
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