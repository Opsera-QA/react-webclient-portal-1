import React, { useContext } from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";


function AdministrationToolsHelpDocumentation() {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div>Administrators can manage administration tools from this dashboard.
        <div className={"mt-2"}>
          <div><b>User and Organization Settings</b>
            <ul style={{listStyleType: "none"}}>
              <li><b>Customer Settings, Policies, and Entitlements</b> - Manage Customer Settings, Policies, and Entitlements.</li>
              <li><b>Organization Management</b> - Create and manage LDAP organizations.</li>
              <li><b>Registered Users Management</b> - Manage Opsera User settings, deactivate Opsera Users, and deploy ELK tool stacks for Opsera Users.</li>
          </ul></div>
          <div><b>Platform Settings</b>
            <ul style={{listStyleType: "none"}}>
              <li><b>Custom Environment Variable Management</b> - View React and Node Custom Environment Variables.</li>
              <li><b>Custom Parameters Management</b> - Allows for registration of custom parameters that can be used by capabilities of the system.</li>
              <li><b>Features Management</b> - Control specific features in the application that support this capability. View <b><a href="https://docs.opsera.io/supporting-documents/admin-tool-settings" target="_blank" rel="noreferrer">Admin Tool Settings</a></b> for more information.</li>
              <li><b>Site Notification Manager</b> - Create personalized Site Notifications by Type, including System Maintenance, Service Outage, Success, or Informational Message that will be displayed across the site for every User.</li>
            </ul></div>
          <div><b>Platform Data Entry</b>
            <ul style={{listStyleType: "none"}}>
              <li><b>KPI Identifier Management</b> - Create and manage KPI Identifiers to add metrics to the Insights Marketplace. </li>
              <li><b>Pipeline Storage Management</b> - View and Manage records created during the use of Tasks and Pipelines.</li>
              <li><b>Pipeline Template Management</b> - Create and manage personalized pipeline templates according to your organization’s needs. Templates created will be stored in Pipeline Catalog.</li>
              <li><b>Remote Application Management</b> - View/Manage version and telemetry information generation from remote applications.</li>
              <li><b>Task Template Management</b> - Create and manage personalized task templates according to your organization’s needs.</li>
              <li><b>Tool Management</b> - Manage and onboard new Tools for Registry and Pipeline use by creating Tool Categories and Identifiers.</li>
            </ul>
          </div>
          <div><b>Platform Analysis</b>
            <ul style={{listStyleType: "none"}}>
              <li><b>API Connection Test</b> - Run an API connection test against the server using the Okta Authentication Token and Axios.js. </li>
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
      helpTopic={"Administration Tools"}
      helpDocumentation={getHelpDocumentation()}
    >
    </HelpOverlayBase>
  );
}


export default React.memo(AdministrationToolsHelpDocumentation);