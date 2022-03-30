import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedToolByIdentifierInputBase
  from "components/common/list_of_values_input/tools/RoleRestrictedToolByIdentifierInputBase";

function BuildkiteToolSelectInput({model, setModel, className, disabled}) {
  return (
    <RoleRestrictedToolByIdentifierInputBase
      fieldName={"toolConfigId"}
      toolIdentifier={"buildkite"}
      className={className}
      model={model}
      setModel={setModel}
      disabled={disabled}
      configurationRequired={true}
    />
  );
}

BuildkiteToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

export default BuildkiteToolSelectInput;