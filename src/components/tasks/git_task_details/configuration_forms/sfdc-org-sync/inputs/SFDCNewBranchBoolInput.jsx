import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

function SFDCNewBranchBoolInput({dataObject, setDataObject, disabled}) {
  const setNewBranch = (fieldName, value) => {
    let newDataObject = {...dataObject};
    newDataObject.setData("isNewBranch", value);
    newDataObject.setData("upstreamBranch", "");
    newDataObject.setData("gitBranch", "");
    newDataObject.setData("defaultBranch", "");
    newDataObject.setData("branch", "");
    setDataObject({...newDataObject});
  };
  return (
      <BooleanToggleInput
        fieldName={"isNewBranch"}
        dataObject={dataObject}
        setDataFunction={setNewBranch}
        setDataObject={setDataObject}
        disabled={disabled}
      />
  );
}

SFDCNewBranchBoolInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default SFDCNewBranchBoolInput;