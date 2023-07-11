import React, { useContext } from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";
import {
  doesToolSupportTab,
  TOOL_DETAIL_PANEL_TABS
} from "components/inventory/tools/details/panel/tab_container/ToolDetailPanelTabContainer";
import {toolIdentifierConstants} from "../../../../admin/tools/identifiers/toolIdentifier.constants";


function ToolDetailHelpDocumentation({toolIdentifier}) {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getConnectionsTabInformation = () => {
    if (doesToolSupportTab(toolIdentifier, TOOL_DETAIL_PANEL_TABS.CONNECTION) === true) {
      return (
        <li><b>Connection</b> - Enter tool specific configuration information and test to see if connection succeeds. The settings applied will be used in pipelines.</li>
      );
    }
  };

  const getEndpointsTabInformation = () => {
    if (doesToolSupportTab(toolIdentifier, TOOL_DETAIL_PANEL_TABS.ENDPOINTS) === true) {
      return (
        <li><b>Endpoints</b> - Configure external API integrator endpoints.</li>
      );
    }
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

  const getProvidersTabInformation = () => {
    if (doesToolSupportTab(toolIdentifier, TOOL_DETAIL_PANEL_TABS.PROVIDERS) === true) {
      return (
        <li><b>Providers</b> - Manage Terraform VCS providers. </li>
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


  const getDataTransformerRulesTabInformation = () => {
    if (doesToolSupportTab(toolIdentifier, TOOL_DETAIL_PANEL_TABS.DATA_TRANSFORMER) === true) {
      return (
        <li><b>MetaData Transformer Rules</b> - Manage MetaData Transformer Rules.</li>
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

  const getLicenseTabInformation = () => {
    if (doesToolSupportTab(toolIdentifier, TOOL_DETAIL_PANEL_TABS.LICENSES) === true) {
      return (
        <li><b>License</b> - Select License Type and its corresponding License Key.</li>
      );
    }
  };

  const getToolSummary = () => {
    if (toolIdentifier == null || toolIdentifier === "" || toolIdentifier == null) {
      return <></>;
    }

    switch (toolIdentifier) {
    case toolIdentifierConstants.TOOL_IDENTIFIERS.EXTERNAL_API_INTEGRATOR:
      return (
        <div>
          <div>Register, track and configure your tool to orchestrate a chain of actions that help to achieve the continuous integration process. Each tool contains tabs unique to configuration needs.</div>
          <div>For more information on how to register the <b>External API Integrator</b> tool, view the <a href="https://docs.opsera.io/tool-registry/external-api-integrator-tool-registration" target="_blank" rel="noreferrer"><b>External API Integrator Tool Registration Help Documentation</b>.</a></div>
        </div>
      );
    case toolIdentifierConstants.TOOL_IDENTIFIERS.ANCHORE_INTEGRATOR:
      return (
        <div>
          <div>Register, track and configure your tool to orchestrate a chain of actions that help to achieve the continuous integration process. Each tool contains tabs unique to configuration needs.</div>
          <div>For more information on how to register the <b>Anchore</b> tool, view the <a href="https://docs.opsera.io/tool-registry/anchore-tool-registration" target="_blank" rel="noreferrer"><b>Anchore Tool Registration Help Documentation</b>.</a></div>
        </div>
      );
    case toolIdentifierConstants.TOOL_IDENTIFIERS.ANSIBLE:
      return (
        <div>
          <div>Register, track and configure your tool to orchestrate a chain of actions that help to achieve the continuous integration process. Each tool contains tabs unique to configuration needs.</div>
          <div>For more information on how to register the <b>Ansible</b> tool, view the <a href="https://docs.opsera.io/tool-registry/ansible-tool-registration" target="_blank" rel="noreferrer"><b>Ansible Tool Registration Help Documentation</b>.</a></div>
        </div>
      );
    case toolIdentifierConstants.TOOL_IDENTIFIERS.APIGEE:
      return (
        <div>
          <div>Register, track and configure your tool to orchestrate a chain of actions that help to achieve the continuous integration process. Each tool contains tabs unique to configuration needs.</div>
          <div>For more information on how to register the <b>Apigee</b> tool, view the <a href="https://docs.opsera.io/tool-registry/apigee-tool-registration" target="_blank" rel="noreferrer"><b>Apigee Tool Registration Help Documentation</b>.</a></div>
        </div>
      );
    case toolIdentifierConstants.TOOL_IDENTIFIERS.ARGO:
      return (
        <div>
          <div>Register, track and configure your tool to orchestrate a chain of actions that help to achieve the continuous integration process. Each tool contains tabs unique to configuration needs.</div>
          <div>For more information on how to register the <b>Argo</b> tool, view the <a href="https://docs.opsera.io/tool-registry/argo-cd-tool-registration" target="_blank" rel="noreferrer"><b>Argo CD Tool Registration Help Documentation</b>.</a></div>
        </div>
      );
    case toolIdentifierConstants.TOOL_IDENTIFIERS.AQUASEC:
      return (
        <div>
          <div>Register, track and configure your tool to orchestrate a chain of actions that help to achieve the continuous integration process. Each tool contains tabs unique to configuration needs.</div>
          <div>For more information on how to register the <b>Aquasec</b> tool, view the <a href="https://docs.opsera.io/tool-registry/aqua-security-scan-tool-registration" target="_blank" rel="noreferrer"><b>Aqua Security Scan Tool Registration Help Documentation</b>.</a></div>
        </div>
      );
    case toolIdentifierConstants.TOOL_IDENTIFIERS.AWS_ACCOUNT:
      return (
        <div>
          <div>Register, track and configure your tool to orchestrate a chain of actions that help to achieve the continuous integration process. Each tool contains tabs unique to configuration needs.</div>
          <div>For more information on how to register the <b>AWS</b> tool, view the <a href="https://docs.opsera.io/tool-registry/aws-tool-registration" target="_blank" rel="noreferrer"><b>AWS Tool Registration Help Documentation</b>.</a></div>
        </div>
      );
    case toolIdentifierConstants.TOOL_IDENTIFIERS.AZURE:
      return (
        <div>
          <div>Register, track and configure your tool to orchestrate a chain of actions that help to achieve the continuous integration process. Each tool contains tabs unique to configuration needs.</div>
          <div>For more information on how to register the <b>Azure</b> tool, view the <a href="https://docs.opsera.io/tool-registry/azure-tool-registration" target="_blank" rel="noreferrer"><b>Azure Tool Registration Help Documentation</b>.</a></div>
        </div>
      );
    case toolIdentifierConstants.TOOL_IDENTIFIERS.BITBUCKET:
      return (
        <div>
          <div>Register, track and configure your tool to orchestrate a chain of actions that help to achieve the continuous integration process. Each tool contains tabs unique to configuration needs.</div>
          <div>For more information on how to register the <b>Bitbucket</b> tool, view the <a href="https://docs.opsera.io/tool-registry/bitbucket-tool-registration" target="_blank" rel="noreferrer"><b>Bitbucket Tool Registration Help Documentation</b>.</a></div>
        </div>
      );
    case toolIdentifierConstants.TOOL_IDENTIFIERS.BUILDKITE:
      return (
        <div>
          <div>Register, track and configure your tool to orchestrate a chain of actions that help to achieve the continuous integration process. Each tool contains tabs unique to configuration needs.</div>
          <div>For more information on how to register the <b>Buildkite</b> tool, view the <a href="https://docs.opsera.io/tool-registry/buildkite-tool-registration" target="_blank" rel="noreferrer"><b>Buildkite Tool Registration Help Documentation</b>.</a></div>
        </div>
      );
    case toolIdentifierConstants.TOOL_IDENTIFIERS.BOOMI:
      return (
        <div>
          <div>Register, track and configure your tool to orchestrate a chain of actions that help to achieve the continuous integration process. Each tool contains tabs unique to configuration needs.</div>
          <div>For more information on how to register the <b>Boomi</b> tool, view the <a href="https://docs.opsera.io/tool-registry/boomi-tool-registration" target="_blank" rel="noreferrer"><b>Boomi Tool Registration Help Documentation</b>.</a></div>
        </div>
      );
    case toolIdentifierConstants.TOOL_IDENTIFIERS.COVERITY:
      return (
        <div>
          <div>Register, track and configure your tool to orchestrate a chain of actions that help to achieve the continuous integration process. Each tool contains tabs unique to configuration needs.</div>
          <div>For more information on how to register the <b>Coverity</b> tool, view the <a href="https://docs.opsera.io/tool-registry/coverity-tool-registration" target="_blank" rel="noreferrer"><b>Coverity Tool Registration Help Documentation</b>.</a></div>
        </div>
      );
    case toolIdentifierConstants.TOOL_IDENTIFIERS.FLYWAY_DATABASE_MIGRATOR:
      return (
        <div>
          <div>Register, track and configure your tool to orchestrate a chain of actions that help to achieve the continuous integration process. Each tool contains tabs unique to configuration needs.</div>
          <div>For more information on how to register the <b>Flyway Database Migrator</b> tool, view the <a href="https://docs.opsera.io/tool-registry/flyway-database-tool-registration" target="_blank" rel="noreferrer"><b>Flyway Database Tool Registration Help Documentation</b>.</a></div>
        </div>
      );
    case toolIdentifierConstants.TOOL_IDENTIFIERS.GITHUB:
      return (
        <div>
          <div>Register, track and configure your tool to orchestrate a chain of actions that help to achieve the continuous integration process. Each tool contains tabs unique to configuration needs.</div>
          <div>For more information on how to register the <b>GitHub</b> tool, view the <a href="https://docs.opsera.io/tool-registry/github-tool-registration" target="_blank" rel="noreferrer"><b>GitHub Tool Registration Help Documentation</b>.</a></div>
        </div>
      );
    case toolIdentifierConstants.TOOL_IDENTIFIERS.GITLAB:
      return (
        <div>
          <div>Register, track and configure your tool to orchestrate a chain of actions that help to achieve the continuous integration process. Each tool contains tabs unique to configuration needs.</div>
          <div>For more information on how to register the <b>GitLab</b> tool, view the <a href="https://docs.opsera.io/tool-registry/gitlab-tool-registration" target="_blank" rel="noreferrer"><b>GitLab Tool Registration Help Documentation</b>.</a></div>
        </div>
      );
    case toolIdentifierConstants.TOOL_IDENTIFIERS.GCHAT:
      return (
        <div>
          <div>Register, track and configure your tool to orchestrate a chain of actions that help to achieve the continuous integration process. Each tool contains tabs unique to configuration needs.</div>
          <div>For more information on how to register the <b>Google Chat</b> tool, view the <a href="https://docs.opsera.io/tool-registry/google-chat-tool-registration" target="_blank" rel="noreferrer"><b>Google Chat Tool Registration Help Documentation</b>.</a></div>
          <div className={"mt-2"}><i><b>Notifications</b> - To receive a notification within Google Chat, view <a href="https://docs.opsera.io/notifications/pipeline-notifications#configure-google-chat-notification" target="_blank" rel="noopener noreferrer"><b>Google Chat Notifications Help Documentation</b></a></i>.</div>
        </div>
      );
    case toolIdentifierConstants.TOOL_IDENTIFIERS.INFORMATICA:
      return (
        <div>
          <div>Register, track and configure your tool to orchestrate a chain of actions that help to achieve the continuous integration process. Each tool contains tabs unique to configuration needs.</div>
          <div>For more information on how to register the <b>Informatica</b> tool, view the <a href="https://docs.opsera.io/tool-registry/informatica-tool-registration" target="_blank" rel="noreferrer"><b>Informatica Tool Registration Help Documentation</b>.</a></div>
        </div>
      );
    case toolIdentifierConstants.TOOL_IDENTIFIERS.JENKINS:
      return (
        <div>
          <div>Register, track and configure your tool to orchestrate a chain of actions that help to achieve the continuous integration process. Each tool contains tabs unique to configuration needs.</div>
          <div>For more information on how to register the <b>Jenkins</b> tool, view the <a href="https://docs.opsera.io/tool-registry/jenkins-tool-registration" target="_blank" rel="noreferrer"><b>Jenkins Tool Registration Help Documentation</b>.</a></div>
        </div>
      );
    case toolIdentifierConstants.TOOL_IDENTIFIERS.JIRA:
      return (
        <div>
          <div>Register, track and configure your tool to orchestrate a chain of actions that help to achieve the continuous integration process. Each tool contains tabs unique to configuration needs.</div>
          <div>For more information on how to register the <b>Jira</b> tool, view the <a href="https://docs.opsera.io/tool-registry/jira-tool-registration" target="_blank" rel="noreferrer"><b>Jira Tool Registration Help Documentation</b>.</a></div>
          <div className={"mt-2"}><i><b>Notifications</b> - To receive a notification within a specific Jira ticket, view <a href="https://docs.opsera.io/notifications/pipeline-notifications#configure-jira-notifications" target="_blank" rel="noopener noreferrer"><b>Configure JIRA Notifications Help Documentation</b></a></i>.</div>
        </div>
      );
    case toolIdentifierConstants.TOOL_IDENTIFIERS.TEAMS:
      return (
        <div>
          <div>Register, track and configure your tool to orchestrate a chain of actions that help to achieve the continuous integration process. Each tool contains tabs unique to configuration needs.</div>
          <div>For more information on how to register the <b>Teams</b> tool, view the <a href="https://docs.opsera.io/tool-registry/microsoft-teams-tool-registration" target="_blank" rel="noreferrer"><b>Microsoft Teams Tool Registration Help Documentation</b>.</a></div>
          <div className={"mt-2"}><i><b>Notifications</b> - To receive a notification within Microsoft Teams, view <a href="https://docs.opsera.io/notifications/pipeline-notifications#configure-microsoft-teams-notifications" target="_blank" rel="noopener noreferrer"><b>Configure Microsoft Teams Notifications Help Documentation</b></a></i>.</div>
        </div>
      );
    case toolIdentifierConstants.TOOL_IDENTIFIERS.OCTOPUS:
      return (
        <div>
          <div>Register, track and configure your tool to orchestrate a chain of actions that help to achieve the continuous integration process. Each tool contains tabs unique to configuration needs.</div>
          <div>For more information on how to register the <b>Octopus Deploy</b> tool, view the <a href="https://docs.opsera.io/tool-registry/octopus-deploy-tool-registration" target="_blank" rel="noreferrer"><b>Octopus Deploy Tool Registration Help Documentation</b>.</a></div>
        </div>
      );
    case toolIdentifierConstants.TOOL_IDENTIFIERS.SALESFORCE_CODE_ANALYZER:
      return (
        <div>
          <div>Register, track and configure your tool to orchestrate a chain of actions that help to achieve the continuous integration process. Each tool contains tabs unique to configuration needs.</div>
          <div>For more information on how to register the <b>Salesforce Code Analyzer</b> tool, view the <a href="https://docs.opsera.io/tool-registry/salesforce-code-analyzer-tool-registration" target="_blank" rel="noreferrer"><b>Salesforce Code Analyzer Tool Registration Help Documentation</b>.</a></div>
        </div>
      );
    case toolIdentifierConstants.TOOL_IDENTIFIERS.SAP_CPQ:
      return (
        <div>
          <div>Register, track and configure your tool to orchestrate a chain of actions that help to achieve the continuous integration process. Each tool contains tabs unique to configuration needs.</div>
          <div>For more information on how to register the <b>SAP CPQ</b> tool, view the <a href="https://docs.opsera.io/tool-registry/sap-cpq-tool-registration" target="_blank" rel="noreferrer"><b>SAP CPQ Tool Registration Help Documentation</b>.</a></div>
        </div>
      );
    case toolIdentifierConstants.TOOL_IDENTIFIERS.SELENIUM:
      return (
        <div>
          <div>Register, track and configure your tool to orchestrate a chain of actions that help to achieve the continuous integration process. Each tool contains tabs unique to configuration needs.</div>
          <div>For more information on how to register the <b>Selenium</b> tool, view the <a href="https://docs.opsera.io/tool-registry/selenium-framework-tool-registration" target="_blank" rel="noreferrer"><b>Selenium Tool Registration Help Documentation</b>.</a></div>
        </div>
      );
    case toolIdentifierConstants.TOOL_IDENTIFIERS.SERVICE_NOW:
      return (
        <div>
          <div>Register, track and configure your tool to orchestrate a chain of actions that help to achieve the continuous integration process. Each tool contains tabs unique to configuration needs.</div>
          <div>For more information on how to register the <b>ServiceNow</b> tool, view the <a href="https://docs.opsera.io/tool-registry/servicenow-tool-registration" target="_blank" rel="noreferrer"><b>ServiceNow Tool Registration Help Documentation</b>.</a></div>
          <div className={"mt-2"}><i><b>Notifications</b> - To receive a notification within ServiceNow, view <a href="https://docs.opsera.io/notifications/pipeline-notifications#configure-servicenow-notification" target="_blank" rel="noopener noreferrer"><b>Configure ServiceNow Notifications Help Documentation</b></a></i>.</div>
        </div>
      );
    case toolIdentifierConstants.TOOL_IDENTIFIERS.SFDC_CONFIGURATOR:
      return (
        <div>
          <div>Register, track and configure your tool to orchestrate a chain of actions that help to achieve the continuous integration process. Each tool contains tabs unique to configuration needs.</div>
          <div>For more information on how to register the <b>Salesforce Configurator</b> tool, view the <a href="https://docs.opsera.io/tool-registry/salesforce-configurator-tool-registration" target="_blank" rel="noreferrer"><b>Salesforce Configurator Tool Registration Help Documentation</b>.</a></div>
        </div>
      );
    case toolIdentifierConstants.TOOL_IDENTIFIERS.SLACK:
      return (
        <div>
          <div>Register, track and configure your tool to orchestrate a chain of actions that help to achieve the continuous integration process. Each tool contains tabs unique to configuration needs. For more information on how to register the <b>Slack</b> tool, view the <a href="https://docs.opsera.io/tool-registry/slack-tool-registration" target="_blank" rel="noreferrer"><b>Slack Tool Registration Help Documentation</b>.</a></div>
          <div className={"mt-2"}><i><b>Notifications</b> - To receive a notification within a specific Slack channel, you must connect Opsera app to the channel. For instructions, view <a href="https://docs.opsera.io/tool-registry/slack-tool-registration#add-opsera-app-to-slack-channel" target="_blank" rel="noopener noreferrer"><b>Add Opsera App to Slack Channel Help Documentation</b></a></i>.</div>
        </div>
      );
    case toolIdentifierConstants.TOOL_IDENTIFIERS.SONAR:
      return (
        <div>
          <div>Register, track and configure your tool to orchestrate a chain of actions that help to achieve the continuous integration process. Each tool contains tabs unique to configuration needs.</div>
          <div>For more information on how to register the <b>SonarQube</b> tool, view the <a href="https://docs.opsera.io/tool-registry/sonarqube-tool-registration" target="_blank" rel="noreferrer"><b>SonarQube Tool Registration Help Documentation</b>.</a></div>
        </div>
      );
    case toolIdentifierConstants.TOOL_IDENTIFIERS.SNAPLOGIC:
      return (
        <div>
          <div>Register, track and configure your tool to orchestrate a chain of actions that help to achieve the continuous integration process. Each tool contains tabs unique to configuration needs.</div>
          <div>For more information on how to register the <b>Snaplogic</b> tool, view the <a href="https://docs.opsera.io/tool-registry/snaplogic-tool-registration" target="_blank" rel="noreferrer"><b>SnapLogic Tool Registration Help Documentation</b>.</a></div>
        </div>
      );
    case toolIdentifierConstants.TOOL_IDENTIFIERS.SNYK:
      return (
        <div>
          <div>Register, track and configure your tool to orchestrate a chain of actions that help to achieve the continuous integration process. Each tool contains tabs unique to configuration needs.</div>
          <div>For more information on how to register the <b>Snyk</b> tool, view the <a href="https://docs.opsera.io/tool-registry/snyk-tool-registration" target="_blank" rel="noreferrer"><b>Snyk Tool Registration Help Documentation</b>.</a></div>
        </div>
      );
    case toolIdentifierConstants.TOOL_IDENTIFIERS.TERRAFORM_CLOUD:
      return (
        <div>
          <div>Register, track and configure your tool to orchestrate a chain of actions that help to achieve the continuous integration process. Each tool contains tabs unique to configuration needs.</div>
          <div>For more information on how to register the <b>Terraform Cloud</b> tool, view the <a href="https://docs.opsera.io/tool-registry/terraform-cloud-tool-registration" target="_blank" rel="noreferrer"><b>Terraform Cloud Tool Registration Help Documentation</b>.</a></div>
        </div>
      );
    case toolIdentifierConstants.TOOL_IDENTIFIERS.TERRASCAN:
      return (
        <div>
          <div>Register, track and configure your tool to orchestrate a chain of actions that help to achieve the continuous integration process. Each tool contains tabs unique to configuration needs.</div>
          <div>For more information on how to register the <b>Terrascan</b> tool, view the <a href="https://docs.opsera.io/tool-registry/terrascan-tool-registration" target="_blank" rel="noreferrer"><b>Terrascan Tool Registration Help Documentation</b>.</a></div>
        </div>
      );
    case toolIdentifierConstants.TOOL_IDENTIFIERS.TWISTLOCK:
      return (
        <div>
          <div>Register, track and configure your tool to orchestrate a chain of actions that help to achieve the continuous integration process. Each tool contains tabs unique to configuration needs.</div>
          <div>For more information on how to register the <b>Twistlock</b> tool, view the <a href="https://docs.opsera.io/tool-registry/twistlock-tool-integration" target="_blank" rel="noreferrer"><b>Twistlock Tool Registration Help Documentation</b>.</a></div>
        </div>
      );
    case toolIdentifierConstants.TOOL_IDENTIFIERS.BLACKDUCK:
      return (
        <div>
          <div>Register, track and configure your tool to orchestrate a chain of actions that help to achieve the continuous integration process. Each tool contains tabs unique to configuration needs.</div>
          <div>For more information on how to register the <b>Blackduck</b> tool, view the <a href="https://docs.opsera.io/tool-registry/black-duck-tool-registration" target="_blank" rel="noreferrer"><b>Blackduck Tool Registration Help Documentation</b>.</a></div>
        </div>
      );
    case toolIdentifierConstants.TOOL_IDENTIFIERS.HASHICORP_VAULT:
      return (
        <div>
          <div>Register, track and configure your tool to orchestrate a chain of actions that help to achieve the continuous integration process. Each tool contains tabs unique to configuration needs.</div>
          <div>For more information on how to register the <b>Hashicorp Vault</b> tool, view the <a href="https://docs.opsera.io/tool-registry/hashicorp-vault-registration" target="_blank" rel="noreferrer"><b>Hashicorp Vault Registration Help Documentation</b>.</a></div>
        </div>
      );
    case toolIdentifierConstants.TOOL_IDENTIFIERS.FORTIFY:
      return (
        <div>
          <div>Register, track and configure your tool to orchestrate a chain of actions that help to achieve the continuous integration process. Each tool contains tabs unique to configuration needs.</div>
          <div>For more information on how to register the <b>Fortify</b> tool, view the <a href="https://docs.opsera.io/tool-registry/fortify-tool-registration" target="_blank" rel="noreferrer"><b>Fortify Tool Help Documentation</b>.</a></div>
        </div>
      );

    default:
      return <div>Register, track and configure your tool to orchestrate a chain of actions that help to achieve the continuous integration process. Each tool contains tabs unique to configuration needs.</div>;
    }
  };

  const getHelpDocumentation = () => {
    return (
      <div>
        <div>{getToolSummary()}</div>
        <div className={"mt-2"}>
          <ul style={{listStyleType: "none"}}>
            <li><b>Summary</b> - Includes information added upon tool creation such as Tool Name, Tool Identifier, Cost Center, Tags, Classification, Description and user Access Rules.</li>
            <li><b>Attributes</b> - Includes Organizations, Contacts, Licensing, Locations, Applications and Compliance.</li>
            {getVaultTabInformation()}
            {getConnectionsTabInformation()}
            {getDataTransformerRulesTabInformation()}
            {getEndpointsTabInformation()}
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
            {getProvidersTabInformation()}
            {getWorkspacesTabInformation()}
            <li><b>Usage</b> - View and navigate to all pipelines in which this tool is being used.</li>
            {getLicenseTabInformation()}
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