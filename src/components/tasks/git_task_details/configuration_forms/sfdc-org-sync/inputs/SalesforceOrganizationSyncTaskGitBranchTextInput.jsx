import React from "react";
import PropTypes from "prop-types";
import TextInputBase from "components/common/inputs/text/TextInputBase";

function SalesforceOrganizationSyncTaskGitBranchTextInput({dataObject, setDataObject, disabled, visible}) {
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

SalesforceOrganizationSyncTaskGitBranchTextInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
};

SalesforceOrganizationSyncTaskGitBranchTextInput.defaultProps = {
  visible: true,
};


export default SalesforceOrganizationSyncTaskGitBranchTextInput;
