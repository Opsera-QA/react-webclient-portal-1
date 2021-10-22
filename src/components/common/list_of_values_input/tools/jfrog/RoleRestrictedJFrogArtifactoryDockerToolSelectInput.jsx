import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedToolByIdentifierInputBase
  from "components/common/list_of_values_input/tools/RoleRestrictedToolByIdentifierInputBase";

function RoleRestrictedJFrogArtifactoryDockerToolSelectInput({model, setModel, setDataFunction, clearDataFunction, fieldName, disabled, visible,}) {
  return (
    <RoleRestrictedToolByIdentifierInputBase
      toolIdentifier={"jfrog_artifactory_docker"}
      toolFriendlyName={"JFrog"}
      fieldName={fieldName}
      configurationRequired={true}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      disabled={disabled}
      visible={visible}
    />
  );
}

RoleRestrictedJFrogArtifactoryDockerToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  fieldName: PropTypes.string,
  clearDataFunction: PropTypes.func,
  setDataFunction: PropTypes.func,
  visible: PropTypes.bool,
};

export default RoleRestrictedJFrogArtifactoryDockerToolSelectInput;