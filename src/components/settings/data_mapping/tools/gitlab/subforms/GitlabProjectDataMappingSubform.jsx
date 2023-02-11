import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import GitlabMonoRepoPathMultiSelectInput from "../inputs/GitlabMonoRepoPathMultiSelectInput";
import GitlabDeploymentStagesMultiSelectInput from "../inputs/GitlabDeploymentStagesMultiSelectInput";

function GitlabProjectDataMappingSubform({ model, setModel }) {
  return (
    <>
      <BooleanToggleInput
        fieldName={"isMonoRepo"}
        dataObject={model}
        setDataObject={setModel}
      />
      <GitlabMonoRepoPathMultiSelectInput 
        fieldName={"monoRepoPath"}
        model={model}
        setModel={setModel}
        repoId={model?.getData("repoId")}
      />
      <GitlabDeploymentStagesMultiSelectInput 
        fieldName={"deploymentStage"}
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
