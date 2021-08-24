import React from "react";
import PropTypes from "prop-types";
import GitBranchInput from "components/common/list_of_values_input/tools/git/GitBranchInput";

function PipelineSourceRepositoryPrimaryBranchSelectInput({className, fieldName, model, setModel, disabled}) {
  const clearDataFunction = () => {
    let newModel = {...model};
    newModel.setData("branch", "");
    newModel.setData("secondary_branches", []);
    setModel({...newModel});
  };

  return (
    <GitBranchInput
      repoId={model?.getData("repoId")}
      service={model?.getData("service")}
      gitToolId={model?.getData("accountId")}
      workspace={model?.getData("workspace")}
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      clearDataFunction={clearDataFunction}
      disabled={disabled}
      className={className}
    />
  );
}

PipelineSourceRepositoryPrimaryBranchSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  fieldName: PropTypes.string,
};

PipelineSourceRepositoryPrimaryBranchSelectInput.defaultProps = {
  fieldName: "branch",
};

export default PipelineSourceRepositoryPrimaryBranchSelectInput;