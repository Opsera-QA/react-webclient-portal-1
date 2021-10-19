import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

function SalesforceOrganizationSyncTaskNewBranchToggleInput({model, setModel, disabled}) {
  const setDataFunction = (fieldName, value) => {
    let newModel = {...model};
    newModel.setData("isNewBranch", value);
    newModel.setDefaultValue("upstreamBranch");
    newModel.setDefaultValue("gitBranch");
    newModel.setDefaultValue("defaultBranch");
    newModel.setDefaultValue("branch");
    setModel({...newModel});
  };

  return (
    <BooleanToggleInput
      fieldName={"isNewBranch"}
      dataObject={model}
      setDataFunction={setDataFunction}
      clea={setDataFunction}
      setDataObject={setModel}
      disabled={disabled}
    />
  );
}

SalesforceOrganizationSyncTaskNewBranchToggleInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default SalesforceOrganizationSyncTaskNewBranchToggleInput;