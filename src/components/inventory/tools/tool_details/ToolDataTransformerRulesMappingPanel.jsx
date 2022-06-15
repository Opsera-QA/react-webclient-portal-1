import React from "react";
import PropTypes from "prop-types";
import SfdcDataTransformerRulesPanel from "./tool_jobs/sfdc/data_transformer_rules_mapping/SfdcDataTransformerRulesPanel";
import {toolIdentifierConstants} from "../../../admin/tools/identifiers/toolIdentifier.constants";

function ToolDataTransformerRulesMappingPanel({ toolData, loadData, isLoading }) {
  const getPanel = (toolIdentifier, loadData) => {
    switch (toolIdentifier) {      
      case toolIdentifierConstants.TOOL_IDENTIFIERS.SFDC_CONFIGURATOR:
        return (
          <SfdcDataTransformerRulesPanel
            toolActions={toolData?.getData("actions")}
            isLoading={isLoading}
            toolData={toolData}
            loadData={loadData}
          />
        );
      default:
        return (
          <div className="text-center p-5 text-muted mt-5">
            Tool Mapping is not currently available for this tool.
          </div>
        );
    }
  };

  const getBody = () => {
    if (toolData == null) {
      return null;
    }
    
    return getPanel(toolData.getPersistData()?.tool_identifier?.toLowerCase(), loadData);
  };

  return (
    <>
      <div className="text-muted p-3">
        <div className="h6">Manage Data Transformer Rules</div>        
        {getBody()}
      </div>
    </>
  );
}

ToolDataTransformerRulesMappingPanel.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default ToolDataTransformerRulesMappingPanel;
