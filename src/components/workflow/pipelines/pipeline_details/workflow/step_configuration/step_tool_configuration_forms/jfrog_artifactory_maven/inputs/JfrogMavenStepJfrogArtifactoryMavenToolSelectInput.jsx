import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedJFrogArtifactoryMavenToolSelectInput
  from "components/common/list_of_values_input/tools/jfrog/RoleRestrictedJFrogArtifactoryMavenToolSelectInput";

function JfrogMavenStepJfrogArtifactoryMavenToolSelectInput({model, setModel, disabled}) {
  return (
     <RoleRestrictedJFrogArtifactoryMavenToolSelectInput
       fieldName={"jfrogToolConfigId"}
       model={model}
       setModel={setModel}
       disabled={disabled}
     />
  );
}

JfrogMavenStepJfrogArtifactoryMavenToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default JfrogMavenStepJfrogArtifactoryMavenToolSelectInput;
