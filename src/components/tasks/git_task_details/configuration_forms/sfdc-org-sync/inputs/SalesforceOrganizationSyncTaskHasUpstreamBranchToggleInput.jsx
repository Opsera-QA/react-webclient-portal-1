import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

function SalesforceOrganizationSyncTaskHasUpstreamBranchToggleInput({dataObject, setDataObject, disabled}) {
  const setHasUpstreamBranch = (fieldName, value) => {
    let newDataObject = {...dataObject};
    newDataObject.setData("hasUpstreamBranch", value);
    if(!value){
        newDataObject.setData("upstreamBranch", "");
    }
    setDataObject({...newDataObject});
  };
  return (
      <BooleanToggleInput
        fieldName={"hasUpstreamBranch"}
        dataObject={dataObject}
        setDataFunction={setHasUpstreamBranch}
        setDataObject={setDataObject}
        disabled={disabled}
      />
  );
}

SalesforceOrganizationSyncTaskHasUpstreamBranchToggleInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default SalesforceOrganizationSyncTaskHasUpstreamBranchToggleInput;