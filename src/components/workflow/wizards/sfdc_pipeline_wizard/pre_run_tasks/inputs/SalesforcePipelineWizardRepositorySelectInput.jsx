import React from "react";
import PropTypes from "prop-types";
import { salesforcePipelineHelper } from "components/workflow/wizards/sfdc_pipeline_wizard/salesforcePipeline.helper";
import RepositorySelectInput from "components/common/list_of_values_input/tools/repositories/RepositorySelectInput";

export default function SalesforcePipelineWizardRepositorySelectInput(
  {
    fieldName,
    model,
    setModel,
    pipeline,
    setPipeline,
    disabled,
  }) {
  const setDataFunction = (fieldName, selectedOption) => {
    const updatedPipeline = salesforcePipelineHelper.updateRepositoryForSalesforcePipelineSteps(pipeline, selectedOption);
    setPipeline({...updatedPipeline});
    const repoId = selectedOption?._id || selectedOption?.id || selectedOption?.repositoryId || "";
    const gitUrl = selectedOption?.httpUrl || selectedOption?.remoteUrl || "";
    const sshUrl = selectedOption?.sshUrl || selectedOption?.configuration?.sshUrl || "";
    model.setData("repository", selectedOption?.name);
    model.setData("repoId", repoId);
    model.setData("projectId", repoId);
    model.setData("gitUrl", gitUrl);
    model.setData("sshUrl", sshUrl);
    model.setData("branch", "");
    model.setData("defaultBranch", "");
    model.setData("gitBranch", "");
    setModel({ ...model });
  };

  return (
    <RepositorySelectInput
      fieldName={fieldName}
      service={model?.getData("service")}
      gitToolId={model?.getData("gitToolId")}
      workspace={model?.getData("workspace")}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      disabled={disabled}
    />
  );
}

SalesforcePipelineWizardRepositorySelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  pipeline: PropTypes.object,
  setPipeline: PropTypes.func,
  disabled: PropTypes.bool,
};

SalesforcePipelineWizardRepositorySelectInput.defaultProps = {
  fieldName: "repoId",
};
