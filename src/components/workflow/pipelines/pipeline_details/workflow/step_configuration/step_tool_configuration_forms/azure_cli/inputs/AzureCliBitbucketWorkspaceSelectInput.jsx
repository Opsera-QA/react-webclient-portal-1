import React from "react";
import PropTypes from "prop-types";
import BitbucketWorkspaceInput from "components/common/list_of_values_input/tools/bitbucket/workspaces/BitbucketWorkspaceInput";

function AzureCliBitbucketWorkspaceSelectInput({model, setModel, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData("bitbucketWorkspace", selectedOption?.key);
    newModel.setData("bitbucketWorkspaceName", selectedOption?.name);
    newModel.setData("gitRepository", "");
    newModel.setData("gitRepositoryID", "");
    newModel.setData("defaultBranch", "");
    setModel({...newModel});
  };

  if (model?.getData("type") !== "bitbucket") {
    return <></>;
  }

  return (
     <BitbucketWorkspaceInput
       fieldName={"bitbucketWorkspaceName"}
       gitToolId={model?.getData("gitToolId")}
       dataObject={model}
       setDataObject={setModel}
       setDataFunction={setDataFunction}
       disabled={disabled}
     />
  );
}

AzureCliBitbucketWorkspaceSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default AzureCliBitbucketWorkspaceSelectInput;
