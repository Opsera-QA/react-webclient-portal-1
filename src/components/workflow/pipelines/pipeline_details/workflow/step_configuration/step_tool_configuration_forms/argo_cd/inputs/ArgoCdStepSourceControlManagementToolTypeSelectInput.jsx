import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const YAML_SCM_TOOL_OPTIONS = [
  {
    text: "Gitlab",
    value: "gitlab",
  },
  {
    text: "Github",
    value: "github",
  },
  {
    text: "Bitbucket",
    value: "bitbucket",
  },
  // {
  //   name: "Azure DevOps",
  //   value: toolIdentifierConstants.TOOL_IDENTIFIERS.AZURE_DEVOPS,
  // },
];

function ArgoCdStepSourceControlManagementToolTypeSelectInput({ fieldName, model, setModel, disabled }) {
  const setDataFunction = (fieldName, option) => {
    let newModel = model;
    newModel.setData("type", option?.value);
    newModel.setData("gitToolId", "");
    newModel.setData("gitRepository", "");
    newModel.setData("defaultBranch", "");
    newModel.setData("gitFilePath", "");
    newModel.setData("gitWorkspace", "");
    newModel.setData("bitbucketWorkspace", "");
    newModel.setData("bitbucketWorkspaceName", "");
    setModel({...newModel});
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={YAML_SCM_TOOL_OPTIONS}
      setDataFunction={setDataFunction}
      valueField="value"
      textField="text"
      disabled={disabled}
    />
  );
}

ArgoCdStepSourceControlManagementToolTypeSelectInput.propTypes = {
  currentPipelineId: PropTypes.string,
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool
};

ArgoCdStepSourceControlManagementToolTypeSelectInput.defaultProps = {
  fieldName: "type",
};

export default ArgoCdStepSourceControlManagementToolTypeSelectInput;