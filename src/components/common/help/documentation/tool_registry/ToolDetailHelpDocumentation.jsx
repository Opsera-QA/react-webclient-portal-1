import React, { useContext } from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";
import {
  doesToolSupportTab,
  TOOL_DETAIL_PANEL_TABS
} from "components/inventory/tools/tool_details/tab_container/ToolDetailPanelTabContainer";

function ToolDetailHelpDocumentation({toolIdentifier}) {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getVaultTabInformation = () => {
    if (doesToolSupportTab(toolIdentifier, TOOL_DETAIL_PANEL_TABS.VAULT) === true) {
      return (
        <li><b>Vault</b> - Vault Management. Opsera secures tokens, passwords, and other sensitive information in a Hashicorp Vault Instance. By default, Opsera uses the vault instance that is spun up for the specific organization. Users have the option to choose whether to store information in the default Opsera provided vault or configure their own Hashicorp vault instance in the Tool Registry. This setting only applies to this tool. All other tools will use the Opsera provided default vault unless specified by the user. </li>
      );
    }
  };

  const getRepositoriesTabInformation = () => {
    if (doesToolSupportTab(toolIdentifier, TOOL_DETAIL_PANEL_TABS.REPOSITORIES) === true) {
      return (
        <li><b>Repositories</b> - Add, modify or delete tool repositories. These repositories can be entered once and reused across the Opsera platform.</li>
      );
    }
  };

  const getJobsTabInformation = () => {
    if (doesToolSupportTab(toolIdentifier, TOOL_DETAIL_PANEL_TABS.JOBS) === true) {
      return (
        <li><b>Jobs</b> - Manage the tool jobs. Create settings for custom jobs to be triggered in Pipeline steps (when configuring a pipeline). These settings can be entered once and reused across the Opsera platform.</li>
      );
    }
  };

  const getAccountsTabInformation = () => {
    if (doesToolSupportTab(toolIdentifier, TOOL_DETAIL_PANEL_TABS.ACCOUNTS) === true) {
      return (
        <li><b>Accounts</b> - Register account credentials in the tool for use in pipelines. Adding accounts here will make them available inside relevant Pipeline steps. Option to select a configured Bitbucket, Coverity, Github, Gitlab or Azure DevOps tool for use in pipelines.</li>
      );
    }
  };

  const getPathsTabInformation = () => {
    if (doesToolSupportTab(toolIdentifier, TOOL_DETAIL_PANEL_TABS.PATHS) === true) {
      return (
        <li><b>Paths</b> - Specify the repository package path from which components can be retrieved in Salesforce Pipeline Wizard.</li>
      );
    }
  };

  const getLogsTabInformation = () => {
    if (doesToolSupportTab(toolIdentifier, TOOL_DETAIL_PANEL_TABS.LOGS) === true) {
      return (
        <li><b>Logs</b> - View log activity for actions performed against this tool. This includes creation or deletion of jobs and applications and account registration.</li>
      );
    }
  };

  const getApplicationsTabInformation = () => {
    if (doesToolSupportTab(toolIdentifier, TOOL_DETAIL_PANEL_TABS.APPLICATIONS) === true) {
      return (
        <li><b>Applications</b> - Create and manage applications in the tool.</li>
      );
    }
  };

  const getProjectsTabInformation = () => {
    if (doesToolSupportTab(toolIdentifier, TOOL_DETAIL_PANEL_TABS.PROJECTS) === true) {
      return (
        <li><b>Projects</b> - Create settings for custom project configurations.</li>
      );
    }
  };

  const getValidationRulesTabInformation = () => {
    if (doesToolSupportTab(toolIdentifier, TOOL_DETAIL_PANEL_TABS.MAPPING) === true) {
      return (
        <li><b>Validation Rules</b> - Manage Rule Validation for Informatica pipelines.</li>
      );
    }
  };

  const getStorageTabInformation = () => {
    if (doesToolSupportTab(toolIdentifier, TOOL_DETAIL_PANEL_TABS.STORAGE) === true) {
      return (
        <li><b>Storage</b> - Manage storage information to be saved in the Vault.</li>
      );
    }
  };

  const getArgoClustersTabInformation = () => {
    if (doesToolSupportTab(toolIdentifier, TOOL_DETAIL_PANEL_TABS.CLUSTERS) === true) {
      return (
        <li><b>Clusters</b> - Manage K8 Clusters to be configured in the Applications tab.</li>
      );
    }
  };

  const getOrganizationsTabInformation = () => {
    if (doesToolSupportTab(toolIdentifier, TOOL_DETAIL_PANEL_TABS.ORGANIZATIONS) === true) {
      return (
        <li><b>Organizations</b> - Manage Terraform Cloud Organizations.</li>
      );
    }
  };

  const getWorkspacesTabInformation = () => {
    if (doesToolSupportTab(toolIdentifier, TOOL_DETAIL_PANEL_TABS.WORKSPACES) === true) {
      return (
        <li><b>Workspaces</b> - Manage Terraform Cloud Organization Workspaces.</li>
      );
    }
  };

  // <DocumentationListItem
  //   label={"Organizations"}
  //   description={"Manage Terraform cloud organizations"}
  // />

  const getHelpDocumentation = () => {
    return (
      <div>
        <div>Register, track and configure your tool. Each tool contains tabs unique to its configuration needs.</div>
          <div className={"mt-2"}>
            <ul style={{listStyleType: "none"}}>
              <li><b>Summary</b> - Includes information added upon tool creation such as Tool Name, Tool Identifier, Cost Center, Tags, Classification, Description and user Access Roles.</li>
              <li><b>Attributes</b> - Includes Organizations, Contacts, Licensing, Locations, Applications and Compliance.</li>
              <li><b>Connection</b> - Enter tool specific configuration information and test to see if connection succeeds. The settings applied will be used in pipelines.</li>
              {getVaultTabInformation()}
              {getValidationRulesTabInformation()}
              {getApplicationsTabInformation()}
              {getStorageTabInformation()}
              {getArgoClustersTabInformation()}
              {getProjectsTabInformation()}
              {getRepositoriesTabInformation()}
              {getJobsTabInformation()}
              {getAccountsTabInformation()}
              {getLogsTabInformation()}
              {getPathsTabInformation()}
              {getOrganizationsTabInformation()}
              {getWorkspacesTabInformation()}
              <li><b>Usage</b> - View and navigate to all pipelines in which this tool is being used.</li>
            </ul>
          </div>
      </div>
    );
  };

  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      helpTopic={"Tool Details"}
      helpDocumentation={getHelpDocumentation()}
    />
  );
}

ToolDetailHelpDocumentation.propTypes ={
  toolIdentifier: PropTypes.string,
};

export default React.memo(ToolDetailHelpDocumentation);