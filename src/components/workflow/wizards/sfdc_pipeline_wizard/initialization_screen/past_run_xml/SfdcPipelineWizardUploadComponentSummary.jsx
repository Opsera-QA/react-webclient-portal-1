import React from "react";
import PropTypes from "prop-types";

import ToolNameFieldDisplayer from "components/common/fields/inventory/name/ToolNameFieldDisplayer";

const SfdcPipelineWizardUploadComponentSummary = ({pipelineWizardModel}) => (
  <div className="my-3 p-3 message-field info-message-field mx-1">
    <span>
    Components will be Retrieved from 
      {pipelineWizardModel.getData('isOrgToOrg') === true 
      ?
        <>
          <span>{` Salesforce Org : `}</span>
          <ToolNameFieldDisplayer 
            toolId={pipelineWizardModel?.getData("sfdcToolId")}
            loadToolInNewWindow={true} 
          />
        </>
      : ` ${pipelineWizardModel.getData('repository')} Git repository and ${pipelineWizardModel.getData('gitBranch')} branch`}
    </span>
  </div>
);

SfdcPipelineWizardUploadComponentSummary.propTypes = {
  pipelineWizardModel: PropTypes.object,
};

export default SfdcPipelineWizardUploadComponentSummary;
