import React from "react";
import PropTypes from "prop-types";
import StepConfigurationEnvironmentTagInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/StepConfigurationEnvironmentTagInput";
import TagManager from "components/common/inputs/tags/TagManager";

function StepConfigurationTagsInput({ fieldName, stepConfigurationModel, setStepConfigurationModel }) {
  const getDisabledTags = (tagOptions) => {
    const currentTags = stepConfigurationModel?.getArrayData(fieldName);
    const environmentTag = currentTags.find((tag) => tag.type === "environment");

    if (environmentTag != null) {
      const disabledTags = [];

      tagOptions.forEach((tag) => {
        if (tag.type === "environment" && tag.value !== environmentTag.value) {
          disabledTags.push(tag);
        }
      });

      return disabledTags;
    }
  };

  if (stepConfigurationModel.getData("type") === "deploy") {
    return (
      <StepConfigurationEnvironmentTagInput
        setDataObject={setStepConfigurationModel}
        dataObject={stepConfigurationModel}
      />
    );
  }

  return (
    <TagManager
      setDataObject={setStepConfigurationModel}
      dataObject={stepConfigurationModel}
      getDisabledTags={getDisabledTags}
      type={"pipeline"}
      disabled={stepConfigurationModel.getData("active") !== true || stepConfigurationModel.getData("type") === null}
    />
  );
}

StepConfigurationTagsInput.propTypes = {
  setStepConfigurationModel: PropTypes.func,
  fieldName: PropTypes.string,
  stepConfigurationModel: PropTypes.object,
};

StepConfigurationTagsInput.defaultProps = {
  fieldName: "tags"
};

export default StepConfigurationTagsInput;