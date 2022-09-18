import React from "react";
import PropTypes from "prop-types";
import BitbucketWorkspaceInput from "components/common/list_of_values_input/tools/bitbucket/workspaces/BitbucketWorkspaceInput";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import { salesforcePipelineHelper } from "components/workflow/wizards/sfdc_pipeline_wizard/salesforcePipeline.helper";
import { hasStringValue } from "components/common/helpers/string-helpers";
import GitBranchInput from "components/common/list_of_values_input/tools/git/GitBranchInput";

export default function SalesforcePipelineWizardBranchSelectInput(
  {
    fieldName,
    model,
    setModel,
    pipeline,
    setPipeline,
    disabled,
  }) {
  const setDataFunction = (fieldName, selectedOption) => {
    const updatedPipeline = salesforcePipelineHelper.updateBranchForSalesforcePipelineSteps(pipeline, selectedOption);
    setPipeline({...updatedPipeline});
    model.setData("branch", selectedOption);
    model.setData("defaultBranch", selectedOption);
    model.setData("gitBranch", selectedOption);
    setModel({ ...model });
  };

  if (model.getData("isOrgToOrg") !== false) {
    return null;
  }

  return (
    <GitBranchInput
      fieldName={fieldName}
      service={model?.getData("service")}
      gitToolId={model?.getData("gitToolId")}
      workspace={model?.getData("workspace")}
      repoId={model?.getData("repoId")}
      dataObject={model}
      setDataFunction={setDataFunction}
      setDataObject={setModel}
      disabled={disabled}
    />
  );
}

SalesforcePipelineWizardBranchSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  pipeline: PropTypes.object,
  setPipeline: PropTypes.func,
  disabled: PropTypes.bool,
};

SalesforcePipelineWizardBranchSelectInput.defaultProps = {
  fieldName: "gitBranch",
};
