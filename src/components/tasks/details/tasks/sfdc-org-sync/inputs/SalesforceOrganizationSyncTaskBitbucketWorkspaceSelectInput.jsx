import React from "react";
import PropTypes from "prop-types";
import BitbucketWorkspaceInput from "components/common/list_of_values_input/tools/bitbucket/workspaces/BitbucketWorkspaceInput";

function SalesforceOrganizationSyncTaskBitbucketWorkspaceSelectInput({model, setModel, disabled}) {
  const setWorkspace = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData("workspace", selectedOption?.key);
    newModel.setData("workspaceName", selectedOption?.name);
    setModel({...newModel});
  };

  const clearData = () => {
    let newModel = {...model};
    newModel.setDefaultValue("workspace");
    newModel.setData("workspaceName");
    setModel({...newModel});
  };

  if (model?.getData("service") !== "bitbucket") {
    return <></>;
  }

  return (
    <BitbucketWorkspaceInput
      fieldName={"workspace"}
      gitToolId={model?.getData("gitToolId")}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setWorkspace}
      disabled={disabled}
      clearDataFunction={clearData}
    />
  );
}

SalesforceOrganizationSyncTaskBitbucketWorkspaceSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default SalesforceOrganizationSyncTaskBitbucketWorkspaceSelectInput;
