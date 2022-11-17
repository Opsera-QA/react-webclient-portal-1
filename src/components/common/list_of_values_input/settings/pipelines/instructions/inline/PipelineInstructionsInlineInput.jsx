import React from "react";
import PropTypes from "prop-types";
import RichTextInput from "components/common/inputs/rich_text/RichTextInput";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import StandaloneSaveButton from "components/common/buttons/saving/StandaloneSaveButton";
import CancelButton from "components/common/buttons/CancelButton";

export default function PipelineInstructionsInlineInput(
  {
    className,
    instructionsDisplayerMinimumHeight,
    instructionsDisplayerMaximumHeight,
    pipelineInstructionsModel,
    setPipelineInstructionsModel,
    isLoading,
    setInEditMode,
  }) {
  const handleSave = async () => {
    const response = await pipelineInstructionsModel?.saveModel();
    setInEditMode(false);
    return response;
  };

  const handleCancel = () => {
    pipelineInstructionsModel?.resetData();
    setPipelineInstructionsModel(pipelineInstructionsModel);
    setInEditMode(false);
  };

  const getSaveButtonContainer = () => {
    return (
      <ButtonContainerBase>
        <CancelButton
          className={"mr-2"}
          cancelFunction={handleCancel}
        />
        <StandaloneSaveButton
          saveFunction={handleSave}
          type={"Pipeline Instructions"}
        />
      </ButtonContainerBase>
    );
  };

  return (
    <RichTextInput
      className={className}
      fieldName={"instructions"}
      model={pipelineInstructionsModel}
      setModel={setPipelineInstructionsModel}
      customTitle={pipelineInstructionsModel?.getData("name")}
      minimumHeight={instructionsDisplayerMinimumHeight}
      maximumHeight={instructionsDisplayerMaximumHeight}
      isLoading={isLoading}
      titleRightSideButton={getSaveButtonContainer()}
    />
  );
}

PipelineInstructionsInlineInput.propTypes = {
  className: PropTypes.string,
  instructionsDisplayerMinimumHeight: PropTypes.string,
  instructionsDisplayerMaximumHeight: PropTypes.string,
  pipelineInstructionsModel: PropTypes.object,
  isLoading: PropTypes.bool,
  setPipelineInstructionsModel: PropTypes.func,
  setInEditMode: PropTypes.func,
};