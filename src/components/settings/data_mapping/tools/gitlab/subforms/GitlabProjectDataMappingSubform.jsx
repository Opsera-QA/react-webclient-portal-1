import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import GitlabMonoRepoPathSelectInput from "../inputs/GitlabMonoRepoPathSelectInput";

function GitlabProjectDataMappingSubform({ model, setModel, repoId }) {

  return (
    <>
      <BooleanToggleInput
        fieldName={"isMonoRepo"}
        dataObject={model}
        setDataObject={setModel}
      />
      <GitlabMonoRepoPathSelectInput 
        fieldName={"monoRepoPath"}
        model={model}
        setModel={setModel}
        repoId={repoId}
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
