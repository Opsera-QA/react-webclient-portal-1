import React from "react";
import PropTypes from "prop-types";
import SourceRepositoryToolIdentifierSelectInput
  from "components/common/list_of_values_input/workflow/pipelines/source_repository/SourceRepositoryToolIdentifierSelectInput";

function PipelineSourceRepositoryToolIdentifierSelectInput({ fieldName, model, setModel }) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel?.setData("service", selectedOption?.value);
    newModel?.setData("accountId", "");
    newModel?.setData("username", "");
    newModel?.setData("password", "");
    newModel?.setData("repository", "");
    newModel?.setData("repositoryName", "");
    newModel?.setData("workspace", "");
    newModel?.setData("workspaceName", "");
    newModel?.setData("repoId", "");
    newModel?.setData("gitUrl", "");
    newModel?.setData("sshUrl", "");
    newModel?.setData("branch", "");
    newModel?.setData("trigger_active", false);
    newModel?.setData("secondary_branches", []);
    setModel({...newModel});
  };

  const clearDataFunction = () => {
    let newModel = {...model};
    newModel?.setData("service", "");
    newModel?.setData("accountId", "");
    newModel?.setData("username", "");
    newModel?.setData("password", "");
    newModel?.setData("repository", "");
    newModel?.setData("repositoryName", "");
    newModel?.setData("workspace", "");
    newModel?.setData("workspaceName", "");
    newModel?.setData("repoId", "");
    newModel?.setData("gitUrl", "");
    newModel?.setData("sshUrl", "");
    newModel?.setData("branch", "");
    newModel?.setData("trigger_active", false);
    newModel?.setData("gitExportEnabled", false);
    newModel?.setData("secondary_branches", []);
    setModel({...newModel});
  };

  return (
    <SourceRepositoryToolIdentifierSelectInput
      fieldName={fieldName}
      model={model}
      setModel={setModel}
      lenientClearValueButton={true}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      disabled={!model?.isChanged("service") && model?.getData("service") !== ""}
    />
  );
}

PipelineSourceRepositoryToolIdentifierSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

PipelineSourceRepositoryToolIdentifierSelectInput.defaultProps = {
  fieldName: "service",
};

export default PipelineSourceRepositoryToolIdentifierSelectInput;