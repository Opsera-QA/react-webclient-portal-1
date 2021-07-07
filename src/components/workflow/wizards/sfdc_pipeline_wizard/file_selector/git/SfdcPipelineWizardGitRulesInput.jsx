import React from "react";
import PropTypes from "prop-types";
import SfdcPipelineWizardRulesInputContainerBase
  from "components/workflow/wizards/sfdc_pipeline_wizard/rules/SfdcPipelineWizardRulesInputContainerBase";

function SfdcPipelineWizardGitRulesInput({pipelineWizardModel, setPipelineWizardModel, gitFiles, isLoading, filePullCompleted}) {
  return (
    <div className={"my-4"}>
      <SfdcPipelineWizardRulesInputContainerBase
        pipelineWizardModel={pipelineWizardModel}
        setPipelineWizardModel={setPipelineWizardModel}
        fieldName={"gitModifiedRuleList"}
        fetchAttribute={"gitCommitList"}
        modifiedFiles={gitFiles}
        isGitTab={true}
        isLoading={isLoading}
        filePullCompleted={filePullCompleted}
      />
    </div>
  );
}

SfdcPipelineWizardGitRulesInput.propTypes = {
  pipelineWizardModel: PropTypes.object,
  setPipelineWizardModel: PropTypes.func,
  gitFiles: PropTypes.array,
  isLoading: PropTypes.bool,
  filePullCompleted: PropTypes.bool
};

export default SfdcPipelineWizardGitRulesInput;