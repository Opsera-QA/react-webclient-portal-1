import React from "react";
import PropTypes from "prop-types";
import BitbucketWorkspaceInput from "components/common/list_of_values_input/tools/bitbucket/workspaces/BitbucketWorkspaceInput";

function LiquibaseBitbucketWorkspaceInput({model, setModel, disabled}) {
  const setWorkspace = (fieldName, selectedOption) => {
    let newModel = {...model};    
    newModel.setData("workspace", selectedOption.key);
    newModel.setData("workspaceName", selectedOption.name);
    newModel.setDefaultValue("gitRepository");
    newModel.setDefaultValue("repoId");
    newModel.setDefaultValue("gitBranch");
    newModel.setDefaultValue("sshUrl");
    newModel.setDefaultValue("gitUrl");
    setModel({...newModel});
  };

  const clearWorkspace = (fieldName) => {
    let newModel = {...model};
    newModel.setDefaultValue("workspace");
    newModel.setDefaultValue("workspaceName");
    newModel.setDefaultValue("gitRepository");
    newModel.setDefaultValue("repoId");
    newModel.setDefaultValue("gitBranch");
    newModel.setDefaultValue("sshUrl");
    newModel.setDefaultValue("gitUrl");
    setModel({...newModel});
  };

  if (model.getData("service") !== "bitbucket") {
    return <></>;
  }

  return (
     <BitbucketWorkspaceInput
       fieldName={"workspaceName"}
       gitToolId={model.getData("gitToolId")}
       dataObject={model}
       setDataObject={setModel}
       setDataFunction={setWorkspace}
       clearDataFunction={clearWorkspace}
       disabled={disabled}
     />
  );
}

LiquibaseBitbucketWorkspaceInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default LiquibaseBitbucketWorkspaceInput;
