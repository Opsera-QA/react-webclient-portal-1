import React from "react";
import PropTypes from "prop-types";
import PipelineInstructionsFieldBase
  from "components/common/list_of_values_input/settings/pipelines/instructions/PipelineInstructionsFieldBase";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import { faFileCheck } from "@fortawesome/pro-light-svg-icons";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function PipelineInstructionsDisplayerOverlay(
  {
    pipelineInstructionsId,
  }) {
  const {
    toastContext,
  } = useComponentStateReference();

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
      titleText={"Action Required"}
      titleIcon={faFileCheck}
    >
      <div className={"m-3"}>
        <PipelineInstructionsFieldBase
          showInstructions={true}
          showLabel={false}
          pipelineInstructionsId={pipelineInstructionsId}
          // instructionsDisplayerMaximumHeight={instructionsDisplayerMaximumHeight}
          // instructionsDisplayerMinimumHeight={instructionsDisplayerMinimumHeight}
        />
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

PipelineInstructionsDisplayerOverlay.propTypes = {
  pipelineInstructionsId: PropTypes.string,
};