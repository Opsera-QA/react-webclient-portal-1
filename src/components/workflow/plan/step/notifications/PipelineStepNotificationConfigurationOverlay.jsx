import React from "react";
import PropTypes from "prop-types";
import {faEnvelope, faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import PipelineStepNotificationEditorPanel
  from "components/workflow/plan/step/notifications/PipelineStepNotificationEditorPanel";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import PipelineRoleHelper from "@opsera/know-your-role/roles/pipelines/pipelineRole.helper";
import useComponentStateReference from "hooks/useComponentStateReference";
import ConfirmationOverlay from "components/common/overlays/center/ConfirmationOverlay";
import AccessDeniedOverlayBase from "components/common/overlays/center/denied/AccessDeniedOverlayBase";

export default function PipelineStepNotificationConfigurationOverlay(
  {
    pipeline,
    pipelineStep,
    pipelineId,
  }) {
  const {
    userData,
    toastContext,
  } = useComponentStateReference();

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  if (pipelineStep == null || isMongoDbId(pipelineId) !== true) {
    return null;
  }

  if (PipelineRoleHelper.canUpdatePipelineStepNotifications(userData, pipeline) !== true) {
    return (
      <AccessDeniedOverlayBase>
        Editing step notifications is not allowed.  This action requires elevated privileges.
      </AccessDeniedOverlayBase>
    );
  }

  return (
    <CenterOverlayContainer
      closePanel={closePanel}
      showPanel={true}
      titleText={`Pipeline Step Notification Configuration`}
      titleIcon={faEnvelope}
      showToasts={true}
      showCloseButton={false}
    >
      <div className={"p-3"}>
        <PipelineStepNotificationEditorPanel
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
  pipeline: PropTypes.object,
};
