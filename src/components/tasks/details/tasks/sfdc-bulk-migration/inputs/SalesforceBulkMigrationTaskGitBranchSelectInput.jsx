import React from "react";
import PropTypes from "prop-types";
import GitBranchInput from "components/common/list_of_values_input/tools/git/GitBranchInput";

function SalesforceBulkMigrationTaskGitBranchSelectInput({model, setModel, disabled, visible}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData("gitBranch", selectedOption);
    newModel.setData("defaultBranch", selectedOption);
    setModel({...newModel});
  };
  
  const clearDataFunction = () => {
    let newModel = {...model};
    newModel.setDefaultValue("gitBranch");
    newModel.setDefaultValue("defaultBranch");
    setModel({...newModel});
  };

  return (
    <GitBranchInput
      fieldName={"gitBranch"}
      service={model?.getData("service")}
      gitToolId={model?.getData("gitToolId")}
      workspace={model?.getData("workspace")}
      repoId={model?.getData("projectId")}
      dataObject={model}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      setDataObject={setModel}
      disabled={disabled}
      visible={visible}
    />
  );
}

SalesforceBulkMigrationTaskGitBranchSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
};

export default SalesforceBulkMigrationTaskGitBranchSelectInput;
