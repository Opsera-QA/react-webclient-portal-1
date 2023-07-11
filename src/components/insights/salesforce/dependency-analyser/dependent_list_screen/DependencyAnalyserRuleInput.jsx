import React from "react";
import PropTypes from "prop-types";
import SfdcPipelineWizardRulesInputContainerBase from "components/workflow/wizards/sfdc_pipeline_wizard/rules/SfdcPipelineWizardRulesInputContainerBase";

function DependencyAnalyserRuleInput({pipelineWizardModel, setPipelineWizardModel, sfdcFiles, isLoading, filePullCompleted}) {
  return (
    <div className={"my-4"}>
      <SfdcPipelineWizardRulesInputContainerBase
        pipelineWizardModel={pipelineWizardModel}
        setPipelineWizardModel={setPipelineWizardModel}
        fieldName={"sfdcDependencyFileRuleList"}
        fetchAttribute={"dependentComponentList"}
        modifiedFiles={sfdcFiles}
        isLoading={isLoading}
        filePullCompleted={filePullCompleted}
      />
    </div>
  );
}

DependencyAnalyserRuleInput.propTypes = {
  pipelineWizardModel: PropTypes.object,
  setPipelineWizardModel: PropTypes.func,
  sfdcFiles: PropTypes.array,
  isLoading: PropTypes.bool,
  filePullCompleted: PropTypes.bool
};

export default DependencyAnalyserRuleInput;