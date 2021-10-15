import React from "react";
import PropTypes from "prop-types";
import TextInputBase from "components/common/inputs/text/TextInputBase";

function SalesforceOrganizationSyncTaskGitBranchTextInput({model, setModel, disabled, visible}) {
  const setDataFunction = (fieldName, value) => {
    let newModel = {...model};
    newModel.setData("gitBranch", value);
    newModel.setData("defaultBranch", value);
    newModel.setData("branch", value);
    setModel({...newModel});
    return newModel;
  };

  return (
    <TextInputBase
      fieldName={"gitBranch"}
      dataObject={model}
      setDataFunction={setDataFunction}
      setDataObject={setModel}
      disabled={disabled}
      visible={visible}
    />
  );
}

SalesforceOrganizationSyncTaskGitBranchTextInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
};

export default SalesforceOrganizationSyncTaskGitBranchTextInput;
