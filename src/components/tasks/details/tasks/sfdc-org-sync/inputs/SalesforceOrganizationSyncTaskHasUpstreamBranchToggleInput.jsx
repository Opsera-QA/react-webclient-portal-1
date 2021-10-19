import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

function SalesforceOrganizationSyncTaskHasUpstreamBranchToggleInput({model, setModel, disabled}) {
  const setHasUpstreamBranch = (fieldName, value) => {
    let newModel = {...model};
    newModel.setData("hasUpstreamBranch", value);
    
    if (value === false) {
        newModel.setData("upstreamBranch", "");
    }

    setModel({...newModel});
  };
  
  return (
    <BooleanToggleInput
      fieldName={"hasUpstreamBranch"}
      dataObject={model}
      setDataFunction={setHasUpstreamBranch}
      setDataObject={setModel}
      disabled={disabled}
    />
  );
}

SalesforceOrganizationSyncTaskHasUpstreamBranchToggleInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default SalesforceOrganizationSyncTaskHasUpstreamBranchToggleInput;