import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedJFrogArtifactoryDockerToolSelectInput
  from "components/common/list_of_values_input/tools/jfrog/RoleRestrictedJFrogArtifactoryDockerToolSelectInput";

function JfrogStepJfrogToolSelectInput({model, setModel, disabled}) {
  return (
     <RoleRestrictedJFrogArtifactoryDockerToolSelectInput
       fieldName={"jfrogToolConfigId"}
       model={model}
       setModel={setModel}
       disabled={disabled}
     />
  );
}

JfrogStepJfrogToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default JfrogStepJfrogToolSelectInput;