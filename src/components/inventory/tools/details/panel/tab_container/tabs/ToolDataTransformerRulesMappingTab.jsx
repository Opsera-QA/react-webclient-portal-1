import React from "react";
import PropTypes from "prop-types";
import CustomTab from "components/common/tabs/CustomTab";
import {faBrowser} from "@fortawesome/pro-light-svg-icons";
import {toolIdentifierConstants} from "components/admin/tools/identifiers/toolIdentifier.constants";

export const DATA_TRANSFORMER_RULES_SUPPORTED_TOOL_IDENTIFIERS = [ 
  toolIdentifierConstants.TOOL_IDENTIFIERS.SFDC_CONFIGURATOR,
];

function ToolDataTransformerRulesMappingTab({ toolModel, handleTabClick, activeTab }) {
  if (!DATA_TRANSFORMER_RULES_SUPPORTED_TOOL_IDENTIFIERS.includes(toolModel?.getData("tool_identifier"))) {
    return null;
  }

  return (
    <CustomTab
      icon={faBrowser}
      tabName={"data_transformer"}
      handleTabClick={handleTabClick}
      activeTab={activeTab}
      tabText={"Data Transformer Rules"}
      accessRestricted={!toolModel.canPerformAction("update_tool_applications")}
    />
  );
}

ToolDataTransformerRulesMappingTab.propTypes = {
  toolModel: PropTypes.object,
  handleTabClick: PropTypes.func,
  activeTab: PropTypes.string,
};

export default ToolDataTransformerRulesMappingTab;
