import React, {useContext} from "react";
import PropTypes from "prop-types";
import {faTools} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import StepNotificationConfiguration
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_notification_configuration/StepNotificationConfiguration";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";

function PipelineStepNotificationConfigurationOverlay(
  {
    pipelineStep,
    pipelineId,
    loadPipeline,
  }) {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
    loadPipeline();
  };

  if (pipelineStep == null || isMongoDbId(pipelineId) !== true) {
    return null;
  }

  return (
    <CenterOverlayContainer
      closePanel={closePanel}
      showPanel={true}
      titleText={`Pipeline Step Notification Configuration`}
      titleIcon={faTools}
      showToasts={true}
      fullWidth={true}
    >
      <div className={"p-3"}>
        <StepNotificationConfiguration
          pipelineId={pipelineId}
          pipelineStep={pipelineStep}
          handleCloseClick={closePanel}
        />
      </div>
    </CenterOverlayContainer>
  );
}

PipelineStepNotificationConfigurationOverlay.propTypes = {
  pipelineStep: PropTypes.object,
  pipelineId: PropTypes.string,
  loadPipeline: PropTypes.func,
};

export default PipelineStepNotificationConfigurationOverlay;