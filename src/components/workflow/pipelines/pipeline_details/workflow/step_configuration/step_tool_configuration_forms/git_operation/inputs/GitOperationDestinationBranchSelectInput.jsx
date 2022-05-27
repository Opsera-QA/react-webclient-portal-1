import React from 'react';
import PropTypes from 'prop-types';
import GitBranchInput from "components/common/list_of_values_input/tools/git/GitBranchInput";

function GitOperationDestinationBranchSelectInput({model, setModel, disabled, sourceBranch}) {
  const setDestinationBranch = (fieldName, selectedOption) => {
    let newDataObject = {...model};
    newDataObject.setData("targetBranch", selectedOption);
    setModel({...newDataObject});
  };

  const getDisabledOptions = () => {
    if (disabled === true) {
      return true;
    }

    if (sourceBranch != null && sourceBranch !== "") {
      return [sourceBranch];
    }
  };

  return (
    <GitBranchInput
      fieldName={"targetBranch"}
      service={model.getData("service")}
      gitToolId={model.getData("gitToolId")}
      workspace={model.getData("workspace")}
      repoId={model.getData("repoId")}
      dataObject={model}
      setDataFunction={setDestinationBranch}
      setDataObject={setModel}
      disabled={getDisabledOptions()}
    />
  );
}

GitOperationDestinationBranchSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  sourceBranch: PropTypes.string,
};

export default GitOperationDestinationBranchSelectInput;