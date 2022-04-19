import React from "react";
import PropTypes from "prop-types";
import BitbucketWorkspaceInput from "components/common/list_of_values_input/tools/bitbucket/workspaces/BitbucketWorkspaceInput";

function GitScraperBitbucketWorkspaceSelectInput({model, setModel, disabled}) {
  console.log(model?.getData("filesException"));
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData("workspace", selectedOption?.key);
    newModel.setData("bitbucketWorkspaceName", selectedOption?.name);
    setModel({...newModel});
  };

  if (model?.getData("service") !== "bitbucket") {
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

GitScraperBitbucketWorkspaceSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default GitScraperBitbucketWorkspaceSelectInput;