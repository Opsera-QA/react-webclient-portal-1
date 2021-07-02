import React from "react";
import PropTypes from "prop-types";
import SfdcPipelineWizardRulesInputContainerBase
  from "components/workflow/wizards/sfdc_pipeline_wizard/rules/SfdcPipelineWizardRulesInputContainerBase";

function SfdcPipelineWizardProfileComponentRulesInput({pipelineWizardModel, setPipelineWizardModel, profileComponentList, isLoading, filePullCompleted}) {

  // TODO: Add pull data instead
  const getPostBody = () => {
    return (
      {
        pipelineId: pipelineWizardModel?.getData("pipelineId"),
        stepId: pipelineWizardModel?.getData("stepId"),
        dataType: "sfdc-packageXml",
        fetchAttribute: "profileComponentList",
      }
    );
  };

  return (
    <div className={"my-4"}>
      <SfdcPipelineWizardRulesInputContainerBase
        dataObject={pipelineWizardModel}
        setDataObject={setPipelineWizardModel}
        fieldName={"profileComponentsRuleList"}
        postBody={getPostBody()}
        modifiedFiles={profileComponentList}
        isLoading={isLoading}
        filePullCompleted={filePullCompleted}
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