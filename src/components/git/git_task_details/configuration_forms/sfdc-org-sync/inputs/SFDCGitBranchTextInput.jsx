import React from "react";
import PropTypes from "prop-types";
import TextInputBase from "components/common/inputs/text/TextInputBase";

function SFDCGitBranchTextInput({dataObject, setDataObject, disabled, visible}) {
  const setBranch = (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};
    newDataObject.setData("gitBranch", selectedOption);
    newDataObject.setData("defaultBranch", selectedOption);
    newDataObject.setData("branch", selectedOption);
    setDataObject({...newDataObject});
    return newDataObject;
  };

  return (
    <TextInputBase 
       fieldName={"gitBranch"}
       dataObject={dataObject}
       setDataFunction={setBranch}
       setDataObject={setDataObject}
       disabled={disabled}
       visible={visible}
    />
  );
}

SFDCGitBranchTextInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
};

SFDCGitBranchTextInput.defaultProps = {
  visible: true,
};


export default SFDCGitBranchTextInput;
