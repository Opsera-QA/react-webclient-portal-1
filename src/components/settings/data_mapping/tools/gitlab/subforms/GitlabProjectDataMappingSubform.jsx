import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import GitlabMonoRepoPathSelectInput from "../inputs/GitlabMonoRepoPathSelectInput";

function GitlabProjectDataMappingSubform({ model, setModel }) {

  const setDataFunction = (fieldName, value) => {
    let newModel = {...model};
    newModel.setData(fieldName, value);
    setModel({...newModel});
  };

  return (
    <>
      <BooleanToggleInput
        fieldName={"isMonoRepo"}
        dataObject={model}
        setDataObject={setModel}
        setDataFunction={setDataFunction}
      />
      <GitlabMonoRepoPathSelectInput 
        fieldName={"monoRepoPath"}
        model={model}
        setModel={setModel}
        repoId={model.getData("repoId")}
        disabled={!model.getData("isMonoRepo")}
      />
    </>
  );
}

GitlabProjectDataMappingSubform.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
};

export default GitlabProjectDataMappingSubform;
