import React from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import {faCheckCircle} from "@fortawesome/pro-light-svg-icons";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import useButtonState from "hooks/general/buttons/useButtonState";
import {pipelineHelper} from "components/workflow/pipeline.helper";
import Model from "core/data_model/model";
import tagMetadata from "components/settings/tags/tag.metadata";
import useTagActions from "hooks/settings/tags/useTagActions";

export default function PipelineStepTagWarningApplyTagButton(
  {
    stepConfigurationModel,
    setStepConfigurationModel,
    savePipelineStepConfiguration,
    className,
    disabled,
    setBusy,
  }) {
  const {
    buttonState,
    buttonStateFunctions,
  }= useButtonState();
  const {
    toastContext,
  } = useComponentStateReference();
  const tagActions = useTagActions();

  const closeOverlayFunction = () => {
    toastContext.clearOverlayPanel();
  };


  const applyTagAndSave = async () => {
    try {
      buttonStateFunctions.setBusyState();
      setBusy(true);
      const tagValue = pipelineHelper.getTagValueForStep(stepConfigurationModel?.getCurrentData());
      const response = await tagActions.doesTagExistWithTypeAndValue("pipeline", tagValue);
      const doesTagExist = response?.data?.data === true;

      if (doesTagExist !== true) {
        const newTag = {
          type: "pipeline",
          value: tagValue,
          active: true,
          configuration: {},
        };

        const newTagModel = new Model(newTag, tagMetadata, true);
        await tagActions.createTag(newTagModel);
      }

      stepConfigurationModel?.setData("tags", [{type: "pipeline", value: tagValue}]);
      setStepConfigurationModel({...stepConfigurationModel});
      await savePipelineStepConfiguration(stepConfigurationModel);
      buttonStateFunctions.setSuccessState();
      toastContext.showSystemSuccessToast("Pipeline Step configuration successfully saved!");
      closeOverlayFunction();
    } catch (error) {
      toastContext.showSystemErrorToast(error, "Error saving Pipeline Step configuration:");
      buttonStateFunctions.setErrorState();
    } finally {
      setBusy(false);
    }
  };


  return (
    <VanityButtonBase
      normalText={"Proceed"}
      busyText={"Saving Step Configuration"}
      errorText={"Error Saving Step Configuration"}
      successText={"Successfully Saved Step Configuration"}
      className={className}
      disabled={disabled}
      buttonState={buttonState}
      onClickFunction={applyTagAndSave}
      variant={"outline-success"}
      icon={faCheckCircle}
    />
  );
}

PipelineStepTagWarningApplyTagButton.propTypes = {
  stepConfigurationModel: PropTypes.object,
  setStepConfigurationModel: PropTypes.func,
  savePipelineStepConfiguration: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  setBusy: PropTypes.func,
};