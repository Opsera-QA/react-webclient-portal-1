import React from "react";
import PropTypes from "prop-types";
import {faDraftingCompass} from "@fortawesome/pro-light-svg-icons";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import PipelineSourceRepositoryConfiguration
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/repository/PipelineSourceRepositoryConfiguration";
import PipelineRoleHelper from "@opsera/know-your-role/roles/pipelines/pipelineRole.helper";
import useComponentStateReference from "hooks/useComponentStateReference";
import AccessDeniedOverlayBase from "components/common/overlays/center/denied/AccessDeniedOverlayBase";

export default function PipelineSourceRepositoryEditorOverlay(
  {
    pipeline,
  }) {
  const {
    userData,
    toastContext,
  } = useComponentStateReference();

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  if (isMongoDbId(pipeline?._id) !== true) {
    return null;
  }

  if (PipelineRoleHelper.canUpdatePipelineStepDetails(userData, pipeline) !== true) {
    return (
      <AccessDeniedOverlayBase>
          Editing pipeline workflow settings allows users to change the behavior of a pipeline step. This action requires elevated privileges.
      </AccessDeniedOverlayBase>
    );
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
        <PipelineSourceRepositoryConfiguration
          pipeline={pipeline}
          handleCloseClick={closePanel}
        />
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

PipelineSourceRepositoryEditorOverlay.propTypes = {
  pipeline: PropTypes.object,
};