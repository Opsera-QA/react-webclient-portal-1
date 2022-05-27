import React from "react";
import PropTypes from "prop-types";
import RepositorySelectInput from "components/common/list_of_values_input/tools/repositories/RepositorySelectInput";

function SnaplogicScmRepositorySelectInput({model, setModel, disabled}) {

  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    const repoId = selectedOption?.id || selectedOption?.repositoryId || "";
    newModel.setData("gitRepository", selectedOption?.name);
    newModel.setData("repoId", repoId);
    newModel.setData("gitBranch", "");
    newModel.setData("targetBranch", "");
    setModel({...newModel});
  };

  const clearDataFunction = (fieldName) => {
    let newModel = {...model};
    newModel.setData("gitRepository", "");
    newModel.setData("repoId", "");
    newModel.setData("gitBranch", "");
    newModel.setData("targetBranch", "");
    setModel({...newModel});
  };

  return (
     <RepositorySelectInput
       fieldName={"gitRepository"}
       service={model?.getData("service")}
       gitToolId={model?.getData("gitToolId")}
       dataObject={model}
       setDataObject={setModel}
       setDataFunction={setDataFunction}
       clearDataFunction={clearDataFunction}
       disabled={disabled}
     />
  );
}

SnaplogicScmRepositorySelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default SnaplogicScmRepositorySelectInput;
