import React, {useState} from "react";
import PropTypes from "prop-types";
import PipelineInstructionsFieldBase
  from "components/common/list_of_values_input/settings/pipelines/instructions/PipelineInstructionsFieldBase";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import { faFileCheck } from "@fortawesome/pro-light-svg-icons";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import useComponentStateReference from "hooks/useComponentStateReference";
import useGetPipelineInstructionModelByPipelineStep
  from "components/workflow/instructions/hooks/useGetPipelineInstructionModelByPipelineStep";

export default function UserActionsPipelineInstructionsDisplayerOverlay(
  {
    pipelineId,
    pipelineStepId,
    pipelineInstructionsId,
  }) {
  const {
    toastContext,
  } = useComponentStateReference();
  const {
    pipelineInstructionsModel,
    setPipelineInstructionsModel,
    isLoading,
    error,
  } = useGetPipelineInstructionModelByPipelineStep(
    pipelineId,
    pipelineStepId,
    false,
  );

  const closePanelFunction = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  if (isMongoDbId(pipelineInstructionsId) !== true) {
    return null;
  }

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanelFunction}
      titleText={"Pipeline Instructions"}
      titleIcon={faFileCheck}
    >
      <div className={"m-3"}>
        <PipelineInstructionsFieldBase
          showInstructions={true}
          showLabel={false}
          pipelineInstructionsId={pipelineInstructionsId}
          isLoading={isLoading}
          pipelineInstructionsModel={pipelineInstructionsModel}
          setPipelineInstructionsModel={setPipelineInstructionsModel}
          allowEditing={true}
          error={error}
          // instructionsDisplayerMaximumHeight={instructionsDisplayerMaximumHeight}
          // instructionsDisplayerMinimumHeight={instructionsDisplayerMinimumHeight}
        />
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

UserActionsPipelineInstructionsDisplayerOverlay.propTypes = {
  pipelineInstructionsId: PropTypes.string,
  pipelineId: PropTypes.string,
  pipelineStepId: PropTypes.string,
};