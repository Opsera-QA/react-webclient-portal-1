import React from "react";
import PropTypes from "prop-types";

import ToolNameFieldDisplayer from "components/common/fields/inventory/name/ToolNameFieldDisplayer";

const SfdcPipelineWizardUploadComponentSummary = ({pipelineWizardModel}) => (
  <div className="my-3 p-3 message-field info-message-field mx-1">
    <span>
      This is {pipelineWizardModel.getData('isOrgToOrg') === true 
      ? 'Org to Org' : 'Git'} 
      {` based pipeline & `} 
      { pipelineWizardModel.getData('isOrgToOrg') === true 
      ?
        <>
          <ToolNameFieldDisplayer 
            toolId={pipelineWizardModel?.getData("sfdcToolId")}
            loadToolInNewWindow={true} 
          />
          <span> Salesforce Org </span>
        </>
      : `${pipelineWizardModel.getData('repository')} repository & ${pipelineWizardModel.getData('gitBranch')} branch`} will be used for fetching & validating components
    </span>
  </div>
);

SfdcPipelineWizardUploadComponentSummary.propTypes = {
  pipelineWizardModel: PropTypes.object,
};

export default SfdcPipelineWizardUploadComponentSummary;
