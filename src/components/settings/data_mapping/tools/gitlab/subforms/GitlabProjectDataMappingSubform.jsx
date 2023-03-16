import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import GitlabMonoRepoPathMultiSelectInput from "../inputs/GitlabMonoRepoPathMultiSelectInput";
import GitlabPipelineStagesMultiSelectInput from "../inputs/GitlabPipelineStagesMultiSelectInput";

function GitlabProjectDataMappingSubform({ model, setModel }) {

  const setDataFunction = (fieldName, newValue) => {
    const newModel = {...model};
    newModel?.setData(fieldName, newValue);
    newModel?.setDefaultValue("monoRepoPath");
    newModel?.setDefaultValue("deploymentStage");
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
      <GitlabMonoRepoPathMultiSelectInput 
        fieldName={"monoRepoPath"}
        model={model}
        setModel={setModel}
        repoId={model?.getData("repoId")}
      />
      <GitlabPipelineStagesMultiSelectInput 
        fieldName={"pipelineStages"}
        model={model}
        setModel={setModel}
        repoId={model?.getData("repoId")}
      />
    </>
  );
}

GitlabProjectDataMappingSubform.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  repoId: PropTypes.string
};

export default GitlabProjectDataMappingSubform;
