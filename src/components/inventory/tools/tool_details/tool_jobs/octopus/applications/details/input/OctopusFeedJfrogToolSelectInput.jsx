import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedJFrogArtifactoryMavenToolSelectInput
  from "components/common/list_of_values_input/tools/jfrog/RoleRestrictedJFrogArtifactoryMavenToolSelectInput";

const OctopusFeedJfrogToolSelectInput = ({ model, setModel, fieldName, disabled }) => {
  return (
     <RoleRestrictedJFrogArtifactoryMavenToolSelectInput
       fieldName={fieldName}
       model={model}
       setModel={setModel}
       disabled={disabled}
     />
  );
};

OctopusFeedJfrogToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  fieldName: PropTypes.string,
  disabled: PropTypes.bool,
};

export default OctopusFeedJfrogToolSelectInput;
