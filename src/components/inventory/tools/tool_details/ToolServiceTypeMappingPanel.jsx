import React from "react";
import InformaticaMapping from "./tool_jobs/informatica/mapping/InformaticaMapping";
import PropTypes from "prop-types";
import SfdxRulesPanel from "./tool_jobs/salesforce_code_analyzer/sfdx_scan_rule_mapping/SfdxRulesPanel";
import {toolIdentifierConstants} from "../../../admin/tools/identifiers/toolIdentifier.constants";

function ToolServiceTypeMappingPanel({ toolData, loadData, isLoading }) {
  const getPanel = (toolIdentifier, loadData) => {
    switch (toolIdentifier) {
      case "informatica":
        return (
          <InformaticaMapping
            toolActions={toolData?.getData("actions")}
            isLoading={isLoading}
            toolData={toolData}
            loadData={loadData}
          />
        );
      case toolIdentifierConstants.TOOL_IDENTIFIERS.SALESFORCE_CODE_ANALYZER:
        return (
          <SfdxRulesPanel
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
    return getPanel(toolData.getData("tool_identifier")?.toLowerCase(), loadData);
  };

  return (
    <>
      <div className="text-muted p-3">
        <div className="h6">Manage Rule Validation</div>
        {/* <div className="mb-3">Use this feature to add Rule validations on individual Informatica type.</div> */}
        {getBody()}
      </div>
    </>
  );
}

ToolServiceTypeMappingPanel.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default ToolServiceTypeMappingPanel;
