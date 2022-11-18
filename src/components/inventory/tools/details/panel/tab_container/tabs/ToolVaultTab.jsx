import React from "react";
import PropTypes from "prop-types";
import CustomTab from "components/common/tabs/CustomTab";
import {faKey,} from "@fortawesome/pro-light-svg-icons";
import {toolIdentifierConstants} from "components/admin/tools/identifiers/toolIdentifier.constants";

export const VAULT_SUPPORTED_TOOL_IDENTIFIERS = [
  toolIdentifierConstants.TOOL_IDENTIFIERS.JENKINS,
  toolIdentifierConstants.TOOL_IDENTIFIERS.GITLAB,
  toolIdentifierConstants.TOOL_IDENTIFIERS.GITHUB,
  toolIdentifierConstants.TOOL_IDENTIFIERS.SONAR,
  toolIdentifierConstants.TOOL_IDENTIFIERS.KAFKA_CONNECT,
  toolIdentifierConstants.TOOL_IDENTIFIERS.SNAPLOGIC,
  toolIdentifierConstants.TOOL_IDENTIFIERS.AWS_ACCOUNT,
  toolIdentifierConstants.TOOL_IDENTIFIERS.NEXUS,
  toolIdentifierConstants.TOOL_IDENTIFIERS.ARGO,
  toolIdentifierConstants.TOOL_IDENTIFIERS.SLACK,
  toolIdentifierConstants.TOOL_IDENTIFIERS.PROVAR,
  toolIdentifierConstants.TOOL_IDENTIFIERS.SALESFORCE_CODE_ANALYZER,
  toolIdentifierConstants.TOOL_IDENTIFIERS.SFDC_CONFIGURATOR,
  toolIdentifierConstants.TOOL_IDENTIFIERS.EXTERNAL_API_INTEGRATOR,
  toolIdentifierConstants.TOOL_IDENTIFIERS.FORTIFY,
  toolIdentifierConstants.TOOL_IDENTIFIERS.ANSIBLE,
  toolIdentifierConstants.TOOL_IDENTIFIERS.TWISTLOCK,
  toolIdentifierConstants.TOOL_IDENTIFIERS.ANCHORE_INTEGRATOR,
  toolIdentifierConstants.TOOL_IDENTIFIERS.JFROG_ARTIFACTORY_DOCKER,
  toolIdentifierConstants.TOOL_IDENTIFIERS.JFROG_ARTIFACTORY_MAVEN,
];

function ToolVaultTab({ toolModel, handleTabClick, activeTab }) {
  if (!VAULT_SUPPORTED_TOOL_IDENTIFIERS.includes(toolModel?.getData("tool_identifier"))) {
    return null;
  }

  return (
    <CustomTab
      icon={faKey}
      tabName={"vault"}
      handleTabClick={handleTabClick}
      activeTab={activeTab}
      tabText={"Vault"}
      accessRestricted={toolModel?.canUpdateRegistryToolVaultSettings() !== true}
    />
  );
}

ToolVaultTab.propTypes = {
  toolModel: PropTypes.object,
  handleTabClick: PropTypes.func,
  activeTab: PropTypes.string,
};

export default ToolVaultTab;


