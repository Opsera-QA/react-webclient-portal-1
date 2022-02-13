import React from "react";
import PropTypes from "prop-types";
import RepositorySelectInput from "components/common/list_of_values_input/tools/repositories/RepositorySelectInput";

function PipelineSourceRepositorySelectInput({className, fieldName, model, setModel, disabled, service, accountId, workspace, visible}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData("repository", selectedOption?.name);
    newModel.setData("repoId", selectedOption?.id);
    newModel.setData("gitUrl", selectedOption?.httpUrl);
    newModel.setData("sshUrl", selectedOption?.sshUrl);
    newModel.setData("branch", "");
    newModel.setData("secondary_branches", []);
    setModel({...newModel});
  };

  if (visible === false) {
    return null;
  }

  return (
    <RepositorySelectInput
      service={service}
      gitToolId={accountId}
      workspace={workspace}
      fieldName={fieldName}
      placeholderText={"Select Repository"}
      configurationRequired={true}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      disabled={disabled}
      className={className}
    />
  );
}

PipelineSourceRepositorySelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  fieldName: PropTypes.string,
  accountId: PropTypes.string,
  service: PropTypes.string,
  workspace: PropTypes.string,
  visible: PropTypes.bool,
};

PipelineSourceRepositorySelectInput.defaultProps = {
  fieldName: "repository",
};

export default PipelineSourceRepositorySelectInput;