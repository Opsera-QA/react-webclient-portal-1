import React from "react";
import PropTypes from "prop-types";
import GitBranchInput from "components/common/list_of_values_input/tools/git/GitBranchInput";

function SalesforceOrganizationSyncTaskGitBranchSelectInput({dataObject, setDataObject, disabled, visible}) {
  const setBranch = (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};
    newDataObject.setData("gitBranch", selectedOption);
    newDataObject.setData("defaultBranch", selectedOption);
    setDataObject({...newDataObject});
  };
  return (
     <GitBranchInput
       fieldName={"gitBranch"}
       service={dataObject.getData("service")}
       gitToolId={dataObject.getData("gitToolId")}
       workspace={dataObject.getData("workspace")}
       repoId={dataObject.getData("projectId")}
       dataObject={dataObject}
       setDataFunction={setBranch}
       setDataObject={setDataObject}
       disabled={disabled}
       visible={visible}
     />
  );
}

SalesforceOrganizationSyncTaskGitBranchSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
};

export default SalesforceOrganizationSyncTaskGitBranchSelectInput;
