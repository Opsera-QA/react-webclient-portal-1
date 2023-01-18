import React from "react";
import PropTypes from "prop-types";
import StepConfigurationEnvironmentTagInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/StepConfigurationEnvironmentTagInput";
import TagManager from "components/common/inputs/tags/TagManager";
import {hasStringValue} from "components/common/helpers/string-helpers";

export default function StepConfigurationTagsInput(
  {
    stepConfigurationModel,
    setStepConfigurationModel,
  }) {
  const getDisabledTags = (tagOptions) => {
    const currentTags = stepConfigurationModel?.getArrayData("tags");
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
        setModel={setStepConfigurationModel}
        model={stepConfigurationModel}
      />
    );
  }

  return (
    <TagManager
      setDataObject={setStepConfigurationModel}
      dataObject={stepConfigurationModel}
      getDisabledTags={getDisabledTags}
      type={"pipeline"}
      disabled={stepConfigurationModel.getData("active") !== true || hasStringValue(stepConfigurationModel.getData("type")) !== true}
    />
  );
}

StepConfigurationTagsInput.propTypes = {
  setStepConfigurationModel: PropTypes.func,
  stepConfigurationModel: PropTypes.object,
};
