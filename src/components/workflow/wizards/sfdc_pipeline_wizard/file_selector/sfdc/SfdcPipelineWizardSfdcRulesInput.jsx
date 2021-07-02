import React from "react";
import PropTypes from "prop-types";
import SfdcPipelineWizardRulesInputContainerBase
  from "components/workflow/wizards/sfdc_pipeline_wizard/rules/SfdcPipelineWizardRulesInputContainerBase";

function SfdcPipelineWizardSfdcRulesInput({pipelineWizardModel, setPipelineWizardModel, sfdcFiles, isLoading, filePullCompleted}) {

  // TODO: Add pull data instead
  const getPostBody = () => {
    return (
      {
        pipelineId: pipelineWizardModel.getData("pipelineId"),
        stepId: pipelineWizardModel.getData("stepId"),
        dataType: pipelineWizardModel.getData("fromGitTasks") === true ? "sync-sfdc-repo" : "sfdc-packageXml",
        gitTaskId: pipelineWizardModel.getData("fromGitTasks") === true ? pipelineWizardModel.getData("gitTaskId") : false,
        fetchAttribute: "sfdcCommitList",
      }
    );
  };

  return (
    <div className={"my-4"}>
      <SfdcPipelineWizardRulesInputContainerBase
        dataObject={pipelineWizardModel}
        setDataObject={setPipelineWizardModel}
        fieldName={"sfdcModifiedRuleList"}
        postBody={getPostBody()}
        modifiedFiles={sfdcFiles}
        isLoading={isLoading}
        filePullCompleted={filePullCompleted}
      />
    </div>
  );
}

SfdcPipelineWizardSfdcRulesInput.propTypes = {
  pipelineWizardModel: PropTypes.object,
  setPipelineWizardModel: PropTypes.func,
  sfdcFiles: PropTypes.array,
  isLoading: PropTypes.bool,
  filePullCompleted: PropTypes.bool
};

export default SfdcPipelineWizardSfdcRulesInput;