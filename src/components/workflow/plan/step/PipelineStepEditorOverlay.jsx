import React, {useContext} from "react";
import PropTypes from "prop-types";
import {faDraftingCompass} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import StepToolConfiguration
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/StepToolConfiguration";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";

function PipelineStepEditorOverlay(
  {
    pipeline,
    pipelineStep,
    loadPipeline,
  }) {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();

    if (loadPipeline) {
      loadPipeline();
    }
  };

  if (isMongoDbId(pipeline?._id) !== true || isMongoDbId(pipelineStep?._id) !== true) {
    return null;
  }

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      showPanel={true}
      titleText={`Pipeline Step Configuration`}
      titleIcon={faDraftingCompass}
      showToasts={true}
      showCloseButton={false}
    >
      <div className={"p-3"}>
        <StepToolConfiguration
          pipeline={pipeline}
          pipelineStepId={pipelineStep?._id}
          reloadParentPipeline={loadPipeline}
          closeEditorPanel={closePanel}
          pipelineStep={pipelineStep}
        />
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

PipelineStepEditorOverlay.propTypes = {
  pipeline: PropTypes.object,
  pipelineStep: PropTypes.object,
  pipelineId: PropTypes.string,
  loadPipeline: PropTypes.func,
};

export default PipelineStepEditorOverlay;