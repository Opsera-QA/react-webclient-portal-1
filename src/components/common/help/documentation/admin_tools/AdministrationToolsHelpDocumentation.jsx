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
          <ul style={{listStyleType: "none"}}>
            <li><b>API Connection Test</b> - Run an API connection test against the server using the Okta Authentication Token and Axios.js. </li>
            <li><b>Customer Onboarding</b> - Onboard a new customer to the Opsera Platform.</li>
            <li><b>KPI Identifier Management</b> - Create and manage KPI Identifiers to add metrics to the Insights Marketplace. </li>
            <li><b>Organization Management</b> - Create and manage LDAP organizations.</li>
            <li><b>Pipeline Storage Management</b> - View and Manage records created during the use of Tasks and Pipelines.</li>
            <li><b>Registered Users Management</b> - Manage Opsera User settings, deactivate Opsera Users, and deploy ELK tool stacks for Opsera Users.</li>
            <li><b>Site Notification Manager</b> - Create personalized Site Notifications by Type, including System Maintenance, Service Outage, Success, or Informational Message that will be displayed across the site for every User.</li>
            <li><b>Pipeline Template Management</b> - Create and manage personalized pipeline templates according to your organization’s needs. Templates created will be stored in Pipeline Catalog.</li>
            <li><b>Tool Management</b> - Manage and onboard new Tools for Registry and Pipeline use by creating Tool Categories and Identifiers.</li>
          </ul>
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