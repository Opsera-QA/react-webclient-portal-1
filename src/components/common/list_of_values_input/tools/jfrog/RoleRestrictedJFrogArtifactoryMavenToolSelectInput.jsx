import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedToolByIdentifierInputBase
  from "components/common/list_of_values_input/tools/RoleRestrictedToolByIdentifierInputBase";

function RoleRestrictedJFrogArtifactoryMavenToolSelectInput(
  {
    model,
    setModel,
    setDataFunction,
    clearDataFunction,
    fieldName,
    disabled,
    visible,
  }) {
  return (
    <RoleRestrictedToolByIdentifierInputBase
      toolIdentifier={"jfrog_artifactory_maven"}
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

RoleRestrictedJFrogArtifactoryMavenToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  fieldName: PropTypes.string,
  clearDataFunction: PropTypes.func,
  setDataFunction: PropTypes.func,
  visible: PropTypes.bool,
};

export default RoleRestrictedJFrogArtifactoryMavenToolSelectInput;