import React from "react";
import PropTypes from "prop-types";
import SourceRepositoryToolIdentifierSelectInput
  from "components/common/list_of_values_input/workflow/pipelines/source_repository/SourceRepositoryToolIdentifierSelectInput";

function SourceRepositoryTypeSelectInput({ fieldName, model, setModel, disabled }) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel?.setData("service", selectedOption?.value);
    newModel?.setData("gitToolId", "");
    newModel?.setData("workspace", "");    
    newModel?.setData("repository", "");
    newModel?.setData("repoId", "");
    newModel?.setData("gitUrl", "");
    newModel?.setData("sshUrl", "");
    newModel?.setData("gitbranch", "");
    setModel({...newModel});
  };

  const clearDataFunction = () => {
    let newModel = {...model};
    newModel?.setData("service", "");
    newModel?.setData("gitToolId", "");
    newModel?.setData("workspace", "");    
    newModel?.setData("repository", "");
    newModel?.setData("repoId", "");
    newModel?.setData("gitUrl", "");
    newModel?.setData("sshUrl", "");
    newModel?.setData("gitbranch", "");
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
      disabled={disabled}
    />
  );
}

SourceRepositoryTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

SourceRepositoryTypeSelectInput.defaultProps = {
  fieldName: "service",
  disabled: false
};

export default SourceRepositoryTypeSelectInput;