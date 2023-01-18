import React from "react";
import PropTypes from "prop-types";
import TagManager from "components/common/inputs/tags/TagManager";

export default function StepConfigurationEnvironmentTagInput(
  { 
    model,
    setModel, 
  }) {
  return (
    <TagManager
      setDataObject={setModel}
      dataObject={model}
      allowedTypes={["environment"]}
      allowCreate={false}
      disabled={model?.getData("active") !== true}
    />
  );
}

StepConfigurationEnvironmentTagInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
};
