import React from "react";
import PropTypes from "prop-types";
import SfdcPipelineWizardRulesInputContainerBase
  from "components/workflow/wizards/sfdc_pipeline_wizard/rules/SfdcPipelineWizardRulesInputContainerBase";

function SfdcPipelineWizardProfileComponentRulesInput({pipelineWizardModel, setPipelineWizardModel, profileComponentList, isLoading, filePullCompleted}) {
  return (
    <div className={"my-4"}>
      <SfdcPipelineWizardRulesInputContainerBase
        pipelineWizardModel={pipelineWizardModel}
        setPipelineWizardModel={setPipelineWizardModel}
        fieldName={"profileComponentsRuleList"}
        modifiedFiles={profileComponentList}
        isLoading={isLoading}
        filePullCompleted={filePullCompleted}
        fetchAttribute={"profileComponentList"}
      />
    </div>
  );
}

SfdcPipelineWizardProfileComponentRulesInput.propTypes = {
  pipelineWizardModel: PropTypes.object,
  setPipelineWizardModel: PropTypes.func,
  profileComponentList: PropTypes.array,
  isLoading: PropTypes.bool,
  filePullCompleted: PropTypes.bool
};

export default SfdcPipelineWizardProfileComponentRulesInput;